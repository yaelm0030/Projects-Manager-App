import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const login = createAsyncThunk("user/login", ({ name, password }) =>
    api.post("/auth/login", { name, password }))

// keep the logged-in name across page reloads
const savedName = localStorage.getItem("userName") || ""

const user = createSlice({
    name: "user",
    initialState: { name: savedName },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.name = action.payload.name
            localStorage.setItem("userName", action.payload.name)
        })
    }
})

export default user.reducer
