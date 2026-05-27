import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { Result } from '../models/Result';
import { addGenerationJob } from '../services/queue';

// POST /api/assignments
export async function createAssignment(req: Request, res: Response): Promise<void> {
  try {
    const { dueDate, questionTypes, instructions, fileUrl } = req.body;

    // Validate required fields
    if (!dueDate) {
      res.status(400).json({ success: false, message: 'dueDate is required' });
      return;
    }

    if (!questionTypes || !Array.isArray(questionTypes) || questionTypes.length === 0) {
      res.status(400).json({ success: false, message: 'questionTypes must be an array with at least 1 item' });
      return;
    }

    for (const qt of questionTypes) {
      if (!qt.type || qt.numQuestions === undefined || qt.marks === undefined) {
        res.status(400).json({
          success: false,
          message: 'Each questionType must have: type, numQuestions, and marks',
        });
        return;
      }
    }

    // Derive title from instructions (first 50 chars) or fallback
    const title = instructions?.trim()
      ? instructions.trim().slice(0, 50)
      : 'Untitled Assignment';

    const assignment = await Assignment.create({
      title,
      fileUrl,
      dueDate,
      questionTypes,
      instructions,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      assignmentId: assignment._id,
      message: 'Assignment created successfully',
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/generate
export async function generatePaper(req: Request, res: Response): Promise<void> {
  try {
    const { assignmentId } = req.body;

    if (!assignmentId) {
      res.status(400).json({ success: false, message: 'assignmentId is required' });
      return;
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      res.status(404).json({ success: false, message: 'Assignment not found' });
      return;
    }

    if (assignment.status === 'processing') {
      res.status(400).json({ success: false, message: 'Generation already in progress' });
      return;
    }

    const assignmentData = {
      instructions: assignment.instructions,
      questionTypes: assignment.questionTypes,
    };

    const jobId = await addGenerationJob(assignment._id.toString(), assignmentData);

    await Assignment.findByIdAndUpdate(assignmentId, { jobId });

    res.status(200).json({
      success: true,
      jobId,
      message: 'Question paper generation started',
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
}

// GET /api/results/:jobId
export async function getResult(req: Request, res: Response): Promise<void> {
  try {
    const { jobId } = req.params;

    const assignment = await Assignment.findOne({ jobId });

    if (!assignment) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }

    if (assignment.status === 'processing' || assignment.status === 'pending') {
      res.status(202).json({
        success: false,
        status: assignment.status,
        message: 'Generation in progress',
      });
      return;
    }

    if (assignment.status === 'error') {
      res.status(500).json({ success: false, message: 'Generation failed' });
      return;
    }

    const result = await Result.findOne({ assignmentId: assignment._id });

    if (!result) {
      res.status(404).json({ success: false, message: 'Result not found' });
      return;
    }

    res.status(200).json({
      success: true,
      result: {
        resultId: result._id,
        assignmentId: assignment._id,
        sections: result.sections,
        metadata: result.metadata,
        createdAt: result.createdAt,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ success: false, message: error.message });
  }
}
