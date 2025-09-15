/*

*/

const { get } = require("../routes/authRoutes");
const { prisma } = require("../utils/prisma");

const getTimeEntries = async (req, res, next) => {
  try {
    const { projectId } = req.params.projectId;
    const entries = await prisma.timeEntry.findMany({
      where: { projectId },
    });

    res.json(entries);

  } catch (err) {
    console.error(err);
  }
};

const startTimer = async (req, res, next) => {
  try {
    //const startTime = new Date();
    const { projectId, notes } = req.body;
    const entry = await prisma.timeEntry.create({
      data: {
        projectId,
        notes,
        startTime: new Date(),
      },
    });

  } catch (err) {
    console.error(err);
  }
  
};

const stopTimer = async (req, res, next) => {
  try {
    //const stopTime = new Date();
    const { projectId, notes } = req.body;
    const entry = await prisma.timeEntry.update({
      where: {
        projectId,
      },
      data: { endTime: new Date() },
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
  }
  
};
const delTimeEntry = async (req, res, next) => {
  try {
    const { entryId } = req.body;
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

module.exports = { getTimeEntries, startTimer, stopTimer, delTimeEntry };