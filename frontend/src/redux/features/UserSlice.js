import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const Adduser = createAsyncThunk(
    'user/add',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/registration', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Something went wrong' }
            )
        }
    }
)

export const Loginuser = createAsyncThunk(
    'user/loginUser',
    async (data,{rejectWithValue} )=>{
        try{
            const response = await api.post('/user/login',data)
            return response.data

        }catch(error){
            return rejectWithValue(
                error.response?.data || {message :"something went wrong"}
            )
        }
    }
)

 
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/logout')
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Something went wrong' }
      )
    }
  }
)

export const userProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try{
            const response = await api.get('/user/profile')
            return response.data
        }catch(error){
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
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(Adduser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(Loginuser.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(Loginuser.fulfilled,(state,action)=>{
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(Loginuser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(logoutUser.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.user = null
                state.loading = false
            })
            .addCase(logoutUser.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(userProfile.pending,(state,action)=>{
                state.loading = true
            })
            .addCase(userProfile.fulfilled,(state,action)=>{
                state.user = action.payload.user
                state.loading = false
            })
            .addCase(userProfile.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload
            })
    }
})

export default userSlice.reducer