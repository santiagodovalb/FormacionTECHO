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
import Sidebar from "./components/SideBar";
import { useLocation } from "react-router";
import { getRoles } from "./redux/roles";
import CrearGestor from "./containers/Admin/CrearGestor";
import { getSedes } from "./redux/sedes";
import Users from "./containers/Admin/AdminUsers/Users";
import { getBloques } from "../src/redux/bloques"
import AdminSedes from './containers/Admin/AdminSedes' 

function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getBloques())
    dispatch(getSedes())
    dispatch(getRoles())

    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)));
  }, [dispatch]);

  return (
    <div className="App">
      {!location.pathname.includes('login') && <Sidebar />}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/adminlogin" component={Login} />
        <Route path="/sede" component={Sede} />
        <Route exact path="/user" component={VolunteerProfile} />
        <Route path="/mis-bloques" component={VolunteerContent} />
        <Route path="/mis-modulos" component={VolunteerModuls} />
        <Route path="/bloques" component={AdminContent} />
        <Route path="/gestor" component={GestorContent} />
        <Route path="/admin-bloques" component={AdminContent} />
        <Route exact path="/admin-usuarios" component={AdminUsers} />
        <Route exact path="/admin-sedes" component={AdminSedes} />
        <Route path="/admin-usuarios/sede/:id" component={Users} />
        <Route path="/admin-crear-gestor" component={CrearGestor} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Redirect from="*" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
