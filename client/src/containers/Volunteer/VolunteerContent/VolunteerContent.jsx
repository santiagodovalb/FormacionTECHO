import React from "react";
import CardBloques from "./CardBloques";
import { useSelector } from "react-redux";
import "./VolunteerContent.css";

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
        <h1 className="fs-3 text-secondary m-5 title">
            <strong>Bloques mínimos</strong>
          </h1>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map(
                (bloque) =>
                  bloque.minimo && (
                    <CardBloques
                      key={bloque.id}
                      bloque={bloque}
                      title={bloque.titulo}
                      button={{
                        text: "Ver módulos",
                        styles: "button-style light-blue fs-4",
                      }}
                      url={`mis-bloques/${bloque.id}`}
                    />
                  )
              )}
            </div>
          </div>
          <h1 className="fs-3 text-secondary m-5 title">
            <strong>Bloques opcionales</strong>
          </h1>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map(
                (bloque) =>
                  !bloque.minimo && (
                    <CardBloques
                      key={bloque.id}
                      bloque={bloque}
                      title={bloque.titulo}
                      button={{
                        text: "Ver módulos",
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
