const { prisma } = require("../src/utils/prisma");
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
    },
  });

  // 2. Create demo projects
  const project1 = await prisma.project.create({
    data: {
      name: "Portfolio Website",
      description: "Building a personal portfolio with React & Tailwind",
      hourlyRate: 75,
      userId: user.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Client CRM",
      description: "CRM system for small business",
      hourlyRate: 100,
      userId: user.id,
    },
  });

  // 3. Add some time entries
  await prisma.timeEntry.createMany({
    data: [
      {
        projectId: project1.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hrs ago
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
        notes: "Initial setup and design work",
      },
      {
        projectId: project1.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hr ago
        endTime: new Date(),
        notes: "Implemented responsive layout",
      },
      {
        projectId: project2.id,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
        endTime: new Date(Date.now() - 1000 * 60 * 60 * 1),
        notes: "Database schema setup",
      },
    ],
  });

  // 4. Generate invoices
  await prisma.invoice.createMany({
    data: [
      {
        projectId: project1.id,
        total: 225, // Example total
        issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      },
      {
        projectId: project2.id,
        total: 200,
        issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
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
