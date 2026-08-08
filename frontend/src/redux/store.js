import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/HabitSlice'
import userReducer from './features/UserSlice'

export default configureStore({
    reducer:{
        data:taskReducer,
        userData:userReducer
    }
})