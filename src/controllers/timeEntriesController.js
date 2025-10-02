/*

*/

const { get } = require("../routes/authRoutes");
const { prisma } = require("../utils/prisma");

const getTimeEntries = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const entries = await prisma.timeEntry.findMany({
      where: { projectId: {equals: id,}, },
    });

    res.json(entries);

  } catch (err) {
    console.error(err);
  }
};

const startTimer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {notes} = req.body;
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
    const { id } = req.params;
    const entry = await prisma.timeEntry.update({
      where: {
        id: parseInt(id),
      },
      data: {
        endTime: new Date()
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

module.exports = { getTimeEntries, startTimer, stopTimer, delTimeEntry };