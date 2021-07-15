import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userLoggedReducer from "./login"
import usersReducer from './users'

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user:userLoggedReducer,
    users: usersReducer
  },
});

export default store;
