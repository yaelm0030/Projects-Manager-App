import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const fetchProjects = createAsyncThunk("projects/fetch", () => api.get("/projects"))

export const addProject = createAsyncThunk("projects/add", (project) => api.post("/projects", project))

export const updateProject = createAsyncThunk("projects/update", ({ id, name, description }) =>
    api.put(`/projects/${id}`, { name, description }))

export const removeProject = createAsyncThunk("projects/remove", async (id) => {
    await api.del(`/projects/${id}`)
    return id
})

const projectsSlice = createSlice({
    name: "projects",
    initialState: { projects: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects = action.payload
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.projects.push(action.payload)
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.projects = state.projects.map(p => p._id === action.payload._id ? action.payload : p)
            })
            .addCase(removeProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(p => p._id !== action.payload)
            })
    }
})

export default projectsSlice.reducer
