import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import axios from "axios";
import useAuthorize from "../../../utils/authorization";
import { CSVLink } from "react-csv";
import {
  minimosCompletados,
  opcionalesCompletados,
  minimosTotal,
  opcionalesTotal,
} from "../../Gestor/DashboardGestor/dashUtils";
import "./DashboardAdmin.css";

export default function AdminDashboard(){
    const user = useSelector(state => state.user)
    const sedes = useSelector(state=> state.sedes)
    const users = useSelector(state => state.users)
    const bloques = useSelector(state => state.bloques)
    const [voluntarios, setVoluntarios] = useState([])
    
    useAuthorize(user, 1)
    
    
    useEffect(() => {
        
        axios.get('/api/users/entregas')
        .then(res => res.data)
        .then(voluntarios => setVoluntarios(voluntarios.filter(voluntario => voluntario.rolId > 2)))
        .catch(err => err)
    }, [user,bloques])
    const columns = [
        {
          title: "Sede",
          render: (record) => (
            <React.Fragment>
              {record.sede}
            </React.Fragment>
          ),
          responsive: ["xs"],
        },
        {
            title: '',
            dataIndex: 'total',
            key: 'total',
            responsive: ["sm"],
        },
        {
            title: 'Sede',
            dataIndex: 'sede',
            key: 'sede',
            responsive: ["sm"],
        },
        {
            title: 'Voluntarios',
            dataIndex: 'voluntarios',
            key: 'voluntarios',
            responsive: ["sm"],
        },
        {
            title: 'Gestores',
            dataIndex: 'gestores',
            key:'gestores',
            responsive: ["sm"],
        },
        {
            title: 'Bloques mínimos completados',
            dataIndex: 'minimos',
            key:'minimos'
        },
        {
            title: 'Bloques opcionales completados',
            dataIndex: 'opcionales',
            key:'opcionales'
        },
    ]

  useAuthorize(user, 1);

  useEffect(() => {
    axios
      .get("/api/users/entregas")
      .then((res) => res.data)
      .then((voluntarios) =>
        setVoluntarios(voluntarios.filter((voluntario) => voluntario.rolId > 2))
      )
      .catch((err) => err);
  }, [user, bloques]);
  
  const dataSource2 = sedes.map((sede) => {
    const usuarios = users.filter((user) => user.sedeId === sede.id);
    let minimosCompletos = 0;
    let totalMinimos = 0;
    let opcionalesCompletos = 0;
    let totalOpcionales = 0;
    let voluntariosDeSede = voluntarios.filter(
      (voluntario) => voluntario.sedeId === sede.id
    );
    voluntariosDeSede.forEach(
      (voluntarioDeSede) =>
        (minimosCompletos =
          minimosCompletos + minimosCompletados(voluntarioDeSede))
    );
    voluntariosDeSede.forEach(
      (voluntarioDeSede) =>
        (opcionalesCompletos =
          opcionalesCompletos + opcionalesCompletados(voluntarioDeSede))
    );
    voluntariosDeSede.forEach(
      (voluntarioDeSede) =>
        (totalMinimos = totalMinimos + minimosTotal(voluntarioDeSede, bloques))
    );
    voluntariosDeSede.forEach(
      (voluntarioDeSede) =>
        (totalOpcionales =
          totalOpcionales + opcionalesTotal(voluntarioDeSede, bloques))
    );
    return {
      key: sede.id,
      total: "",
      sede: sede.nombre,
      voluntarios: usuarios.filter((user) => user.rolId > 2).length,
      gestores: usuarios.filter((user) => user.rolId === 2).length,
      minimos: `${minimosCompletos}/${totalMinimos}`,
      opcionales: `${opcionalesCompletos}/${totalOpcionales}`,
    };
  });

  const totalMinimoCompletado = () => {
    let total = 0;
    voluntarios.forEach(
      (voluntario) => (total = total + minimosCompletados(voluntario))
    );
    return total;
  };

  const totalOpcionalCompletado = () => {
    let total = 0;
    voluntarios.forEach(
      (voluntario) => (total = total + opcionalesCompletados(voluntario))
    );
    return total;
  };

  const totalMinimo = () => {
    let total = 0;
    voluntarios.forEach(
      (voluntario) => (total = total + minimosTotal(voluntario, bloques))
    );
    return total;
  };

  const totalOpcional = () => {
    let total = 0;
    voluntarios.forEach(
      (voluntario) => (total = total + opcionalesTotal(voluntario, bloques))
    );
    return total;
  };

  const dataSource = [
    ...dataSource2,
    {
      key: "total",
      total: "Total",
      sede: sedes.length,
      voluntarios: users.filter((user) => user.rolId > 2).length,
      gestores: users.filter((user) => user.rolId === 2).length,
      minimos: `${totalMinimoCompletado()}/${totalMinimo()}`,
      opcionales: `${totalOpcionalCompletado()}/${totalOpcional()}`,
    },
  ];

  return (
    <div className="text-center">
      <h1 className="fs-2 text-secondary p-5">
        <strong>Dashboard Nacional</strong>
      </h1>
      <div className="d-flex justify-content-center">
        {dataSource && (
          <button className="btn btn-success my-3 fs-5">
            <CSVLink data={dataSource} filename={`dashboard-nacional.csv`}>
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
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
}
