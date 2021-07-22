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
import GestorVoluntarios from "./containers/Gestor/gestorVoluntarios";
import AdminSedes from './containers/Admin/AdminSedes' 
import CrearBloque from "./containers/Admin/AdminBloques/CrearBloque";
import AdminBloques from "./containers/Admin/AdminBloques";
import ModificarBloque from "./containers/Admin/AdminBloques/ModificarBloque";
import AdminRoles from "./containers/Admin/AdminRoles";
import VolunteerEntregas from "./containers/Volunteer/VolunteerEntregas";
import GestorEntregas from "./containers/Gestor/GestorEntregas";
import EntregaIndividual from "./containers/Gestor/EntregaIndividual";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getBloques());
    dispatch(getSedes());
    dispatch(getRoles());

    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => dispatch(setUser(user)));
  }, [dispatch]);

  return (
    <div className="App">
      {!location.pathname.includes("login") && <Sidebar />}

      <Switch>
        <Route exact path="/adminlogin" component={Login} />
        <Route exact path="/login" component={Login} />
      <div className='content'>
        <Route path="/sede" component={Sede} />
        <Route exact path="/user" component={VolunteerProfile} />
        <Route exact path="/mis-bloques/:id" component={VolunteerModuls} />
        <Route path="/mis-bloques" component={VolunteerContent} />
        <Route path="/mis-entregas" component={VolunteerEntregas} />
        <Route path="/bloque/:id" component={VolunteerModuls} />
        <Route path="/bloques" component={AdminContent} />
        <Route exact path="/gestor" component={GestorContent} />
        <Route path="/gestor/voluntarios" component={GestorVoluntarios} />
        <Route exact path="/gestor/entregas" component={GestorEntregas} />
        <Route exact path="/gestor/entregas/:id" component={EntregaIndividual} />
        <Route path="/gestor-password" component={GestorContent} />
        <Route exact path="/admin-bloques" component={AdminBloques} />
        <Route path="/admin-bloques-crear" component={CrearBloque} />
        <Route path="/admin-bloques/:id" component={ModificarBloque} />
        <Route exact path="/admin-usuarios" component={AdminUsers} />
        <Route exact path="/admin-sedes" component={AdminSedes} />
        <Route exact path="/admin-roles" component={AdminRoles} />
        <Route path="/admin-usuarios/sede/:id" component={Users} />
        <Route path="/admin-crear-gestor" component={CrearGestor} />
        <Route path="/unauthorized" component={Unauthorized} />
      </div>
        <Redirect from="*" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
