import { Router } from "express"
import * as taskController from "../controllers/task.controller.js"

const router = Router()

router.get("/", taskController.getTasks)
router.put("/:id", taskController.updateTask)
router.patch("/:id/status", taskController.changeStatus)
router.delete("/:id", taskController.deleteTask)

export default router
