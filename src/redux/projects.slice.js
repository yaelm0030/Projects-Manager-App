import { createSlice } from "@reduxjs/toolkit"

const initValue={
    projects: [
        {
            id: 101,
            name: "Corporate Website Redesign",
            description: "Modernizing the main landing page with a focus on user engagement and responsive design.",
            date: "2026-02-01" 
        },
        {
            id: 102,
            name: "Mobile App Launch",
            description: "Preparation for the iOS and Android release, including store assets and final QA.",
            date: "2026-02-15"
        },
        {
            id: 103,
            name: "Marketing Campaign Q1",
            description: "Social media outreach and email newsletter automation for the upcoming spring sale.",
            date: "2026-01-20"
        },
        {
            id: 104,
            name: "Internal Dashboard System",
            description: "Building an analytics tool for the HR department to track employee performance metrics.",
            date: "2026-02-25"
        }
    ]}

const projectsSlice=createSlice({
    name:"projects",
    initialState:initValue,
    reducers:{
        addProject:(state,actions)=>{
            state.projects.push(actions.payload)
        },
        removeProject:(state,actions)=>{
            state.projects=state.projects.filter(p=>p.id!=actions.payload)
        },
        updateProject:(state, actions) => {
            const { id, name, description } = actions.payload;
            state.projects = state.projects.map(p =>
                p.id === id ? { ...p,
                    ...(name !== undefined ? { name } : {}),
                    ...(description !== undefined ? { description } : {})
                } : p
            );
        }
    }
})

export const {addProject,removeProject,updateProject}=projectsSlice.actions
export default projectsSlice.reducer