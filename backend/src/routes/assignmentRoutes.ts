import { Router } from 'express';
import {
  createAssignment,
  generatePaper,
  getResult,
  getAssignments,
  deleteAssignmentById,
} from '../controllers/assignmentController';

const router = Router();

router.get('/assignments', getAssignments);
router.post('/assignments', createAssignment);
router.post('/generate', generatePaper);
router.get('/results/:jobId', getResult);
router.delete('/assignments/:id', deleteAssignmentById);
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default router;
