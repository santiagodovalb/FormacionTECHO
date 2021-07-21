import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Card = ({ keyU, img, title, button, icon, setState, stateIcon, url, bloque }) => {

  const completed = []

  for (let i = 0; i < bloque.unidades.length; i++) {
    let status = localStorage.getItem(`check${bloque.unidades[i].id}`) === 'true' ? true : false
    if (status === true) completed.push(status)
  }
  return (
    <div className="col-auto" key={keyU}>
      {console.log(completed)}
      <div
        className="card position-relative"
        style={{ width: "20rem", borderRadius: "10px" }}
      >
        {icon && icon.length ? (
          <div className="position-absolute top-0 end-0">
            {stateIcon.key && stateIcon.key.length && stateIcon.key === keyU ? (
              <i className={stateIcon.style} onClick={() => setState(keyU)}></i>
            ) : (
              <i className={icon} onClick={() => setState(keyU)}></i>
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

        <span>Modulos completados: {completed.length}/{bloque.unidades.length}</span>
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
