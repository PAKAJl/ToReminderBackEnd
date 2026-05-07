import { Router } from 'express';
import { getName, deleteProject, createProject,updateName } from '../controllers/projects.controller.js';

const router = Router();

router.get('/delete/', deleteProject);       // GET /api/projects/delete
router.get('/', getName);       // GET /api/projects
router.post('/', createProject);    // POST /api/projects
router.post('/name', updateName);    // POST /api/projects/name

export default router;