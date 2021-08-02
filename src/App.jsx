
import Login from "./containers/Login/Login";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/SideBar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { useLocation } from "react-router";
import { getRoles } from "./redux/roles";
import { getSedes } from "./redux/sedes";
import { getBloques } from "../src/redux/bloques";
import { setUsers } from "./redux/users";
import "./App.css";
import Routes from "./Routes";
import Loader from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()

  useEffect(() => {
      dispatch(setUsers())
      .then(() => dispatch(getBloques()))
      .then(() => dispatch(getSedes()))
      .then(() => dispatch(getRoles()))
      .then(() => dispatch(getBloques()))
      .then(() => axios.get("/api/users/me"))
      .then((res) => res.data)
      .then((user) => axios.get(`/api/users/${user.id}`))
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)))
      .then(() => setLoading(false))
      .catch(err => {
        setLoading(false)
        if (!location.pathname.includes('login')) history.push('/login')
      })
  }, [dispatch, history, location.pathname, loading]);

  return (
    <div className="App">
      {console.log(loading)}
      <Loader
        id='loader'
        type="Puff"
        color="#00BFFF"
        visible={loading}
      />
      {!location.pathname.includes("login") && <Sidebar />}
      {!location.pathname.includes("login") && <Navbar />}
      <Switch>
        <Route exact path="/adminlogin" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route component={Routes} />
      </Switch>
    </div>
  );
}

export default App;
