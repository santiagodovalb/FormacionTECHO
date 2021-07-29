import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getSedes } from "../../../redux/sedes";
import { Table, Button, message} from "antd";
import useAuthorize from "../../../utils/authorization";
import isValid from "../../../utils/specialChars";
import './index.css'

export default function Sedes() {
  const [form, setForm] = useState({});

  const sedes = useSelector((state) => state.sedes);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleForm = (id) => {
    document.getElementById(id).style.display =
      document.getElementById(id).style.display === "block" ? "none" : "block";
  };

  const handleSubmit = (e, id) => {
      e.preventDefault()
      if (!isValid(form.nombre)) return message.error("No se permiten caracteres especiales")
    axios
      .post(`/api/sedes/${id}`, form)
      .then((res) => res.data)
      .then(() => dispatch(getSedes()));
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
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
            "La sede fue eliminada correctamente.",
            "success"
          );
          axios.delete(`/api/sedes/${id}`).then(() => dispatch(getSedes()));
          message.success("Sede eliminada correctamente")
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaEliminar.fire("Cancelado", "La sede está a salvo", "error");
        }
      });
  };





  useAuthorize(user, 1)

  const dataSource = sedes.map((sede) => {
    return {
      key: sede.id,
      nombre: sede.nombre,
      comunidadId: sede.comunidadId
    };
  });

  const columns = [
    {
      title: "Sede",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Comunidad ID",
      dataIndex: "comunidadId",
      key: "comunidadId",
    },
    {
      title: "Modificar/eliminar",
      key: "modificar/eliminar",
      render: (text, record) => {
          return(
        <div>
          <Button
            onClick={() => toggleForm(`sedeForm${record.key}`)}
            type="button"
          >
            Modificar sede
          </Button>
          <form className='sedesForm' onSubmit={(e) => handleSubmit(e, record.key)} id={`sedeForm${record.key}`} style={{display: 'none'}}>
                            <label htmlFor='nombre'>Nombre</label>
                            <input onChange={handleChange} type='text' name='nombre' placeholder={record.nombre}></input>
                            <label htmlFor='comunidadId'>Comunidad ID</label>
                            <input onChange={handleChange} type='number' name='comunidadId' placeholder={record.comunidadId}></input>
                            <button type='submit'>Confirmar cambios</button>
                        </form>
          <Button onClick={() => handleDelete(record.key)} type='button'>Eliminar sede</Button>
        </div>
          )
      },
        
    },
  ];

  return (
    <div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
