const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("../src/routes/authRoutes");
const projectRoutes = require('../src/routes/projectRoutes');
const invoiceRoutes = require('../src/routes/invoiceRoutes');
const timeEntryRoutes = require('../src/routes/timeEntryRoutes');



app.use("/api", authRoutes);
app.use('/api', projectRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', timeEntryRoutes);

//simple health check
app.get("/health", (req, res) => res.json({ ok: true }));

module.exports = app;