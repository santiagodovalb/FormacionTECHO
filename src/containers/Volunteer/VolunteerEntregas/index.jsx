import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function VolunteerEntregas() {
  const [entregas, setEntregas] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/api/entregas/user/${user.id}`)
      .then((res) => res.data)
      .then((entregas) => setEntregas(entregas));
  }, []);

  return (
    <div>
        {console.log('ENTREGAS', entregas)}
      <h1>Mis entregas</h1>
      <table>
        <tr>
          <th>Bloque</th>
          <th>Contenido</th>
          <th>Estado</th>
        </tr>
        {entregas && entregas.map(entrega => {
            return (
                <tr>
          <td>{entrega.bloque.titulo}</td>
          <td>{entrega.contenido}</td>
          <td>{entrega.aprobado ? 'Aprobada' : 'Pendiente'}</td>
        </tr>
            )
        })}
      </table>
    </div>
  );
}
