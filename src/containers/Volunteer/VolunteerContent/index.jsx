import React from "react";
import Sidebar from "../../../components/SideBar";
import Card from "../../../components/Card";
import "./styles.css";

const VolunteerContent = () => {
  return (
    <>
      <div>
        <div className="volunteer_content_div">
          <h2>Bloques minimos</h2>
          <div className="content_div">
            <div className="single_content_div">
              {[1, 2, 3, 4, 5].map((ele) => (
                <Card
                  img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                  title="Titulo del bloque"
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
              {[1, 2, 3, 4, 5].map((ele) => (
                <Card
                  img="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                  title="Titulo del bloque"
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
