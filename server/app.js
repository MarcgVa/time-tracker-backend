const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("../src/routes/authRoutes");
const projectRoutes = require('../src/routes/projectRoutes');
const invoiceRoutes = require('../src/routes/invoiceRoutes');
const timeEntryRoutes = require('../src/routes/timeEntryRoutes');



app.use("/auth", authRoutes);
app.use('/projects', projectRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/', timeEntryRoutes);


module.exports = app;