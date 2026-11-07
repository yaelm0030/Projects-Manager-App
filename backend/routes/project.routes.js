import { Router } from "express"
import * as projectController from "../controllers/project.controller.js"
import * as taskController from "../controllers/task.controller.js"

const router = Router()

router.get("/", projectController.getProjects)
router.post("/", projectController.createProject)
router.put("/:id", projectController.updateProject)
router.delete("/:id", projectController.deleteProject)

// a project's tasks
router.get("/:projectId/tasks", taskController.getProjectTasks)
router.post("/:projectId/tasks", taskController.createTask)

export default router
