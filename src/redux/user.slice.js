import { createSlice } from "@reduxjs/toolkit"

const initValue = {
    name: "yael",
    password: "1234"
}

const user = createSlice({
    name: "user",
    initialState: initValue,
    reducers: {

    }
})

export default user.reducer