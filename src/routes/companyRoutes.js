const router = require("express").Router();
const {getCompany, getCompanyList, updateCompany,deleteCompany, createCompany } = require("../controllers/companyController");
const { authenticateToken } = require("../middleware/auth");

router.get("/company", authenticateToken, getCompanyList);
router.get("/company/:id", authenticateToken, getCompany);
router.post("/company/new", authenticateToken, createCompany);
router.put("/company/:id", authenticateToken, updateCompany);
router.delete("/company/:id", authenticateToken, deleteCompany);

module.exports = router;
