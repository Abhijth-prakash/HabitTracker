import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const Adduser = createAsyncThunk(
    'user/add',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8888/user/registration', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Something went wrong' }
            )
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
                state.error = action.payload
            })
    }
})

export default userSlice.reducer