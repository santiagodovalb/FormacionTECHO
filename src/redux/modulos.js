import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getUnidades = createAsyncThunk("GET-MODULOS", () => {
  return axios.get("/api/unidades").then((res) => res.data);
});

const unidadesReducer = createReducer([], {
  [getUnidades.fulfilled]: (state, action) => action.payload,
});

export default unidadesReducer;
