const { prisma } = require("../utils/prisma");



const getCompanyList = async (req,res,next) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ error: "Invalid credentials" });

    const companies = await prisma.company.findMany({
      where: {userId},
      include: {projects:true},
    });

    res.json(companies);
  } catch (e) {
    console.error(e);
  }
}

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
  } catch (e) {
    console.error(e);
  }
}

module.exports = {getCompanyList, createCompany}