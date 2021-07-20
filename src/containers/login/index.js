import React from "react";
import "./index.css";
import { sectionStyle } from "./style";
import Logo from "../../assets/logo.png";
import 'antd/dist/antd.css';
import { Route } from "react-router";
import LoginAdmin from "./ModuleLogin/loginAdmin"
import LoginUser from "./ModuleLogin/loginUser";
import { useLocation } from "react-router-dom";

const Login = () => {

  const location = useLocation();

  return (
    <div
      className="wh-100 m-0 row justify-content-center align-items-center"
      style={sectionStyle}
    >
      <div className="col-auto text-center loggin-container p-5">
        <img src={Logo} className="m-4 form-logo" alt="" />
        <div className="m-4">
          <i className="bi bi-person-circle form-img" />
        </div>
        {console.log(location.pathname)}
        {location.pathname === "/adminlogin" && LoginAdmin()}
        {location.pathname === "/login" && LoginUser()} 
      </div>
    </div>
  );
};

export default Login ;
