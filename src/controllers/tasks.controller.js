import { taskService } from "../services/tasks.service.js";
import { extractToken } from "../utils/extractToken.js";

export const getTasks = async (req, res, next) => {
  try {
    const token = extractToken(req);
    let data;
    if (!token) {
      data = await taskService.getAll();
    } else {
      data = await taskService.getAllByToken(token);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.query.id;
    const token = extractToken(req);
    if (!id) return res.status(400).json({ error: "Task id is required" });

    const deletedTask = await taskService.delete(id, token);
    if (!deletedTask || deletedTask.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(deletedTask[0]);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: "Token is required" });
    if (!title) return res.status(400).json({ error: "Title is required" });

    const taskData = {
      ...req.body,
      token: token
    };
    const newTask = await taskService.create(taskData);
    res.status(201).json(newTask[0]);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Task id is required" });

    const updatedTask = await taskService.update(id, token, req.body);
    if (!updatedTask || updatedTask.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask[0]);
  } catch (error) {
    next(error);
  }
};
