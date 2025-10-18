const router = require("express").Router();
const {
  getCompany,
  getCompanyList,
  updateCompany,
  deleteCompany,
  createCompany,
} = require("../controllers/companyController");
const { protect } = require("../middleware/protect");

router.get("/", protect, getCompanyList);
router.get("/:id", protect, getCompany);
router.post("/new", protect, createCompany);
router.put("/:id", protect, updateCompany);
router.delete("/:id", protect, deleteCompany);

module.exports = router;
