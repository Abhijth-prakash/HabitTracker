import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
    name:"taskslice",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{}
}
)


export default TaskSlice.reducer