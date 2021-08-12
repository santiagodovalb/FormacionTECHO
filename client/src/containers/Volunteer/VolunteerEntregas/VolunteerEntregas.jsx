import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import "./VolunteerEntregas.css";

export default function VolunteerEntregas() {
  const [entregas, setEntregas] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/api/entregas/user/${user.id}`)
      .then((res) => res.data)
      .then((entregas) => {
        setEntregas(entregas);
      });
  }, [user]);

  const dataSource = entregas.map((entrega) => {
    return {
      key: entrega.id,
      bloque: entrega.bloque.titulo,
      contenido: entrega.contenido,
      estado: entrega.aprobado ? <p>Completado</p> : <p>Pendiente</p>,
    };
  });

  const columns = [
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
      title: "Estado",
      render: (record) => (
        <React.Fragment>
          {record.estado}
        </React.Fragment>
      ),
      responsive: ["xs"]
    },
    {
      title: "Bloque",
      dataIndex: "bloque",
      key: "bloque",
      width: 300,
      responsive: ["sm"]
    },
    {
      title: "Contenido",
      dataIndex: "contenido",
      key: "contenido",
      width: 800,
      responsive: ["sm"]
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      width: 150,
      responsive: ["sm"]
    },
  ];

  return (
    <>
      <div>
        <div className="volunteer_entregas_div text-center">
          <h1 className="fs-3 text-secondary m-5 ">
            <strong>Mis entregas</strong>
          </h1>
          <div className="table">
            <Table
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              size="small"
            />
          </div>
        </div>
      <p className="entregas">Si querés ver el contenido de tu respuesta, entra desde una computadora por favor.</p>
      </div>
    </>
  );
}
