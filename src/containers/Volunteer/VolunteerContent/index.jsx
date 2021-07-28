import React from "react";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";
import "./styles.css";

const VolunteerContent = () => {
  const user = useSelector((state) => state.user);

  const bloques = useSelector((state) => state.bloques);

  const bloquesDelUser = bloques.filter((bloque) =>
    bloque.roles.map((rol) => rol.id).includes(user.rolId)
  );

  return (
    <>
      <div>
        <div className="volunteer_content_div">
        <h1 className="fs-3 text-secondary m-5">
            <strong>Bloques mínimos</strong>
          </h1>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map(
                (bloque) =>
                  bloque.minimo && (
                    <Card
                      key={bloque.id}
                      bloque={bloque}
                      img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                      title={bloque.titulo}
                      button={{
                        text: "Ver modulos",
                        styles: "button-style green fs-4",
                      }}
                      url={`mis-bloques/${bloque.id}`}
                    />
                  )
              )}
            </div>
          </div>
          <h1 className="fs-3 text-secondary m-5">
            <strong>Bloques opcionales</strong>
          </h1>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map(
                (bloque) =>
                  !bloque.minimo && (
                    <Card
                      key={bloque.id}
                      bloque={bloque}
                      img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                      title={bloque.titulo}
                      button={{
                        text: "Ver modulos",
                        styles: "button-style light-blue fs-4",
                      }}
                      url={`mis-bloques/${bloque.id}`}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerContent;
