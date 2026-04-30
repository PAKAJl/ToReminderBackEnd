import { taskService } from '../services/tasks.service.js';

export const getTasks = async (req, res, next) => {
  try {
    const data = await taskService.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error); // Передаем ошибку в errorHandler
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTask = await taskService.create({ title, description });
    res.status(201).json(newTask[0]);
  } catch (error) {
    next(error);
  }
};