import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"

export const setUserLogged = createAsyncThunk ("SET-USER-LOGGED",() =>{
    return axios.get("/api/me").then(res=>res.data)
})


const userLoggedReducer = createReducer({},{
    [setUserLogged.fulfilled]: (state,action) => action.payload
})


export default userLoggedReducer