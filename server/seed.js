const { Status } = require("../generated/prisma");
const { prisma } = require("./utils/prisma");
const bcrypt = require("bcrypt");


async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create a demo user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      password: passwordHash,
      profile: {
        create: {
          firstName: "Demo",
          lastName: "User",
          phone: '540-555-1234',
          bio: "Demo User",
          address: "123 Test Dr.",
          city: "DemoLand",
          zip: "22405",
          avatar: "https://avatar.iran.liara.run/public/320x320.png",
        },
      },
    },
  });

  // 2. Create Companies
  const company1 = await prisma.company.create({
    data: 
      {
        name: "Company1",
        address: "1 Company Dr.",
        phone: "555-555-1234",
        contact: 'company1@company1.com',
        userId: user.id,
      },
  });
  
  const company2 = await prisma.company.create({
    data: 
      {
        name: "Company2",
        address: "2 Company Dr.",
        phone: "555-555-1235",
        contact: 'company2@company2.com',
        userId: user.id,
      },
  });


  // 3. Create demo projects
  const project1 = await prisma.project.create({
    data: {
      name: "Portfolio Website",
      description: "Building a personal portfolio with React & Tailwind",
      hourlyRate: 75,
      userId: user.id,
      companyId: company1.id,
      status: 'InProgress',
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Client CRM",
      description: "CRM system for small business",
      hourlyRate: 100,
      userId: user.id,
      priority: "HIGH",
      companyId: company2.id,
      status: 'NotStarted',
    },
  });

  // 4. Add some time entries
  await prisma.timeEntry.createMany({
    data: [
      {
        projectId: project1.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hrs ago
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
        notes: "Initial setup and design work",
        hours: 3.0,
      },
      {
        projectId: project1.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hr ago
        endTime: new Date(),
        notes: "Implemented responsive layout",
        hours: 1.0,
      },
      {
        projectId: project1.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 1),
        notes: "Database schema setup",
        hours: 2.0,
      },
    ],
  });

  // 5. Generate invoices
  await prisma.invoice.createMany({
    data: [
      {
        projectId: project1.id,
        total: 225, // Example total
        issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        userId: user.id,
        status: 'Paid'
      },
      {
        projectId: project1.id,
        total: 200,
        issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
        userId: user.id,
        status:'Overdue'
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
