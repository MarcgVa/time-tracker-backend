const express = require("express");
const cors = require("cors");
const app = express();

let corsOptions = { origin: ['http://localhost:5173'], };
app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require("../src/routes/authRoutes");
const projectRoutes = require('../src/routes/projectRoutes');
const invoiceRoutes = require('../src/routes/invoiceRoutes');
const timeEntryRoutes = require('../src/routes/timeEntryRoutes');
const companyRoutes = require('../src/routes/companyRoutes');
const profileRoutes = require('../src/routes/profileRoutes');

app.use('/api', profileRoutes); 
app.use("/api", authRoutes);
app.use('/api', projectRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', timeEntryRoutes);
app.use('/api', companyRoutes);

//simple health check
app.get("/health", (req, res) => res.json({ ok: true }));

module.exports = app;