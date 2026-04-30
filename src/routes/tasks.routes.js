import { Router } from 'express';
import { getTasks, createTask } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', getTasks);       // GET /api/tasks
router.post('/', createTask);    // POST /api/tasks

export default router;