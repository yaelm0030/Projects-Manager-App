import { createSlice } from "@reduxjs/toolkit"

const initValue={
    currentID: 1
}

const tasksRNSlice=createSlice({
    name:"projects",
    initialState:initValue,
    reducers:{
        tasksRNPromotion:(state,actions)=>{
            state.currentID+=1
        }
    }
})

export const {tasksRNPromotion}=tasksRNSlice.actions
export default tasksRNSlice.reducer