import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Table, Button } from "antd";
import useAuthorize from "../../../utils/authorization";
import { CSVLink } from "react-csv";
import "./GestorEntregas.css";

export default function GestorEntregas() {
  const [entregas, setEntregas] = useState();
  const [form, setForm] = useState("");
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

    if (e.target.value === 'completadas') {
      axios.get(`/api/entregas/completadas/${user.sedeId}`)
      .then(res => res.data)
      .then(entregas => setEntregas(entregas))
    }

    if (e.target.value === "pendientes") {
      axios
        .get(`/api/entregas/pendientes/${user.sedeId}`)
        .then((res) => res.data)
        .then((entregas) => setEntregas(entregas));
    }

    if (e.target.value === "todas") {
      axios
        .get(`/api/entregas/sede/${user.sedeId}`)
        .then((res) => res.data)
        .then((entregas) => setEntregas(entregas));
    }
  };

  const handleInput = (e) => {
    setForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/entregas/user/nombre", { nombre: form, sedeId: user.sedeId })
      .then((res) => res.data)
      .then((entregas) => setEntregas(entregas));
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
      responsive: ["xs"],
    },
    {
      title: "Bloque",
      render: (record) => <React.Fragment>{record.bloque}</React.Fragment>,
      responsive: ["xs"],
    },
    {
      title: "Voluntario",
      dataIndex: "voluntario",
      key: "voluntario",
      responsive: ["sm"],
    },
    {
      title: "Bloque",
      dataIndex: "bloque",
      key: "bloque",
      responsive: ["sm"],
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      responsive: ["sm"],
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
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
      <h1 className="fs-3 text-secondary p-5 text-center gestor-entregas">
        <strong>Entregas de voluntarios</strong>
      </h1>
      <div className="d-flex justify-content-around my-4 botones">
        <div className="col-auto">
          {dataSource && (
            <button className="btn btn-success descargar">
              <CSVLink
                data={dataSource}
                filename={`entregas-${user.sede?.nombre}.csv`}
              >
                <p className="text-light m-0 fs-5">
                  Descargar <i class="bi bi-file-earmark-excel-fill"></i>
                </p>
              </CSVLink>
            </button>
          )}
        </div>

        <form className="row g-0" onSubmit={handleSubmit}>
          <div className="col-auto">
            <input
              type="text"
              name="nombre"
              onChange={handleInput}
              className="form-control fs-5 busqueda"
              placeholder="voluntari@s"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary fs-5" type="submit">
              Buscar
            </button>
          </div>
        </form>

        <div className="col-auto">
          <select onChange={handleChange} className="form-select fs-5">
            <option>Filtrar por estado</option>
            <option value="completadas">Completadas</option>
            <option value="pendientes">Pendientes</option>
            <option value="todas">Todas</option>
          </select>
        </div>
      </div>
      <div className="table">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={true}
        />
      </div>
    </div>
  );
}
