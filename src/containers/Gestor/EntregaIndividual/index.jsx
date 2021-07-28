import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import useAuthorize from "../../../utils/authorization";
import { useSelector } from "react-redux";

export default function EntregaIndividual() {
  const user = useSelector(state => state.user)
  const [entrega, setEntrega] = useState();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/entregas/${id}`)
      .then((res) => res.data)
      .then((entrega) => setEntrega(entrega));
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get(`/api/entregas/aprobar/${id}`)
      .then(() => history.push("/gestor/entregas"))
      .catch((err) => console.log(err));
  };

  useAuthorize(user, 2)

  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <h1>Voluntario: {entrega?.user.full_name}</h1>
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={18}>
          <h2>Bloque: {entrega?.bloque.titulo}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={18}>
          <h2>Pregunta: {entrega?.bloque.pregunta}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={18}>
          <h2>Respuesta del voluntario: {entrega?.contenido}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8}>
          <Button type="button" onClick={(e) => handleClick(e)}>
            Completar entrega
          </Button>
        </Col>
      </Row>
    </div>
  );
}
