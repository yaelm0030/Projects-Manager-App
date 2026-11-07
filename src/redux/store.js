import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from './projects.slice.js'
import tasksSlice from './tasks.slice.js'
import user from './user.slice.js'

const store = configureStore({
  reducer: {
    projects:projectsSlice,
    tasks:tasksSlice,
    user:user
  }
})

export default store
