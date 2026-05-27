import { Worker, Job, ConnectionOptions } from 'bullmq';
import { Server as SocketIOServer } from 'socket.io';
import redisConnection from '../config/redis';
import { Assignment } from '../models/Assignment';
import { Result } from '../models/Result';
import { generateQuestions } from '../services/aiService';

// Module-level socket.io instance — set via setSocketIO() to avoid circular imports
let io: SocketIOServer | null = null;

export function setSocketIO(socketInstance: SocketIOServer): void {
  io = socketInstance;
}

interface JobData {
  assignmentId: string;
  assignmentData: {
    instructions?: string;
    questionTypes: { type: string; numQuestions: number; marks: number }[];
  };
}

async function processJob(job: Job<JobData>): Promise<void> {
  const { assignmentId, assignmentData } = job.data;

  try {
    // STEP 1: Mark assignment as processing
    console.log(`Processing job ${job.id} for assignment ${assignmentId}`);
    await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });

    // STEP 2: Call Gemini AI to generate questions
    const aiResult = await generateQuestions(assignmentData);

    // STEP 3: Save the result to MongoDB
    const savedResult = await Result.create({
      assignmentId,
      sections: aiResult.sections,
      metadata: aiResult.metadata,
    });

    // STEP 4: Mark assignment as complete and store jobId
    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'complete',
      jobId: job.id as string,
    });

    // STEP 5: Emit socket event if io is available
    if (io) {
      const payload = {
        jobId: job.id,
        resultId: savedResult._id.toString(),
        assignmentId,
      };
      // Emit to specific job room (targeted) AND globally (fallback)
      io.to(job.id as string).emit('generation:complete', payload);
      io.emit('generation:complete', payload);
    }

    console.log(`Job ${job.id} completed successfully`);
  } catch (err) {
    const error = err as Error;
    console.error(`Job ${job.id} failed:`, error.message);

    await Assignment.findByIdAndUpdate(assignmentId, { status: 'error' });

    if (io) {
      const errorPayload = {
        jobId: job.id,
        error: error.message,
      };
      // Emit to specific job room (targeted) AND globally (fallback)
      io.to(job.id as string).emit('generation:error', errorPayload);
      io.emit('generation:error', errorPayload);
    }

    // Re-throw so BullMQ marks the job as failed
    throw error;
  }
}

const worker = new Worker<JobData>('generation-queue', processJob, {
  connection: redisConnection as unknown as ConnectionOptions,
  concurrency: 2,
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

export default worker;
