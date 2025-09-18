const { request } = require("supertest");
const app = require("../server/testApp");
const { prisma } = require("../src/utils/prisma");
const {bcrypt} = require("../src/utils/auth");

beforeAll(async () => {
  await prisma.user.deleteMany();
  const pw = await bcrypt.hash('password123', 10);
  await prisma.user.create({ data: { email: 'testuser@example.com', password: pw, name: 'Test' } });
});

afterAll(async () => prisma.$disconnect());

test('POST /auth/login returns token', async () => {
  const res = await request(app).post('/auth/login').send({ email: 'testuser@example.com', password: 'password123' });
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});