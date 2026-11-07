import * as projectService from "../services/project.service.js"

export const getProjects = async (req, res) => {
    res.json(await projectService.getAllProjects())
}

export const createProject = async (req, res) => {
    const project = await projectService.createProject(req.body)
    res.status(201).json(project)
}

export const updateProject = async (req, res) => {
    const project = await projectService.updateProject(req.params.id, req.body)
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json(project)
}

export const deleteProject = async (req, res) => {
    const project = await projectService.deleteProject(req.params.id)
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json({ id: req.params.id })
}
