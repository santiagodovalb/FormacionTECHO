import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import CanchaFutbol from "./../../../assets/volunteer/CanchaFutbol.png";
import { useParams } from "react-router";
import axios from "axios";
import Unidades from "./Unidades";
import { useHistory } from "react-router-dom";

const VolunteerModuls = () => {
  const [contenido, setContenido] = useState("");
  const [bloque, setBloque] = useState({});
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`/api/bloques/${id}`)
      .then((res) => res.data)
      .then((bloque) => setBloque(bloque));
  }, []);

  const handleSubmit = () => {
    axios
      .post("/api/entregas", {
        contenido: contenido,
        bloqueId: id,
        userId: user.id,
      })
      .then(() => history.push("/mis-bloques"));
  };

  const handleChange = (e) => {
    setContenido(e.target.value);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <h1 className="p-5 fs-1 title">
            <strong>{bloque.titulo}</strong>
          </h1>
        </div>
        <div className="row">
          <div className="col m-5">
            <img src={CanchaFutbol} className="mx-5 img-style" alt="block" />
            <p className="m-5 fs-5 text-justify-2">{bloque.descripcion}</p>
          </div>
          <div className="col m-5 px-5 text-justify-2">
            <div className=" fs-4">
              <p>
                <strong>Modulos</strong>
              </p>
            </div>
            <div className="d-flex flex-column mb-5">
              <Unidades />
            </div>
            <div className="fs-4 my-3">
              <p>
                <strong>PREGUNTA DEL BLOQUE</strong>
              </p>
              <textarea name="contenido" onChange={handleChange} />
              <button
                onClick={() => handleSubmit()}
                className="my-3 p-4 fs-3 button-style green"
              >
                Entregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModuls;
