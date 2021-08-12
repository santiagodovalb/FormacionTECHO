import "./index.css";
import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/formacion">
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
