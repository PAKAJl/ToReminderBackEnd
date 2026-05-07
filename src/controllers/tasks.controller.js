import { taskService } from "../services/tasks.service.js";

export const getTasks = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let data;
    if (token == null) {
      data = await taskService.getAll();
    } else {
      data = await taskService.getAllByToken(token);
      console.log("Нужный метод " + token);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error); // Передаем ошибку в errorHandler
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.query.id;
    const token = req.headers.authorization;
    const deletedTask = await taskService.delete(id, token);
    res.status(201).json(deletedTask);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const token = req.headers.authorization;
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
