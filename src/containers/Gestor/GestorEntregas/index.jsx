import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import useAuthorize from "../../../utils/authorization";

export default function GestorEntregas() {
  const [entregas, setEntregas] = useState();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/entregas/sede/${user.sedeId}`)
      .then((res) => res.data)
      .then((entregas) => setEntregas(entregas));
  }, [user]);

  useAuthorize(user, 2);

  const handleClick = (id) => {
    history.push(`/gestor/entregas/${id}`);
  };

  const date = (entrega) => {
    let fecha = entrega.slice(0, 10);
    let fechaCorrecta = `${fecha.slice(8, 10)}/${fecha.slice(
      5,
      7
    )}/${fecha.slice(0, 4)}`;
    return fechaCorrecta;
  };

  const dataSource = entregas?.map((entrega) => {
    return {
      key: entrega.id,
      voluntario: entrega.user.full_name,
      bloque: entrega.bloque.titulo,
      estado: entrega.aprobado ? "Completado" : "Pendiente",
      fecha: date(entrega.updatedAt),
    };
  });

  const columns = [
    {
      title: "Voluntario",
      dataIndex: "voluntario",
      key: "voluntario",
    },
    {
      title: "Bloque",
      dataIndex: "bloque",
      key: "bloque",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "",
      key: "ver",
      render: (text, record) => (
        <Button type="button" onClick={() => handleClick(record.key)}>
          Ver mas
        </Button>
      ),
    },
  ];

  return (
    <div className="row text-center mx-5">
      <h1 className="fs-3 text-secondary m-5">
        <strong>Entregas de voluntarios</strong>
      </h1>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
