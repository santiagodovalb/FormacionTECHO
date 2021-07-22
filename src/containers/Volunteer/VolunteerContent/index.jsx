import React from "react";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./styles.css";

const VolunteerContent = () => {
  const user = useSelector((state) => state.user);

  const bloques = useSelector((state) => state.bloques);

  const location = useLocation().pathname;

  const bloquesDelUser = bloques.filter((bloque) =>
    bloque.roles.map((rol) => rol.id).includes(user.rolId)
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
                  url={`${location}/${bloque.id}`}
                />
              ))}
            </div>
          </div>
          <h2>Bloques opcionales</h2>
          <div className="content_div">
            <div className="single_content_div">
              {bloquesDelUser.map(
                (bloque) =>
                  !bloque.minimo && (
                    <Card
                      img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                      title={bloque.titulo}
                      button={{
                        text: "Ver modulos",
                        styles: "btn btn-primary",
                      }}
                      url={`${location}/${bloque.id}`}
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
