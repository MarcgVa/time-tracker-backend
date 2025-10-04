# ⏱️ Project Time Tracker – Backend

A modern **Node.js + PostgreSQL + Prisma** backend API powering the **Project Time Tracker & Invoicing App**.

This backend provides secure authentication, project management, time tracking, and invoice endpoints consumed by the React/Redux frontend.

---

## 🚀 Features (Backend)

- **Express.js** REST API with clean routing.
- **Prisma ORM** for type-safe database access.
- **PostgreSQL** relational database.
- **JWT Authentication** with refresh token support.
- **BCrypt Password Hashing** for secure credentials.
- **Seed Script** for predictable demo/test data.
- **Validation** with Zod or Yup (latest best practices).
- **Jest** unit tests for controllers/services.
- **Cypress** E2E tests integrated with frontend.
- **Environment-based Config** (dotenv).

---

## 🏗️ Project Structure

```
backend/
├─ prisma/
│ └─ schema.prisma # Database schema
│ 
├─ server/
│ ├─ app.js # Express app config
│ ├─ seed.js # Seed script
│ ├─ index.js # Server entry
│ └─testApp.js
│
├─ src/
│ ├─ routes/ # Auth, Projects, Time, Invoices
│ ├─ controllers/ # Business logic
│ ├─ middleware/ # Auth, error handling
│ └─ utils/ # Helpers
├─ tests/ # Jest unit tests
└─ package.json
```
---

---

## 🖥️ Local Development

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/freelancer-time-tracker-backend.git
cd freelancer-time-tracker-backend
```
2. **Install dependencies**
   ```bash
    npm install
   ```
3. **Configure environment**
   Create .env:
   ```bash
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/freelancer_time_tracker
    JWT_SECRET=supersecretjwtkey  #make your real key
    PORT=4000

   ```
4. **Run migrations and seed data**
   ```bash
    npx prisma migrate dev
    npx prisma db seed

   ```
5. **Start server**
   ```bash
   npm run dev
   ```

Backend runs at http://localhost:4000/api.
---
## 🧪 Testing
Unit Tests (Jest)
```bash 
npm test
```

### E2E Tests with Cypress

When combined with the frontend and seed DB:

```bash
npm run cypress:run
```

## 📦 API Endpoints Overview

- POST /auth/register – Create a user
- POST /auth/login – Login and receive JWT
- GET /projects – List projects for logged-in user
- POST /projects – Create a new project
- POST /time – Add time entry
- GET /invoices – View invoices
- POST /invoices – Generate invoice

## 🎨 Design Philosophy

- Minimal, RESTful endpoints for frontend consumption.
- Error-handling middleware returns consistent JSON responses.
- Validation middleware ensures clean inputs.

## 🔗 Frontend

This backend powers the Freelancer Time Tracker Frontend.
Make sure it’s running to test full E2E flows.

## 🛠️ Built With

- Node.js 20
- Express.js
- Prisma ORM
- PostgreSQL
- JWT + BCrypt
- Jest / Supertest for API testing
- Cypress for E2E with frontend

## 🤝 Contributing

PRs welcome! Please run tests and lint before pushing:

```bash 
npm run lint && npm test
```

## 📄 License

MIT © 2025 Your Name
