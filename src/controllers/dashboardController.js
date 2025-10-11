const { prisma } = require('../utils/prisma');

const getProjectDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch total projects
    const totalProjects = await prisma.project.count({
      where: { userId },
    });

    // Fetch total active projects
    const activeProjects = await prisma.project.count({
      where: {userId, isCompleted: false},
    });
    // Fetch total completed projects
    const activeProjects = await prisma.project.count({
      where: {userId, isCompleted: true},
    });


    // Fetch total time entries
    const totalTimeEntries = await prisma.timeEntry.count({
      where: { project: { userId } },
    });

    

    // Fetch total invoices
    const totalInvoices = await prisma.invoice.count({
      where: { project: { userId } },
    });

    const totals ={
      totalProjects,
      totalTimeEntries,
      totalInvoices,
    };



















  } catch (err) {
    console.error(err);
  }
};


module.exports = { getDashboard };