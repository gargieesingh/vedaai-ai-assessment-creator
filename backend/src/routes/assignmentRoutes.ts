import { Router } from 'express';
import { createAssignment, generatePaper, getResult } from '../controllers/assignmentController';

const router = Router();

router.post('/assignments', createAssignment);
router.post('/generate', generatePaper);
router.get('/results/:jobId', getResult);
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default router;
