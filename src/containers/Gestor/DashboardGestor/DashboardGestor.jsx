import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import { CSVLink } from "react-csv";
import {
  totalMinimos,
  totalOpcionales,
  totalPendientes,
  minimos,
  opcionales,
  pendientes,
} from "./dashUtils";
import useAuthorize from "../../../utils/authorization";
import "./DashboardGestor.css";

export default function DashboardGestor() {
  const user = useSelector((state) => state.user);
  const bloques = useSelector((state) => state.bloques);
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users/sede/${user.sedeId}`)
      .then((res) => res.data)
      .then((voluntarios) =>
        setVoluntarios(voluntarios.filter((voluntario) => voluntario.rolId > 2))
      )
      .catch((err) => err);
  }, [user, bloques]);

  useAuthorize(user, 2);

  const dataVoluntarios = voluntarios.map((voluntario) => {
    return {
      key: voluntario.id,
      total: "",
      voluntario: voluntario.full_name,
      bloquesMinimos: minimos(voluntario, bloques),
      bloquesOpcionales: opcionales(voluntario, bloques),
      entregasPendientes: pendientes(voluntario),
    };
  });

  const columns = [
    {
      title: "Entregas pendientes por voluntario",
      render: (record) => (
        <React.Fragment>
          {record.voluntario}
          <br />
          {record.entregasPendientes}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "",
      dataIndex: "total",
      key: "total",
      responsive: ["xs"],
    },
    {
      title: "",
      dataIndex: "total",
      key: "total",
      responsive: ["sm"],
    },
    {
      title: "Voluntario",
      dataIndex: "voluntario",
      key: "voluntario",
      responsive: ["sm"],
    },
    {
      title: "Bloques mínimos completados",
      dataIndex: "bloquesMinimos",
      key: "bloquesMinimos",
      responsive: ["sm"],
    },
    {
      title: "Bloques opcionales completados",
      dataIndex: "bloquesOpcionales",
      key: "bloquesOpcionales",
      responsive: ["sm"],
    },
    {
      title: "Entregas pendientes",
      dataIndex: "entregasPendientes",
      key: "entregasPendientes",
      responsive: ["sm"],
    },
  ];

  const dataSource = [
    ...dataVoluntarios,
    {
      key: "total",
      total: "Total",
      voluntario: voluntarios.length,
      bloquesMinimos: totalMinimos(voluntarios, bloques),
      bloquesOpcionales: totalOpcionales(voluntarios, bloques),
      entregasPendientes: totalPendientes(voluntarios),
    },
  ];

  return (
    <>
      <div className="dashboard">
        <h1 className="fs-3 text-secondary p-5 text-center">
          <strong>Dashboard de {user.sede?.nombre}</strong>
        </h1>
        <div className="d-flex justify-content-center">
          {dataSource && (
            <button className="btn btn-success my-3 fs-5">
              <CSVLink
                data={dataSource}
                filename={`dashboard-${user.sede?.nombre}.csv`}
              >
                <p className="text-light m-0">
                  Descargar <i class="bi bi-file-earmark-excel-fill"></i>
                </p>
              </CSVLink>
            </button>
          )}
        </div>
        <div className="table">
          <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={true}
          />
        </div>
      </div>
    </>
  );
}
