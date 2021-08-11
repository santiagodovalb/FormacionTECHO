import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Select } from "antd";
import useAuthorize from "../../../utils/authorization";
const { Option } = Select;

function GestorVoluntarios() {
  const [rol, setRol] = useState(0);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const roles = useSelector((state) => state.roles.filter((rol) => rol.id > 2));

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

  useAuthorize(user, 2);

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
      responsive: ["xs"],
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      responsive: ["sm"],
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      responsive: ["sm"],
    },
    {
      title: "Seleccionar rol",
      key: "seleccionar rol",
      render: (text, record) => {
        return (
          <div>
            <Select
              defaultValue="Seleccionar rol"
              style={{ width: 200 }}
              onChange={handleChange}
            >
              {roles &&
                roles.map((rol) => {
                  return (
                    <Option key={rol.id} value={rol.id}>
                      {" "}
                      {rol.tipo}{" "}
                    </Option>
                  );
                })}
            </Select>
            <button
              onClick={(e) => handleClick(record.key, parseInt(rol))}
              className="btn btn-outline-primary mx-1"
            >
              Asignar rol
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="fs-3 text-secondary p-5 text-center">
        <strong>Administrar roles</strong>
      </h1>
      <div className="table">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  );
}

export default GestorVoluntarios;
