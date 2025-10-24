require("dotenv").config();
const jwt = require("jsonwebtoken");
const { prisma } = require("../../utils/prisma");

const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await prisma.project.findMany({
      where: { userId },
      include: { timeEntries: true, invoices: true },
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const getProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const createProject = async (req, res, next) => {
  try {
    const { name, description, hourlyRate, dueDate } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        hourlyRate: Number(hourlyRate),
        userId,
        dueDate: new Date(dueDate),
      },
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, hourlyRate } = req.body;
    const project = await prisma.project.update({
      where: { id },
      data: { name, description, hourlyRate },
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return res.status(400).json({ error: "Bad request" });

    // Delete project, cascade will handle related timeEntries and invoices
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    console.log("deletedProject", deletedProject);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
