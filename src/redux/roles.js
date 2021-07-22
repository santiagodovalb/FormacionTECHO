import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"



export const getRoles = createAsyncThunk("GET-ROLES", ()=>{
    return axios.get("/api/roles").then(res=>res.data)
})




const rolesReducer = createReducer([],{
    [getRoles.fulfilled] : (state,action) => action.payload,
})

export default rolesReducer;