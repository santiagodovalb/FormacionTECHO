import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"

export const setUserLogged = createAsyncThunk ("SET-USER-LOGGED",() =>{
    return axios.get("/api/users/me").then(res=>res.data)
})

export const setUser = createAsyncThunk("SET-USER",(x)=>{
    return axios.post("/api/users/login", x)
           .then(res=> res.data)
})


export const userLogout = createAsyncThunk("USER-LOGOUT", () => {
    return axios.post("/api/users/logout").then(res => {
      return res.data
    })
  })

const userLoggedReducer = createReducer({},{
    [setUserLogged.fulfilled]: (state,action) => action.payload,
    [setUser.fulfilled] : (state,action) => action.payload,
    [userLogout.fulfilled] : (state,action) => action.payload
})


export default userLoggedReducer