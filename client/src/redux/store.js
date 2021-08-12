import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import usersReducer from "./users";
import sedesReducer from "./sedes";
import rolesReducer from "./roles";
import bloquesReducer from "./bloques";
import unidadesReducer from "./modulos";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    sedes: sedesReducer,
    roles: rolesReducer,
    bloques: bloquesReducer,
    unidades: unidadesReducer,
  },
});

export default store;
