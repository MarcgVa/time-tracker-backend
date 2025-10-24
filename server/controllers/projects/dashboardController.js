const { prisma } = require('../../utils/prisma');

const getProjectDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch total projects
    const totalProjects = await prisma.project.count({
      where: { userId },
    });
    console.log('totalProjects', totalProjects);

    // Fetch total active projects
    const activeProjects = await prisma.project.count({
      where: {userId, isCompleted: false},
    });
    console.log('activeProjects', activeProjects);

    // Fetch total completed projects
    const completedProjects = await prisma.project.count({
      where: {userId, isCompleted: true},
    });
    console.log('completedProjects', completedProjects);
    

    // Fetch total time entries
    const totalTimeEntries = await prisma.timeEntry.count({
      where: { project: { userId } },
    });
    console.log('totalTimeEntries', totalTimeEntries);

    // Fetch total invoices
    const totalInvoices = await prisma.invoice.count({
      where: { project: { userId } },
    });
    console.log('totalInvoices', totalInvoices);
    const totals ={
      totalProjects,
      totalTimeEntries,
      totalInvoices,
    };

    res.json(totals);


  } catch (err) {
    console.error(err);
  }
};


module.exports = { getDashboard };