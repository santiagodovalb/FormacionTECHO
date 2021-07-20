import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import usersReducer from "./users";
import sedesReducer from "./sedes";
import rolesReducer from "./roles";
import bloquesReducer from "./bloques";
import unidadesReducer from "./modulos";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
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
