import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./VolunteerModules.css";
import { useParams } from "react-router";
import axios from "axios";
import Unidades from "./Unidades";
import { useHistory } from "react-router-dom";

const VolunteerModuls = () => {
  const [contenido, setContenido] = useState("");
  const [checks, setChecks] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [bloque, setBloque] = useState({});
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    const completed = [];
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
  }, [checks, id]);

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
    <div className="moduls-div">
      <h1 className="p-5 title">
        <strong>{bloque.titulo}</strong>
      </h1>
      <p className="fs-5 descripcion">{bloque.descripcion}</p>

      <p className="fs-4 modulos">
        <strong>Módulos</strong>
      </p>
      <div className="unidades">
        <Unidades setChecks={() => setChecks(checks + 1)} />
      </div>
      <p className="fs-4 pregunta">
        <strong>
          Preguntas del bloque: <br /> {bloque.pregunta}{" "}
        </strong>
      </p>
      <textarea
        className="form-control"
        name="contenido"
        onChange={handleChange}
      />
      <button
        disabled={disabled}
        onClick={() => handleSubmit()}
        className="my-3 p-3 fs-4 button-style green"
      >
        Entregar
      </button>
    </div>
  );
};

export default VolunteerModuls;
