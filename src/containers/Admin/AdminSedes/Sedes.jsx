import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSedes } from "../../../redux/sedes";
import { Table, Button, message} from "antd";
import useAuthorize from "../../../utils/authorization";

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
    axios
      .post(`/api/sedes/${id}`, form)
      .then((res) => res.data)
      .then(() => dispatch(getSedes()));
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/sedes/${id}`).then(() => dispatch(getSedes()));
    message.success("Sede eliminada correctamente")
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
          <form onSubmit={(e) => handleSubmit(e, record.key)} id={`sedeForm${record.key}`} style={{display: 'none'}}>
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
      {console.log(form)}
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
