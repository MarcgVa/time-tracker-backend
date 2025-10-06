const { prisma } = require("../utils/prisma");



const getCompanyList = async (req,res,next) => {
  try {
    const companies = await prisma.company.findMany()
    
  } catch (e) {
    console.error(e);
  }
}

const createCompany = async (req, res, next) => {
  const { name, address, phone } = req.body;
}