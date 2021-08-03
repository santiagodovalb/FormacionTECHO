import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Select, message } from "antd";
import "./AdminUsers.css";
import useAuthorize from "../../../utils/authorization";

const { Option } = Select;

function Users() {

    const [rol, setRol] = useState(0);
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const roles = useSelector(state=>state.roles.filter((rol)=> rol.id!==1))
    const location = useLocation()
    const id = location.pathname.slice(21)

    useEffect(() => {
        axios.get(`/api/users/sede/${id}`)
        .then(res => res.data)
        .then(users => setUsers(users))
    }, [user, id])

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
  const alertaEliminar = Swal.mixin({
    buttonsStyling: true,
  });

  const handleDelete = (userId) => {
    alertaEliminar
      .fire({
        title: "Estás seguro?",
        text: "Si lo confirmas, no podrás deshacerlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          alertaEliminar.fire(
            "Eliminado!",
            "El usuario fue eliminado correctamente.",
            "success"
          );
          axios.delete(`/api/users/${userId}`).then(() =>
      axios
        .get(`/api/users/sede/${id}`)
        .then((res) => res.data)
        .then((users) => setUsers(users))
    );
          message.success("Usuario eliminado correctamente")
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaEliminar.fire("Cancelado", "El usuario está a salvo", "error");
        }
      });
  };


  
  

useAuthorize(user, 1)

return (
    <div className="admin">
      <h1 className="fs-2">
        <strong>Administrar roles</strong>
      </h1>
      {!users.length && <h1>No hay voluntarios/gestores en esta sede</h1>}
      <br />

      {users &&
        users.map((user) => {
          return (
            <div className="divAdminUser"key={user.id}>
              <h5>
                Nombre:
              </h5>
              <h6>{user.full_name}</h6>
              <h5>
              Rol:
              </h5>
              <h6> {user.rol && user.rol.tipo}</h6>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccionar rol"
                onChange={handleChange}
              >
                {roles &&
                  roles.map((rol) => {
                    return (
                      <Option key={rol.id} label="children" value={rol.id}>
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

