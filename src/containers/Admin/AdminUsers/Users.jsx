import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Select } from "antd";
import "./index.css";
const { Option } = Select;

function Users() {
  const [rol, setRol] = useState(0);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const roles = useSelector((state) =>
    state.roles.filter((rol) => rol.id !== 1)
  );
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.slice(21);
  useEffect(() => {
    axios
      .get(`/api/users/sede/${id}`)
      .then((res) => res.data)
      .then((users) => setUsers(users));
  }, []);

  const handleChange = (e) => {
    setRol(e);
  };

  const handleClick = (userId, rolId) => {
    axios
      .post("/api/roles/set/", { userId, rolId, user })
      .then(() => axios.get(`/api/users/sede/${id}`))
      .then((res) => res.data)
      .then((users) => setUsers(users));
  };

  const handleDelete = (userId) => {
    return axios.delete(`/api/users/${userId}`).then(() =>
      axios
        .get(`/api/users/sede/${id}`)
        .then((res) => res.data)
        .then((users) => setUsers(users))
    );
  };

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  return (
    <div className="admin">
      <h1>Administrar roles</h1>
      {!users.length && <h1>No hay voluntarios/gestores en esta sede</h1>}
      <br />

      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <h5>
                Nombre:<h6>{user.full_name}</h6>
              </h5>
              <h5>
              Rol:<h6> {user.rol && user.rol.tipo}</h6>
              </h5>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccionar rol"
                onChange={handleChange}
              >
                {roles &&
                  roles.map((rol) => {
                    return (
                      <Option label="children" value={rol.id}>
                        {" "}
                        {rol.tipo}{" "}
                      </Option>
                    );
                  })}
              </Select>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleClick(user.id, parseInt(rol))}
                type="button"
              >
                Asignar rol
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user.id)}
                type="button"
              >
                {" "}
                Eliminar usuario
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Users;

