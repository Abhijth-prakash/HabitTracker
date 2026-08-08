import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Adduser = createAsyncThunk(
    'adding user',
    async (userData)=>{
        try{
            const response = axios.post('http://localhost:8888/user/registration',userData)
            return  response.data
        }catch(error){
            console.log(error)
        }
       
    }
)

const userSlice = createSlice({
    name:"userSlice",
    initialState : {
        loading: false,
        user : [],
        error: null
    },reducers:{},
    extraReducers: (build)=>{
        build 
            .addCase(Adduser.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(Adduser.fulfilled,(state,action)=>{
                state.user = action.payload
            })
            .addCase(Adduser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer