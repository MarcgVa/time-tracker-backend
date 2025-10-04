const router = require("express").Router();
const { getProjects, createProject, updateProject, deleteProject, getProject } = require("../controllers/projectsController");
const { authenticateToken } = require("../middleware/auth");



router.get("/projects/", authenticateToken, getProjects);
router.post("/projects/", authenticateToken, createProject);
router.get("/projects/:projectId", authenticateToken, getProject);
router.put("/projects/:projectId", authenticateToken, updateProject),
  router.delete("/projects/:projectId", authenticateToken, deleteProject),
  (module.exports = router);