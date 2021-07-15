import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userLoggedReducer from "./login"

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user:userLoggedReducer,
  },
});

export default store;
