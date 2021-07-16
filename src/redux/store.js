import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user"
import usersReducer from './users'
import sedesReducer from "./sedes";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    users: usersReducer,
    sedes: sedesReducer
  },
});

export default store;
