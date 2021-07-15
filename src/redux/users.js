import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"

export const setUsers = createAsyncThunk ("SET-USERS",() =>{
    return axios.get("/api/users/").then(res=>res.data)
})

const usersReducer = createReducer([],{
    [setUsers.fulfilled]: (state,action) => action.payload,
})


export default usersReducer