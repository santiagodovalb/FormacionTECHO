import './App.css';
import VolunteerProfile from '../src/containers/Volunteer/VolunteerProfile'
import VolunteerContent from '../src/containers/Volunteer/VolunteerContent'
import AdminContent from '../src/containers/Admin/AdminContent'
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
      <Route exact path="/user/:id/bloques" component={AdminContent} />
      <Redirect from="*" to="/login" />
    </Switch>
    </div>
  );
}

export default App;
