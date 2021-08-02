import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/login";
import Links from "./Links";
import { BsPeopleCircle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    if (user.id) dispatch(userLogout());
    history.push('/login')
  };

  const handlePassword = () => {
    history.push('/gestor-password')
  }

  const location = useLocation().pathname;

  return (
    <>
      <div
        className="sidebar d-flex flex-column flex-shrink-0 p-3"
        style={{ width: "280px" }}
      >
        <img
          src="https://static.wixstatic.com/media/602b79_9aea50902ee84caeafdbaf5b85ddfd19~mv2.png/v1/fill/w_420,h_140,al_c,q_95/Logo%20PNG%20en%20negativo.webp"
          alt="logo-techo"
        />
        <hr />
        <img
          className="volunteer_sidebar_image"
          src={
            user.img
              ? user.img
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt=""
        />
        <h4>{user.full_name}</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to={`/user`}>
              <h6
                className={
                  location.includes("/user")
                    ? `nav-link link-light fs-5 fw-bolder`
                    : `nav-link link-light`
                }
              >
                <BsPeopleCircle /> Mi perfil
              </h6>
            </Link>
          </li>
          <Links />
        </ul>
        <hr />
        {user.rolId && user.rolId === 2 && (
        
            
            <button className="btn btn-secondary" onClick={handlePassword}> Cambiar contraseña </button>
          
        )}
          
          <button className="btn btn-secondary" onClick={handleLogout}>
            
            Cerrar sesion
          </button>
      </div>
    </>
  );
};

export default Sidebar;
