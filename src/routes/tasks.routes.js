import { Router } from 'express';
import { getTasks, createTask, deleteTask} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/delete/', deleteTask);       // GET /api/tasks/delete
router.get('/', getTasks);       // GET /api/tasks
router.post('/', createTask);    // POST /api/tasks

export default router;