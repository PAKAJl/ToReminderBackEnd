import { projectService } from "../services/projects.service.js";

export const getName = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ error: "Token is undefined" });
    }

    const token = authHeader.replace('Bearer ', '');
    const project = await projectService.getNameByToken(token);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ name: project.name });

  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const deletedProject = await projectService.delete(token);
    res.status(201).json(deletedProject);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    console.log("Headers:", req.headers); // Проверим, пришел ли content-type
    console.log("Body:", req.body);       // Проверим, есть ли тут данные
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newProject = await projectService.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

export const updateName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const token = req.headers.authorization;
    if (!name) return res.status(400).json({ error: "New Name is required" });

    const upadatedProject = await projectService.nameUpdate(token, name);
    res.status(201).json(upadatedProject);
  } catch (error) {
    next(error);
  }
};


