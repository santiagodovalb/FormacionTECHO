import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"

export const setUsers = createAsyncThunk ("SET-USERS",() =>{
    return axios.get("/api/users/").then(res=>res.data)
})

export const updatePassword = createAsyncThunk ("UPDATE_PASSWORD", ({id,oldP, newP }) => {
    return axios.put(`/api/users/updatePass/${id}`, {oldP, newP})
    .then(res => {
        return res.data})
        
})

const usersReducer = createReducer([],{
    [setUsers.fulfilled]: (state,action) => action.payload,
    [updatePassword.fulfilled]: (state, action) => action.payload,
    [updatePassword.rejected]: (state, action) => action.payload,
})


export default usersReducer