const router = require("express").Router();
const { getProjects, createProject, updateProject, deleteProject, getProject } = require("../controllers/projectsController");
const { authenticateToken } = require("../middleware/auth");



router.get("/", authenticateToken, getProjects);
router.post('/', createProject);
router.get('/:projectId', authenticateToken, getProject);
router.put('/:projectId', authenticateToken, updateProject),
router.delete('/:projectId', authenticateToken, deleteProject),


module.exports = router;