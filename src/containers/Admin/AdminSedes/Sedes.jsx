import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSedes } from "../../../redux/sedes";
import { Table, Button, message} from "antd";


export default function Sedes() {
  const [form, setForm] = useState({});

  const sedes = useSelector((state) => state.sedes);
  const dispatch = useDispatch();
  const history = useHistory();
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
    setForm({ nombre: e.target.value });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/sedes/${id}`).then(() => dispatch(getSedes()));
    message.success("Sede eliminada correctamente")
  };

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  const dataSource = sedes.map((sede) => {
    return {
      key: sede.id,
      sede: sede.nombre,
    };
  });

  const columns = [
    {
      title: "Sede",
      dataIndex: "sede",
      key: "sede",
    },
    {
      title: "Modificar/eliminar",
      key: "modificar/eliminar",
      render: (text, record) => {
          console.log(record)
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
                            <input onChange={handleChange} type='text' name='nombre' placeholder={record.sede}></input>
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
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* {sedes && sedes.map(sede => {
                return (
                    <div>
                        <h3>{sede.nombre}</h3>
                        <button onClick={() => toggleForm(`sedeForm${sede.id}`)} type='button'>Modificar sede</button>
                        <form onSubmit={() => handleSubmit(sede.id)} id={`sedeForm${sede.id}`} style={{display: 'none'}}>
                            <label htmlFor='nombre'>Nombre</label>
                            <input onChange={handleChange} type='text' name='nombre' placeholder={sede.nombre}></input>
                            <button type='submit'>Confirmar cambios</button>
                        </form>
                        <button onClick={() => handleDelete(sede.id)} type='button'>Borrar sede</button>
                    </div>
                )
            })} */}
    </div>
  );
}
