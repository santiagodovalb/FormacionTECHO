import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Card = ({ keyU, img, title, button, icon, setState, stateIcon }) => {
  return (
    <div className="col-auto" key={keyU}>
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

        <img src={img} alt="" />
        <Link to="/">
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