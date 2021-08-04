import VolunteerProfile from "./containers/UserProfile/UserProfile";
import VolunteerContent from "../src/containers/Volunteer/VolunteerContent/VolunteerContent";
import VolunteerModuls from "./containers/Volunteer/VolunteerModuls/VolunteerModules";
import GestorPassword from "./containers/Gestor/GestorPassword/GestorPassword";
import AdminUsers from "./containers/Admin/AdminUsers/AdminUsers";
import Unauthorized from "./containers/Unauthorized/Unauthorized";
import Sedes from "./containers/Sedes/Sedes";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./containers/Admin/AdminUsers/Users";
import GestorVoluntarios from "./containers/Gestor/GestorVoluntarios/GestorVoluntarios";
import AdminSedes from "./containers/Admin/AdminSedes/AdminSedes";
import CrearBloque from "./containers/Admin/AdminBloques/CrearBloque";
import AdminBloques from "./containers/Admin/AdminBloques/AdminBloques";
import ModificarBloque from "./containers/Admin/AdminBloques/ModificarBloque";
import AdminRoles from "./containers/Admin/AdminRoles/AdminRoles";
import VolunteerEntregas from "./containers/Volunteer/VolunteerEntregas/VolunteerEntregas";
import GestorEntregas from "./containers/Gestor/GestorEntregas/GestorEntregas";
import EntregaIndividual from "./containers/Gestor/EntregaIndividual/EntregaIndividual";
import "./Routes.css";
import DashboardGestor from "./containers/Gestor/DashboardGestor/DashboardGestor";
import CrearGestor from "./containers/Admin/CrearGestor/CrearGestor";
import AdminDashboard from "./containers/Admin/AdminDashboard/DashboardAdmin";

function Routes() {

  return (
        <div className="content">
      <Switch>
          <Route path="/formacion/sede" component={Sedes} />
          <Route exact path="/formacion/user" component={VolunteerProfile} />
          <Route path="/formacion/mis-bloques/:id" component={VolunteerModuls} />
          <Route exact path="/formacion/mis-bloques" component={VolunteerContent} />
          <Route path="/formacion/mis-entregas" component={VolunteerEntregas} />
          <Route exact path="/formacion/gestor" component={GestorPassword} />
          <Route path="/formacion/gestor/voluntarios" component={GestorVoluntarios} />
          <Route exact path="/formacion/gestor/entregas" component={GestorEntregas} />
          <Route path='/formacion/gestor/dashboard' component={DashboardGestor} />
          <Route
            exact
            path="/formacion/gestor/entregas/:id"
            component={EntregaIndividual}
          />
          <Route path="/formacion/gestor-password" component={GestorPassword} />
          <Route exact path="/formacion/admin-bloques" component={AdminBloques} />
          <Route path="/formacion/admin-bloques-crear" component={CrearBloque} />
          <Route path="/formacion/admin-bloques/:id" component={ModificarBloque} />
          <Route exact path='/formacion/admin/dashboard' component={AdminDashboard} />
          <Route exact path="/formacion/admin-usuarios" component={AdminUsers} />
          <Route exact path="/formacion/admin-sedes" component={AdminSedes} />
          <Route exact path="/formacion/admin-roles" component={AdminRoles} />
          <Route path="/formacion/admin-usuarios/sede/:id" component={Users} />
          <Route path="/formacion/admin-crear-gestor" component={CrearGestor} />
          <Route path="/formacion/unauthorized" component={Unauthorized} />
          <Redirect from="*" to="/formacion/user" />
      </Switch>
      </div>
    
  );
}

export default Routes;
