import "./App.css";
import VolunteerProfile from "../src/containers/Volunteer/VolunteerProfile";
import VolunteerContent from "../src/containers/Volunteer/VolunteerContent";
import VolunteerModuls from "../src/containers/Volunteer/VolunteerModuls";
import AdminContent from "../src/containers/Admin/AdminContent";
import GestorContent from "../src/containers/Gestor/gestorContent";
import AdminUsers from "../src/containers/Admin/AdminUsers/index";
import Unauthorized from "./containers/Unauthorized";
import Login from "./containers/login";
import Sede from "./containers/sede";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)));
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sede" component={Sede} />
        <Route exact path="/user/:id" component={VolunteerProfile} />
        <Route exact path="/user/:id/misbloques" component={VolunteerContent} />
        <Route exact path="/user/:id/mismodulos" component={VolunteerModuls} />
        <Route exact path="/user/:id/bloques" component={AdminContent} />
        <Route exact path="/user/:id/gestor" component={GestorContent} />
        <Route exact path="/user/:id/admin-bloques" component={AdminContent} />
        <Route exact path="/user/:id/admin-usuarios" component={AdminUsers} />
        <Route exact path="/unauthorized" component={Unauthorized} />
        <Redirect from="*" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
