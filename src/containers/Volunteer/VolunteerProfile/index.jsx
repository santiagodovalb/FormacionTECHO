import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { useHistory } from "react-router-dom";
import Instructions from "./instructions";
import { Button } from "antd";

const VolunteerProfile = () => {
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const handleClick = () => {
    history.push("/sede");
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <div>
        {console.log(user)}
        <div className="volunteer_profile_div">
          <h2>¡Bienvenid@, {user.full_name}!</h2>
          {user.rolId === 2 && (user.sedeId ? <h5>Tu sede es: {user.sede?.nombre}</h5> : <h5>El admin debe asignarte una sede</h5>)}
          {user.rolId === null && (user.sedeId ? (<h5>Tu sede es: {user.sede?.nombre}</h5>) : (
              <Button type="primary" onClick={handleClick}>
                Debes elegir una sede
              </Button>
            ))
          }
          {user.rol?.tipo ? (
            <h5>Tu rol es: {user.rol?.tipo}</h5>
          ) : (
            <h5>Ponete en contacto con tu gestor para que te asigne un rol</h5>
          )}
          <div className="instructions">
            <h6>¿Cómo funciona el sitio?</h6>
            <Instructions />
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerProfile;
