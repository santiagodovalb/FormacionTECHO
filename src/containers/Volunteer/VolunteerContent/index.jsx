import React from "react";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";
import "./styles.css";

const VolunteerContent = () => {
  const user = useSelector((state)=>state.user)

  const bloques = useSelector((state) => state.bloques);

  const bloquesDelUser = bloques.filter(bloque=>bloque.roles.map(rol=>rol.id).includes(user.rolId))

  return (
  
    <>
      <div>
        <div className="volunteer_content_div">
          <h2>Bloques minimos</h2>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map((bloque) => (
                bloque.minimo &&
                <Card
                  img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                  title={bloque.titulo}
                  url={`/bloque/${bloque.id}`}
                  button={{
                    text: "Ver modulos",
                    styles: "btn btn-primary",
                  }}
                />
              ))}
            </div>
          </div>
          <h2>Bloques opcionales</h2>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map((bloque) => (
                !bloque.minimo &&
                <Card
                  img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                  title={bloque.titulo}
                  button={{
                    text: "Ver modulos",
                    styles: "btn btn-primary",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerContent;
