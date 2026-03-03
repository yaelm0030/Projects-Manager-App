import { createSlice } from "@reduxjs/toolkit"

const initValue = {
    tasks: [
        // Tasks for Project 101
        {
            projectID: 101,
            taskID: 1,
            name: "Create Wireframes",
            description: "Drafting the initial structure for the homepage and the 'About Us' section.",
            status: "Done",
            priority: "high",
            deadline: "2026-03-05"
        },
        {
            projectID: 101,
            taskID: 2,
            name: "UI Style Guide",
            description: "Defining typography, color palettes, and component library for the new design.",
            status: "In Progress",
            priority: "medium",
            deadline: "2026-03-12"
        },
        // Tasks for Project 102
        {
            projectID: 102,
            taskID: 3,
            name: "App Store Screenshots",
            description: "Capturing high-resolution images for the Apple App Store and Google Play.",
            status: "To Do",
            priority: "medium",
            deadline: "2026-03-10"
        },
        {
            projectID: 102,
            taskID: 4,
            name: "Bug Fixing Phase 2",
            description: "Resolving critical issues found during the last internal testing cycle.",
            status: "In Progress",
            priority: "high",
            deadline: "2026-03-01"
        },
        // Tasks for Project 103
        {
            projectID: 103,
            taskID: 5,
            name: "Copywriting for Emails",
            description: "Writing catchy headlines and body text for the promotional email series.",
            status: "To Do",
            priority: "low",
            deadline: "2026-03-20"
        },
        {
            projectID: 103,
            taskID: 6,
            name: "Ad Banner Design",
            description: "Finalizing the visual assets for Facebook and LinkedIn advertisements.",
            status: "Done",
            priority: "high",
            deadline: "2026-02-28"
        },
        // Tasks for Project 104
        {
            projectID: 104,
            taskID: 7,
            name: "Database Schema Design",
            description: "Mapping out the relations for employee metrics and performance history.",
            status: "In Progress",
            priority: "high",
            deadline: "2026-03-08"
        },
        {
            projectID: 104,
            taskID: 8,
            name: "User Authentication",
            description: "Implementing secure login and role-based access for department managers.",
            status: "To Do",
            priority: "medium",
            deadline: "2026-03-15"
        },{
        projectID: 102,
        taskID: 9,
        name: "Push Notifications Setup",
        description: "Configure Firebase Cloud Messaging and Apple Push Notification service (APNs).",
        status: "To Do",
        priority: "high",
        deadline: "2026-03-05"
    },
    {
        projectID: 102,
        taskID: 10,
        name: "Privacy Policy Update",
        description: "Finalize the legal text for the App Store privacy requirements and data collection.",
        status: "To Do",
        priority: "low",
        deadline: "2026-03-12"
    },
    {
        projectID: 102,
        taskID: 11,
        name: "Beta Testing Recruitment",
        description: "Send out invites to the first 50 beta testers via TestFlight and Google Play Console.",
        status: "To Do",
        priority: "medium",
        deadline: "2026-03-08"
    }
    ]
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: initValue,
    reducers: {
        addTask: (state, actions) => {
            state.tasks.push(actions.payload)
        },
        removeTask: (state, actions) => {
            state.tasks = state.tasks.filter(t => t.taskID != actions.payload)
        },
        changeStatus: (state, actions) => {
            state.tasks = state.tasks.map(task =>
                task.taskID === actions.payload.id
                    ? { ...task, status: actions.payload.newStatus }
                    : task)
        },
        setNameDescAndDeadline: (state, actions) => {
            state.tasks = state.tasks.map(task =>
                task.taskID === actions.payload.id ?
                    { ...task, name: actions.payload.name, description: actions.payload.description, deadline: actions.payload.deadline, priority: actions.payload.priority }
                    : task
            )
        }
    }
})

export const { addTask, removeTask, changeStatus, setNameDescAndDeadline } = tasksSlice.actions
export default tasksSlice.reducer