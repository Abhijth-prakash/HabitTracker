import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getHabits = createAsyncThunk(
    'gethabits',
    async () => {
        try {
            const response = await axios.get('http://localhost:8888/habits')  
            console.log(response.data)
            return response.data  
        } catch (error) {
            console.log(error)
        }
    }
)

const HabitSlice = createSlice({
    name:"taskslice",
    initialState:{
        data:[],
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
            state.data = action.payload
            state.loading = false
        })
        .addCase(getHabits.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
}
)


export default HabitSlice.reducer
