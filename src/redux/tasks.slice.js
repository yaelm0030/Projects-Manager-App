import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"
import { removeProject } from "./projects.slice"

export const fetchTasks = createAsyncThunk("tasks/fetch", () => api.get("/tasks"))

export const addTask = createAsyncThunk("tasks/add", ({ projectId, ...task }) =>
    api.post(`/projects/${projectId}/tasks`, task))

export const updateTask = createAsyncThunk("tasks/update", ({ id, ...details }) =>
    api.put(`/tasks/${id}`, details))

export const changeStatus = createAsyncThunk("tasks/changeStatus", ({ id, newStatus }) =>
    api.patch(`/tasks/${id}/status`, { status: newStatus }))

export const removeTask = createAsyncThunk("tasks/remove", async (id) => {
    await api.del(`/tasks/${id}`)
    return id
})

const replaceTask = (state, action) => {
    state.tasks = state.tasks.map(t => t._id === action.payload._id ? action.payload : t)
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: { tasks: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            .addCase(updateTask.fulfilled, replaceTask)
            .addCase(changeStatus.fulfilled, replaceTask)
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t._id !== action.payload)
            })
            // the server deletes a project's tasks together with it
            .addCase(removeProject.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.projectId !== action.payload)
            })
    }
})

export default tasksSlice.reducer
