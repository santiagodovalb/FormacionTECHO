import React, { useState } from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import googleMap from "../../assets/sedes/lima-peru.png";

const Card = ({
  id,
  img,
  title,
  button,
  icon,
  setState,
  stateIcon,
  url,
  bloque,
}) => {
  const location = useLocation().pathname;
  const completed = [];

  for (let i = 0; i < bloque?.unidades?.length; i++) {
    let status =
      localStorage.getItem(`check${bloque?.unidades[i]?.id}`) === "true"
        ? true
        : false;
    if (status === true) completed.push(status);
  }
  return (
    <div className="col-auto my-5" key={id}>
      <div
        className="card position-relative"
        style={{ width: "300px", borderRadius: "10px" }}
      >
        {icon && icon.length ? (
          <div className="position-absolute top-0 end-0">
            {stateIcon.key && stateIcon.key.length && stateIcon.key === id ? (
              <i className={stateIcon.style} onClick={() => setState(id)}></i>
            ) : (
              <i className={icon} onClick={() => setState(id)}></i>
            )}
          </div>
        ) : (
          ""
        )}

        {title && title.length ? (
          <div className="card-body">
            <h3 className="card-title text-center">{title}</h3>
          </div>
        ) : (
          ""
        )}

        {location === "/mis-bloques" ? (
          <span>
            Modulos completados: {completed.length}/{bloque?.unidades.length}
          </span>
        ) : img === undefined ? (
          <img src={img} />
        ) : (
          <img src={googleMap} />
        )}
        <Link to={url}>
          <div
            className={` ${button.styles} p-3 text-center`}
            style={{ width: "100%" }}
          >
            {button.text}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
