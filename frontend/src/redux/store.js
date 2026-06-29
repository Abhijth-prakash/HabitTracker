import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/HabitSlice'

export default configureStore({
    reducer:{
        data:taskReducer
    }
})