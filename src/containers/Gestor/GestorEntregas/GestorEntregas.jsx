import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import useAuthorize from "../../../utils/authorization";
import {CSVLink} from 'react-csv';
import './GestorEntregas.css'

export default function GestorEntregas() {
  const [entregas, setEntregas] = useState();
  const [form, setForm] = useState('')
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

  const handleChange = (e) => {

    console.log('CHANGE', e.target.value)

    if (e.target.value === 'completadas') {
      axios.get(`/api/entregas/completadas/${user.sedeId}`)
      .then(res => res.data)
      .then(entregas => setEntregas(entregas))
    }

    if (e.target.value === 'pendientes') {
      axios.get(`/api/entregas/pendientes/${user.sedeId}`)
      .then(res => res.data)
      .then(entregas => setEntregas(entregas))
    }

    if (e.target.value === 'todas') {
      axios
      .get(`/api/entregas/sede/${user.sedeId}`)
      .then((res) => res.data)
      .then((entregas) => setEntregas(entregas))
    }

  }

  const handleInput = (e) => {
    setForm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/entregas/user/nombre', {nombre: form, sedeId: user.sedeId})
    .then(res => res.data)
    .then(entregas => setEntregas(entregas))
  }

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
      <div className='busquedas'>
        <select onChange={handleChange}>
          <option>Filtrar por estado</option>
          <option value='completadas'>Completadas</option>
          <option value='pendientes'>Pendientes</option>
          <option value='todas'>Todas</option>
        </select>
        <form onSubmit={handleSubmit}>
          <label htmlFor='nombre'>Buscar por voluntari@:</label>
          <input type='text' name='nombre' onChange={handleInput} />
          <button type='submit'>Buscar</button>
        </form>
      </div>
      <div className="table">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={true}
        />
      </div>
      <div className="gestorEntregas">{dataSource && <Button><CSVLink 
      data={dataSource}
      filename={`entregas-${user.sede?.nombre}.csv`}
      >Descargar tabla</CSVLink></Button>}</div>
    </div>
  );
}
