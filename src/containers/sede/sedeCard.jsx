import React from "react";

const SedeCard = ({
  id,
  button,
  icon,
  setState,
  stateIcon,
}) => {
  

  return (
    <div className="col-auto" key={id}>
      <div
        className="card position-relative"
      >
        

          <div 
            className={` ${button.styles} p-3 text-center`}
            style={{width: "100%" }}
          >
            {button.text}
            {icon && icon.length ? (
          <div>
            {stateIcon.key && stateIcon.key.length && stateIcon.key === id ? (
              <i className={stateIcon.style} onClick={() => setState(id)}></i>
            ) : (
              <i className={icon} onClick={() => setState(id)}></i>
            )}
          </div>
        ) : (
          ""
        )}
          </div>

      </div>
    </div>
  );
};

export default SedeCard;
