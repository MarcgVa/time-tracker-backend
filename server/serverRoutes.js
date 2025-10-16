const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const timeEntryRoutes = require("./routes/timeEntryRoutes");
const companyRoutes = require("./routes/companyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { handleRefreshToken } = require("../server/controllers/auth/refreshTokenController");

app.use("/api", profileRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", timeEntryRoutes);
app.use("/api", companyRoutes);
app.use("/api", dashboardRoutes);

//simple health check
app.get("/health", (req, res) => res.json({ ok: true }));
//refresh token 
app.get("/refresh", handleRefreshToken);

module.exports = app;
