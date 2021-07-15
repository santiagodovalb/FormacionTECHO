import "./App.css";
import React,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./containers/login";
import { setUserLogged } from "./redux/login";

function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(setUserLogged())
  },[dispatch])

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
