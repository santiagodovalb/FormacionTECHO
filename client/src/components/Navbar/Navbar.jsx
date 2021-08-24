import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, userLogout } from "../../redux/user";
import Links from "./Links";
import "./Navbar.css";
import logoMobile from "../../assets/logoMobile.png"
import axios
 from "axios";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleLogout = () => {
    axios.post("/api/users/logout")
    .then(() => dispatch(setUser({})))
    .then(() => history.push('/'))
  };

  return (
    <div>
      <nav className="d-block d-md-none navbar navbar-expand-lg navbar-dark">
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
