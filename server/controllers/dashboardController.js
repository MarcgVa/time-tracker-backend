const { prisma } = require('../utils/prisma');
const {getTotalLoggedTime, getEntryTotalTime} = require('../utils/time');
const { getFirstDayOfWeek,getLastDayOfWeek } = require('../utils/time');


const dayOfWeek = [
{ day: "Sunday", hours: 0 },
{ day: "Monday", hours: 0 },
{ day: "Tuesday", hours: 0 },
{ day: "Wednesday", hours: 0 },
{ day: "Thursday", hours: 0 },
{ day: "Friday", hours: 0 },
{ day: "Saturday", hours: 0 },
];

const getDashboardInfo = async (req, res) => {

  const firstDay = getFirstDayOfWeek(new Date());
  const lastDay = getLastDayOfWeek(new Date());
  
  try {
    const userId = req.user.id;
    
      
    const allTimeEntries = await prisma.timeEntry.findMany({
      where: { userId, },
    });
    
    const totalHours = getTotalLoggedTime(allTimeEntries);

    const activeProjects = await prisma.project.count({
      where: { userId, status: "InProgress" },
    });
    
    const upcomingInvoices = await prisma.invoice.aggregate({
      where: { userId, status: "Pending" },
      _sum: { total: true },
    });

    // Weekly data
    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        startTime: {
          lte: lastDay,
          gte: firstDay,
        },
      }
    })

    timeEntries.forEach(entry => {
      dayOfWeek[new Date(entry.startTime).getDay()].hours += getEntryTotalTime(entry);
    });
    
    // Mocked weekly data — you’d generate from real time entries
    const weeklyData = [
      { day: "Mon", hours: `${dayOfWeek[1].hours}` },
      { day: "Tue", hours: `${dayOfWeek[2].hours}` },
      { day: "Wed", hours: `${dayOfWeek[3].hours}` },
      { day: "Thu", hours: `${dayOfWeek[4].hours}` },
      { day: "Fri", hours: `${dayOfWeek[5].hours}` },
      { day: "Sat", hours: `${dayOfWeek[6].hours}` },
      { day: "Sun", hours: `${dayOfWeek[0].hours}` },
    ];

    res.json({
      totalHours: totalHours || 0,
      activeProjects,
      upcomingInvoices: upcomingInvoices._sum.total || 0,
      weeklyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading dashboard stats" });
  }
};

module.exports = { getDashboardInfo };
