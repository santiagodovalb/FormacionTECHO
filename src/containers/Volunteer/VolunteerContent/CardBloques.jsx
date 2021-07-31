import React from "react";
import "./VolunteerContent.css";
import { Link } from "react-router-dom";
import { Progress } from "antd";

const CardBloques = ({
  id,
  title,
  button,
  bloque,
  url
}) => {
  const completed = [];

  for (let i = 0; i < bloque?.unidades?.length; i++) {
    let status =
      localStorage.getItem(`check${bloque?.unidades[i]?.id}`) === "true"
        ? true
        : false;
    if (status === true) completed.push(status);
  }
  return (
    <div className="col-auto" key={id}>
      <div
        className="card position-relative"
      >

          <div className="card-body">
            <h3 className="card-title text-center">{title}</h3>
          </div>

        
          <div className="circle">
            <Progress
              type="circle"
              percent={Math.floor(
                (completed.length * 100) / bloque?.unidades.length
              )}
              format={() => `${completed.length}/${bloque?.unidades.length}`}
            />
          </div>
        
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

export default CardBloques;

