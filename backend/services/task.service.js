import Task from "../models/Task.js"

export const getAllTasks = () => Task.find()

export const getTasksByProject = (projectId) => Task.find({ projectId })

export const createTask = (projectId, data) => Task.create({
    projectId,
    name: data.name,
    description: data.description,
    status: data.status,
    priority: data.priority,
    deadline: data.deadline
})

export const updateTask = (id, data) => Task.findByIdAndUpdate(
    id,
    {
        name: data.name,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline
    },
    { new: true, omitUndefined: true, runValidators: true }
)

export const changeStatus = (id, status) => Task.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
)

export const deleteTask = (id) => Task.findByIdAndDelete(id)
