import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/TaskSlice'

export default configureStore({
    reducer:{
        data:taskReducer
    }
})