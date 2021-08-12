import React from "react";
import "./Login.css";
import { sectionStyle } from "./style";
import Logo from "../../assets/logo.png";
import 'antd/dist/antd.css';
import LoginAdmin from "./ModuleLogin/LoginAdmin"
import LoginUser from "./ModuleLogin/LoginUser"
import { useLocation } from "react-router-dom";

const Login = () => {

  const location = useLocation();

  return (
    <div >
    <div
      className="wh-100 m-0 row justify-content-center align-items-center"
      style={sectionStyle}
    >
      <div className="col-auto text-center loggin-container p-5">
        <img src={Logo} className="m-4 form-logo" alt="" />
        <div className="m-4">
          <i className="bi bi-person-circle form-img" />
        </div>
        {location.pathname === "/adminlogin" && LoginAdmin()}
        {location.pathname === "/" && LoginUser()} 
      </div>
    </div>
    </div>
  );
};

export default Login ;
