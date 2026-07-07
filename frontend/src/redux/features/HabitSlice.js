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
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:8888/habits/${id}`)
            return response.data

        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


export const updateHabits = createAsyncThunk(
    'updateHabits',
    async ({id,habit}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8888/habits/${id}`,{habit})
            return response.data

        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


export const completedHabits = createAsyncThunk(
    'CompletedHabits',
    async ({id,completed}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8888/habits/${id}`,{completed})
            return response.data

        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const HabitSlice = createSlice({
    name:"taskslice",
    initialState:{
        habits:[],
        loading:false,
        error:null,
        previousState: []
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
     .addCase(deleteHabits.pending, (state, action) => {
    state.loading = true
    state.previousState = state.habits
    const { id } = action.meta.arg
    state.habits = state.habits.filter(item => item._id !== id)
})
      .addCase(deleteHabits.fulfilled, (state,action) => {
    state.habits = action.payload.habits
    state.loading = false
    state.previousState = null
})
.addCase(deleteHabits.rejected, (state, action) => {
    state.habits = state.previousState
    state.previousState = null
    state.loading = false
    state.error = action.error.message
})
     .addCase(updateHabits.pending, (state, action) => {
    state.loading = true
})
      .addCase(updateHabits.fulfilled, (state,action) => {
    state.habits = action.payload.habits
    state.loading = false
})
.addCase(updateHabits.rejected, (state, action) => {
    state.loading = false
    state.error = action.error.message
})
     .addCase(completedHabits.pending, (state, action) => {
    state.loading = true
})
      .addCase(completedHabits.fulfilled, (state,action) => {
    state.habits = action.payload.habits
    state.loading = false
})
.addCase(completedHabits.rejected, (state, action) => {
    state.loading = false
    state.error = action.error.message
})


    }
})


export default HabitSlice.reducer
