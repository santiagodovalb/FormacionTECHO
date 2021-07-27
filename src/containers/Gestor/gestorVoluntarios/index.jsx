import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table, Button,Select } from "antd";
const { Option } = Select;

function GestorVoluntarios() {
  const [rol, setRol] = useState(0);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const roles = useSelector((state) => state.roles.filter((rol) => rol.id > 2));
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/users/sede/${user.sedeId}`)
      .then((res) => res.data)
      .then((users) =>
        setUsers(users.filter((userFilter) => userFilter.id !== user.id))
      );
  }, [user]);

  const handleChange = (e) => {
    setRol(e);
  };

  const handleClick = (userId, rolId) => {
    axios
      .post("http://localhost:3001/api/roles/set/", { userId, rolId, user })
      .then(() => {
        axios
          .get(`/api/users/sede/${user.sedeId}`)
          .then((res) => res.data)
          .then((users) =>
            setUsers(users.filter((userFilter) => userFilter.id !== user.id))
          );
      });
  };

  if (user.rolId && user.rolId !== 2) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  const dataSource = users.map((user) => {
    return {
      key: user.id,
      nombre: user.full_name,
      rol: user.rol?.tipo,
    };
  });

  const columns = [
    {
      title: "Voluntario",
      render: (record) => (
        <React.Fragment>
          {record.nombre}
          <hr />
          {record.rol}
        </React.Fragment>
      ),
      responsive: ["xs"]
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      responsive: ["sm"]
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      responsive: ["sm"]
    },
    {
      title: "Seleccionar rol",
      key: "seleccionar rol",
      render: (text, record) => {
        return (
          <div>
            <Select defaultValue="Seleccionar rol" style={{width:200}} onChange={handleChange}>
              {roles &&
                roles.map((rol) => {
                  return <Option value={rol.id}> {rol.tipo} </Option>;
                })}
            </Select>
            <Button
              onClick={(e) => handleClick(record.key, parseInt(rol))}
              type="button"
            >
              Asignar rol
            </Button>
          </div>
        );
      },
    },
  ];

  
  return (
    <div>
      <h1>Administrar roles</h1>
      {!users.length && <h1>No hay voluntarios/gestores en esta sede</h1>}
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

export default GestorVoluntarios;
