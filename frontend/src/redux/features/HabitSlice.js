import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getHabits = createAsyncThunk(
    'gethabits',
    async () => {
        try {
            const response = await axios.get('http://localhost:8888/habits')  
            return response.data  
        } catch (error) {
            console.log(error)
        }
    }
)

export const addHabits = createAsyncThunk(
    'addhabits',
    async (habit)=>{
        try{
            const response = await axios.post('http://localhost:8888/habits',habit)
            return response.data
        }catch(error){
            console.log(error)
        }
    }
)

export const deleteHabits = createAsyncThunk(
    'deleteHabits',
    async (id)=>{
        try{
            const response = await axios.delete('http://localhost:8888/habits')
            return response.data

        }catch(error){
            console.log(error)
        }
    }
)

const HabitSlice = createSlice({
    name:"taskslice",
    initialState:{
        habits:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(build)=>{
        build
        .addCase(getHabits.pending,(state)=>{
            state.loading = true
        })
        .addCase(getHabits.fulfilled,(state,action)=>{
            state.habits = action.payload.habits
            state.loading = false
        })
        .addCase(getHabits.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(addHabits.pending,(state)=>{
            state.loading = true
        })
        .addCase(addHabits.fulfilled,(state,action)=>{
            state.habits = action.payload.habits
            state.loading = false
        })
        .addCase(addHabits.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(deleteHabits.pending,(state)=>{
            state.loading = true
            const {id} = action.meta.arg
            state.habits = state.habits.filter(item=>{item._id !== id})
        })
        .addCase(deleteHabits.fulfilled,(state,action)=>{
            state.habits = action.payload.habits
            state.loading = false
        })
        .addCase(addHabits.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
}
)


export default HabitSlice.reducer
