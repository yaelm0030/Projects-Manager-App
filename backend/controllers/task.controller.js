import * as taskService from "../services/task.service.js"

export const getTasks = async (req, res) => {
    res.json(await taskService.getAllTasks())
}

export const getProjectTasks = async (req, res) => {
    res.json(await taskService.getTasksByProject(req.params.projectId))
}

export const createTask = async (req, res) => {
    const task = await taskService.createTask(req.params.projectId, req.body)
    res.status(201).json(task)
}

export const updateTask = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}

export const changeStatus = async (req, res) => {
    const task = await taskService.changeStatus(req.params.id, req.body.status)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const task = await taskService.deleteTask(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json({ id: req.params.id })
}
