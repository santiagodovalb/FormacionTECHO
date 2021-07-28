import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { useParams } from "react-router";
import axios from "axios";
import Unidades from "./Unidades";
import { useHistory } from "react-router-dom";
import CanchaFutbol from "../../../assets/volunteer/CanchaFutbol.png";

const VolunteerModuls = () => {
  const [contenido, setContenido] = useState("");
  const [checks, setChecks] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [bloque, setBloque] = useState({});
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const completed = [];

  useEffect(() => {
    console.log("asd", checks);
    axios
      .get(`/api/bloques/${id}`)
      .then((res) => res.data)
      .then((bloque) => {
        for (let i = 0; i < bloque.unidades.length; i++) {
          let status =
            localStorage.getItem(`check${bloque.unidades[i]?.id}`) === "true"
              ? true
              : false;
          if (status === true) completed.push(status);
        }
        const status =
          completed.length === bloque.unidades.length ? false : true;
        setDisabled(status);
        setBloque(bloque);
      });
  }, [checks]);

  const handleSubmit = () => {
    axios
      .post("/api/entregas", {
        contenido: contenido,
        bloqueId: id,
        userId: user.id,
      })
      .then(() => history.push("/mis-entregas"));
  };

  const handleChange = (e) => {
    setContenido(e.target.value);
  };

  return (
    <div>
      <div className="container-fluid moduls-div">
        <div>
          <h1 className="p-5 fs-1 title">
            <strong>{bloque.titulo}</strong>
          </h1>
        </div>
        <div className="moduls">
          <div className="descripcion">
            <p className="fs-5 text-justify-2">{bloque.descripcion}</p>
          </div>
          <div className="text-justify-2">
            <div className="fs-4">
              <p>
                <strong>Módulos</strong>
              </p>
            </div>
            <div className="">
              <Unidades setChecks={() => setChecks(checks + 1)} />
            </div>
            <div className="fs-4  modul_question">
              <p>
                <strong>{bloque.pregunta}</strong>
              </p>
              <textarea
                className="form-control"
                name="contenido"
                onChange={handleChange}
              />
              <button
                disabled={disabled}
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
