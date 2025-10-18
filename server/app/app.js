require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());



const authRoutes = require("../routes/authRoutes");
const projectRoutes = require("../routes/projectRoutes");
const invoiceRoutes = require("../routes/invoiceRoutes");
const timeEntryRoutes = require("../routes/timeEntryRoutes");
const companyRoutes = require("../routes/companyRoutes");
const profileRoutes = require("../routes/profileRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");
const {
  handleRefreshToken,
} = require("../controllers/auth/refreshTokenController");

app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/time", timeEntryRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/dashboard", dashboardRoutes);

//simple health check
app.get("/health", (req, res) => res.json({ ok: true }));
//refresh token
app.get("/refresh", handleRefreshToken);

module.exports = app;