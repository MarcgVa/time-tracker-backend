require('dotenv').config();
const { prisma } = require('../utils/prisma');
const { jwt } = require('../utils/auth');

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
    console.log(err);
  }
  
};


const createProject = async (req, res, next) => {
  try {
    const { name, description, hourlyRate } = req.body;
    const userId = req.user.id;
  
    const project = await prisma.project.create({
      data: {
        name,
        description,
        hourlyRate: Number(hourlyRate),
        userId,
      },
    });

    res.json(project);

  } catch (err) {
    console.error(err);
  }
};


const updateProject = async (req, res, next) => {
  try {
    const { id, name, description, hourlyRate } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: { name, description, hourlyRate },
    });
    
    res.Status(200).json(project);

  } catch (err) {
    console.error(err);
  }
  
};

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params.id;
    const { userId } = req.user.id;
    const project = await prisma.project.delete({
      where: { id: projectId, userId },
    });
    
    res.sendStatus(204);

  } catch (err) {
    console.error(err);
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
