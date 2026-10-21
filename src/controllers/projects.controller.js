import { projectService } from "../services/projects.service.js";
import { extractToken } from "../utils/extractToken.js";

export const getName = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(400).json({ error: "Token is undefined" });
    }

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
    const token = extractToken(req);
    if (!token) {
      return res.status(400).json({ error: "Token is undefined" });
    }
    const deletedProject = await projectService.delete(token);
    if (!deletedProject || deletedProject.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(deletedProject[0]);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
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
    const token = extractToken(req);
    if (!name) return res.status(400).json({ error: "New Name is required" });
    if (!token) return res.status(400).json({ error: "Token is undefined" });

    const updatedProject = await projectService.nameUpdate(token, name);
    if (!updatedProject || updatedProject.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(updatedProject[0]);
  } catch (error) {
    next(error);
  }
};
