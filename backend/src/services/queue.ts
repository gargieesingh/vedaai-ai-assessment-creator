import { Queue, ConnectionOptions } from 'bullmq';
import redis from '../config/redis';

const generationQueue = new Queue('generation-queue', {
  connection: redis as unknown as ConnectionOptions,
});

console.log('Generation queue initialized');

export const addGenerationJob = async (
  assignmentId: string,
  assignmentData: Record<string, any>
): Promise<string> => {
  const job = await generationQueue.add(
    'generate-paper',
    { assignmentId, assignmentData },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    }
  );

  if (!job.id) {
    throw new Error('Failed to add job to the queue, job ID is missing');
  }

  return job.id;
};

export default generationQueue;
