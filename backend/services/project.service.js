import Project from "../models/Project.js"
import Task from "../models/Task.js"

export const getAllProjects = () => Project.find()

export const createProject = (data) => Project.create({
    name: data.name,
    description: data.description
})

export const updateProject = (id, data) => Project.findByIdAndUpdate(
    id,
    { name: data.name, description: data.description },
    { new: true, omitUndefined: true }
)

export const deleteProject = async (id) => {
    const project = await Project.findByIdAndDelete(id)
    if (project) {
        await Task.deleteMany({ projectId: id }) // a project's tasks go with it
    }
    return project
}
