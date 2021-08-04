import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";
import { useHistory } from "react-router-dom";
import Instructions from "./instructions";
import { Button } from "antd";
import fondo from "../../assets/login/adminLogin.JPG";
import { MdLocationOn } from "react-icons/md";

const UserProfile = () => {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const handleClick = () => {
    history.push("/formacion/sede");
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <div className="volunteer_profile_div">
        <img
          src={fondo}
          alt="imagen de fondo"
          className="profileImageBackground"
        />
        <div className="user_profile px-4">
          <h2 className="text-center">¡Bienvenid@, {user.full_name}!</h2>

          {user.rolId === 2 &&
            (user.sedeId ? (
              <h5>
                <MdLocationOn /> {user.sede?.nombre}
              </h5>
            ) : (
              <h5>El admin debe asignarte una sede</h5>
            ))}

          {(user.rolId === null || user.rolId > 2) &&
            (user.sedeId ? (
              <h5>
                <MdLocationOn /> {user.sede?.nombre}
              </h5>
            ) : (
              <Button type="dashed" onClick={handleClick}>
                Debes elegir una sede
              </Button>
            ))}
          {user.rol?.tipo ? (
            <h5>{user.rol?.tipo}</h5>
          ) : (
            <h5 className="text-center mt-5">
              Ponete en contacto con tu gestor para que te asigne un rol
            </h5>
          )}
          <div className="instructions">
            <h4>¿Cómo funciona el sitio?</h4>
            <Instructions />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
