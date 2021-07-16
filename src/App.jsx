import './App.css';
import VolunteerProfile from '../src/containers/Volunteer/VolunteerProfile'
import VolunteerContent from '../src/containers/Volunteer/VolunteerContent'
import AdminContent from '../src/containers/Admin/AdminContent'
import AdminUsers from "../src/containers/Admin/AdminUsers/index"
import Unauthorized from './containers/Unauthorized';
import Login from "./containers/login";
import React,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLogged } from "./redux/login";
import {Route, Switch, Redirect} from 'react-router-dom';

function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(setUserLogged())
  },[dispatch])


  return (
    <div className="App">
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/user/:id" component={VolunteerProfile} />
      <Route exact path="/user/:id/misbloques" component={VolunteerContent} />
      <Route exact path="/user/:id/admin-bloques" component={AdminContent} />
      <Route exact path="/user/:id/admin-usuarios" component={AdminUsers} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Redirect from="*" to="/login" />
    </Switch>
    </div>
  );
}

export default App;
