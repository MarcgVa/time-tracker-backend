const router = require("express").Router();
const {
  getCompany,
  getCompanyList,
  updateCompany,
  deleteCompany,
  createCompany,
} = require("../controllers/companyController");
const { protect } = require("../middleware/protect");

router.get("/company", protect, getCompanyList);
router.get("/company/:id", protect, getCompany);
router.post("/company/new", protect, createCompany);
router.put("/company/:id", protect, updateCompany);
router.delete("/company/:id", protect, deleteCompany);

module.exports = router;
