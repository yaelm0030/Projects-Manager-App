import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from './projects.slice.js'
import tasksSlice from './tasks.slice.js'
import user from './user.slice.js'
import projectsRNSlice from './projectsRunningNum.slice.js'
import tasksRNSlice from './tasksRunningNum.slice.js'

const store = configureStore({
  reducer: {
    projects:projectsSlice,
    projectsRN:projectsRNSlice,
    tasksRN:tasksRNSlice,
    tasks:tasksSlice,
    user:user
  }
})

export default store