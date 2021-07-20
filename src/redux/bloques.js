import { createAsyncThunk , createReducer} from "@reduxjs/toolkit";
import axios from "axios"



export const getBloques = createAsyncThunk("GET-BLOQUES",()=>{
    return axios.get("/api/bloques").then(res=>res.data)
})




const bloquesReducer = createReducer([],{
    [getBloques.fulfilled] : (state,action) => action.payload,
})


export default bloquesReducer;