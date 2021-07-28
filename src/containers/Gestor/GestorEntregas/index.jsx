import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import useAuthorize from "../../../utils/authorization";
import './index.css'

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
    render: (record) => (
      <React.Fragment>
        {record.voluntario}
        <hr />
        {record.estado}
      </React.Fragment>
    ),
    responsive: ["xs"]
    },
    {
      title: "Bloque",
      render: (record) => (
        <React.Fragment>
          {record.bloque}
        </React.Fragment>
      ),
      responsive: ["xs"]
      },
    {
      title: 'Voluntario',
      dataIndex: 'voluntario',
      key: 'voluntario',
      responsive: ["sm"],
    },
    {
      title: 'Bloque',
      dataIndex: 'bloque',
      key: 'bloque',
      responsive: ["sm"],
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      responsive: ["sm"],
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      responsive: ["sm"],
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
    <div>
      <h1 className="fs-3 text-secondary p-5 text-center">
        <strong>Entregas de voluntarios</strong>
      </h1>
      <div className="table">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
}
