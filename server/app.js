const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("../src/routes/authRoutes");
const projectRoutes = require('../src/routes/projectRoutes');
const invoiceRoutes = require('../src/routes/invoiceRoutes');
const timeEntryRoutes = require('../src/routes/timeEntryRoutes');



app.use("/api/auth", authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/time', timeEntryRoutes);


module.exports = app;