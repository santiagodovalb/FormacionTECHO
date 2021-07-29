import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/login";
import Links from "./links";
import "./style.css";
import logoMobile from "../../assets/logoMobile.png"
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (user.id) dispatch(userLogout());
  };

  return (
    <div>
      <nav className="d-block d-sm-none navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <img src={logoMobile} alt="logo techo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={`/user`}>
                  <p className="nav-link">Mi perfil</p>
                </Link>
              </li>
              <Links />
              <hr />
              {user.rolId && user.rolId === 2 && (
                <Link to="/gestor-password">
                  {" "}
                  <button> Cambiar contraseña </button>
                </Link>
              )}
              <Link to="/login">
                {" "}
                <button onClick={handleLogout}> Cerrar sesión</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
