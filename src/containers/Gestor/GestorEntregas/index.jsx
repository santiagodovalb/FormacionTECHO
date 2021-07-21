import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function GestorEntregas() {
  const [entregas, setEntregas] = useState();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/entregas/sede/${user.sedeId}`)
      .then((res) => res.data)
      .then((entregas) => setEntregas(entregas));
  }, []);

  const handleClick = (id) => {
    history.push(`/gestor/entregas/${id}`)
  }
  
  return (
    <div>
      <h1>Entregas de voluntarios</h1>
      <table>
        <tr>
          <th>Bloque</th>
          <th>Contenido</th>
          <th>Estado</th>
          <th></th>
        </tr>
        {entregas &&
          entregas.map((entrega) => {
            return (
              <tr >
                <td>{entrega.bloque.titulo}</td>
                <td>{entrega.contenido}</td>
                <td>{entrega.aprobado ? "Aprobada" : "Pendiente"}</td>
                <td><button type='button' onClick = {() => handleClick(entrega.id)}>Ver</button></td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
