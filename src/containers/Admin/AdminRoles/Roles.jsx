import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getRoles } from "../../../redux/roles";
import { Table, Button, message} from "antd";
import useAuthorize from "../../../utils/authorization";
import isValid from "../../../utils/specialChars";
import './index.css'

export default function Roles() {
  const [form, setForm] = useState({});

  const roles = useSelector((state) => state.roles).filter(rol => rol.id > 1)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleForm = (id) => {
    document.getElementById(id).style.display =
      document.getElementById(id).style.display === "block" ? "none" : "block";
  };

  const handleSubmit = (e, id) => {
      e.preventDefault()
      if(!isValid(form.tipo)) return message.error("No se permiten caracteres especiales")
      axios
      .put(`/api/roles/${id}`, form)
      .then(() => {
        dispatch(getRoles())
        message.success("Rol modificado correctamente")})
      .catch(() => message.error("No se pudo modificar"))
  };

  const handleChange = (e) => {
    setForm({[e.target.name]: e.target.value });
  };

  const alertaEliminar = Swal.mixin({
    buttonsStyling: true,
  });

  const handleDelete = (id) => {
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
            "El rol fue eliminado correctamente.",
            "success"
          );
          axios.delete(`/api/roles/${id}`).then(() => dispatch(getRoles()));
          message.success("Rol eliminado correctamente")
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaEliminar.fire("Cancelado", "El rol está a salvo", "error");
        }
      });
  };

  useAuthorize(user, 1)

  const dataSource = roles.map((rol) => {
    return {
      key: rol.id,
      tipo: rol.tipo
    };
  });

  const columns = [
    {
      title: "Rol",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Modificar/eliminar",
      key: "modificar/eliminar",
      render: (text, record) => {
          return(
        <div>
          <Button
            onClick={() => toggleForm(`rolForm${record.key}`)}
            type="button"
          >
            Modificar rol
          </Button>
          <form className='rolesForm' onSubmit={(e) => handleSubmit(e, record.key)} id={`rolForm${record.key}`} style={{display: 'none'}}>
                            <label htmlFor='nombre'>Nombre</label>
                            <input onChange={handleChange} type='text' name='tipo' placeholder={record.tipo}></input>
                            <button type='submit'>Confirmar cambios</button>
                        </form>
          <Button onClick={() => handleDelete(record.key)} type='button'>Eliminar rol</Button>
        </div>
          )
      },
        
    },
  ];

  return (
    <div className='table'>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}