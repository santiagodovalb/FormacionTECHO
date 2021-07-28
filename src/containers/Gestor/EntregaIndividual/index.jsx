import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import useAuthorize from "../../../utils/authorization";
import { useSelector } from "react-redux";
import "./index.css";

export default function EntregaIndividual() {
  const user = useSelector((state) => state.user);
  const [entrega, setEntrega] = useState();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/entregas/${id}`)
      .then((res) => res.data)
      .then((entrega) => setEntrega(entrega));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get(`/api/entregas/aprobar/${id}`)
      .then(() => history.push("/gestor/entregas"))
      .catch((err) => console.log(err));
  };

  useAuthorize(user, 2);

  return (
    <div className="wh-100 row justify-content-center align-items-center">
      <div className="col-auto p-5">
        <div className="text-center">
          <img src={entrega?.user.img} />
          <h1 className="fs-2 m-2 text-secondary">
            <strong>{entrega?.user.full_name}</strong>
          </h1>
        </div>
        <div className="m-5">
          <h2 className="fs-4 text-left">Bloque: {entrega?.bloque.titulo}</h2>
          <h2 className="fs-4">Pregunta: {entrega?.bloque.pregunta}</h2>
          <h2 className="fs-4">
            Respuesta del voluntario: {entrega?.contenido}
          </h2>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={(e) => handleClick(e)}>
            Completar
          </button>
        </div>
      </div>
    </div>
  );
}
