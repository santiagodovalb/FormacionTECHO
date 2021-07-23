import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import './index.css'

export default function VolunteerEntregas() {
  const [entregas, setEntregas] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/api/entregas/user/${user.id}`)
      .then((res) => res.data)
      .then((entregas) => {
        setEntregas(entregas)});
  }, [user]);

  const dataSource = entregas.map((entrega) => {
    return {
      key: entrega.id,
      bloque: entrega.bloque.titulo,
      contenido: entrega.contenido,
      estado: entrega.aprobado ? <p>Completado</p> : <p>Pendiente</p>
    };
  });

  const columns = [
    {
      title: "Bloque",
      dataIndex: "bloque",
      key: "bloque",
      width: 300
    },
    {
      title: "Contenido",
      dataIndex: "contenido",
      key: "contenido",
      width: 800
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      width: 150
    },
  ];

  return (
    <>
    <div>
    <div className="volunteer_entregas_div">
      <h1>Mis entregas</h1>
      <div className='table'>
      <Table dataSource={dataSource} columns={columns} pagination={false} size='small' />
      </div>
    </div>
    </div>
    </>
  );
}
