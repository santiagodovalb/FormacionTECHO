import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"

export const getSedes = createAsyncThunk ("GET_SEDES",() =>{
    return axios.get("/api/sedes/").then(res=>res.data)
})

const sedesReducer = createReducer([],{
    [getSedes.fulfilled]: (state,action) => action.payload,
})


export default sedesReducer