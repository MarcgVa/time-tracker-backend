const { prisma } = require('../utils/prisma');

const getCompanyList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ error: "Invalid credentials" });

    const companies = await prisma.company.findMany({
      where: { userId },
      include: { projects: true },
    });

    res.json(companies);
  } catch (e) {
    console.error(e);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(403).json({ error: "Bad request" });

    const company = await prisma.company.findUnique({
      where: { id },
      include: { projects: true },
    });
    console.log("company", company);
    res.json(company);
  } catch (e) {
    console.error(e);
  }
};

const createCompany = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ error: "Invalid credentials" });

    const { name, address, phone } = req.body;
    const company = await prisma.company.create({
      data: {
        name,
        address,
        phone,
        userId,
      },
    });

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, address, phone, contact } = req.body;
    if (!id) return res.status(404).json({ error: "Not Found" });

    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        address,
        phone,
        contact,
      },
    });

    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(401).json({ error: "Unauthorized request" });
    await prisma.company.delete({
      where: { id },
    });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

module.exports = {
  getCompanyList,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
