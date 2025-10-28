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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const { id } = req.params;
    console.log("id", id);
    const entries = await prisma.timeEntry.findMany({
      where: {
        startTime: {
          gte: today,
          lte: tomorrow,
        },
        projectId: {
          equals: id
        },
      },
      include: {
        project: true,
      },
      orderBy: {
        startTime: 'desc',
      }
    });
    console.log("entries", entries);
    res.json(entries);
  } catch (err) {
    console.error(err);
  }
};

const startTimer = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { notes } = req.body;
    const entry = await prisma.timeEntry.create({
      data: {
        projectId: id,
        notes,
        startTime: new Date(),
        hours: null,
        userId,
      },
    });
    console.log('sendingBack', entry);
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

    const hours = calculateTimeDifference(task.startTime, endTime).hours;
    
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

module.exports = {
  getTimeEntries,
  getDailyActivity,
  startTimer,
  stopTimer,
  delTimeEntry,
};
