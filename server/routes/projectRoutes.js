const router = require("express").Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
} = require("../controllers/projects/projectsController");
const { protect } = require("../middleware/protect");

router.get("/projects/", protect, getProjects);
router.post("/projects/", protect, createProject);
router.get("/projects/:projectId", protect, getProject);
router.put("/projects/:projectId", protect, updateProject);
router.delete("/projects/delete/:projectId", protect, deleteProject);
  
(module.exports = router);
