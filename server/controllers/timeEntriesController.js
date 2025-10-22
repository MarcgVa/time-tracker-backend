/*

*/
const { prisma } = require("../utils/prisma");
const { calculateTimeDifference } = require("../utils/time");

const getTimeEntries = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entries = await prisma.timeEntry.findMany({
      where: { projectId: { equals: id } },
    });

    res.json(entries);
  } catch (err) {
    console.error(err);
  }
};

const getDailyActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entries = await prisma.timeEntry.findMany({
      where: {
        createdAt: { gte: prisma.NOW(),},
        projectId: { equals: id }
      },
    });
    console.log('entries', entries);
    res.json(entries || []);
  } catch (err) {
    console.error(err);
  }
};

const startTimer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const entry = await prisma.timeEntry.create({
      data: {
        projectId: id,
        notes,
        startTime: new Date(),
      },
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
  }
};

const stopTimer = async (req, res, next) => {
  try {
    const endTime = new Date();

    const task = await prisma.timeEntry.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!task) return res.status(404).json({ error: "Time entry not found" });

    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    const hours = calculateTimeDifference(
      new Date(task.startTime),
      new Date(endTime)
    ).hours;
    console.log("Hours", hours);
    const entry = await prisma.timeEntry.update({
      where: { id: task.id },
      data: {
        endTime,
        hours,
      },
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
  }
};
const delTimeEntry = async (req, res, next) => {
  try {
    const { entryId } = req.params.entryId;
    const entry = await prisma.timeEntry.delete({
      where: {
        id: parseInt(entryId),
      },
    });

    res.Status(204);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getTimeEntries, getDailyActivity,startTimer, stopTimer, delTimeEntry };
