
import Login from "./containers/login";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/SideBar";
import { useLocation } from "react-router";
import { getRoles } from "./redux/roles";
import { getSedes } from "./redux/sedes";
import { getBloques } from "../src/redux/bloques";
import Routes from "./Routes";
import Loader from "react-loader-spinner";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getBloques());
    dispatch(getSedes());
    dispatch(getRoles());

    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => axios.get(`/api/users/${user.id}`))
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)))
      .catch(err => {
        if (!location.pathname.includes('login')) history.push('/login')
      })
    setIsLoading(false)
  }, [dispatch]);

  return (
    <div className="App">
       <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        visible={isLoading}
      />
      {(!location.pathname.includes("login") && !location.pathname.includes("unauthorized")) && <Sidebar />}
      <Switch>
        <Route exact path="/adminlogin" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route component={Routes} />
      </Switch>
    </div>
  );
}

export default App;
