import { createSlice } from "@reduxjs/toolkit"

const initValue={
    currentID: 1
}

const projectsRNSlice=createSlice({
    name:"projects",
    initialState:initValue,
    reducers:{
        projectsRNPromotion:(state,actions)=>{
            state.currentID+=1
        }
    }
})

export const {projectsRNPromotion}=projectsRNSlice.actions
export default projectsRNSlice.reducer