import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Card = ({ img, title, button, icon }) => {
  return (
    <>
      <div
        className="card position-relative"
        style={{ width: "20rem", borderRadius: "10px" }}
      >
        {icon && icon.length ? (
          <div class="position-absolute top-0 end-0">
            <i class={icon}></i>
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
    </>
  );
};

export default Card;
