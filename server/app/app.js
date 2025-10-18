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


app.use("/api", profileRoutes);
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", timeEntryRoutes);
app.use("/api", companyRoutes);
app.use("/api", dashboardRoutes);

//simple health check
app.get("/health", (req, res) => res.json({ ok: true }));


module.exports = app;