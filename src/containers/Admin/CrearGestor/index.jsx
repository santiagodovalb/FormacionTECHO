import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CrearGestor() {
  const [form, setForm] = useState({ rolId: 2 });

  const sedes = useSelector((state) => state.sedes);

  const history = useHistory();

  useEffect(() => {
    let options = "<option value=''>Seleccionar Sede</sede>";
    for (var i = 0; i < sedes.length; i++) {
      options += `<option value=${sedes[i]?.id}>${sedes[i]?.nombre}</option>`;
    }
    document.getElementById("sedes").innerHTML = options;
  }, [sedes]);

  const handleChange = (e) => {
    console.log(form);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/create", form)
      .then((res) => res.data)
      .then(() => history.push("/admin-usuarios"));
  };

  return (
    <div className="row justify-content-center align-items-center text-center p-5 mx-5">
      <h1 className="fs-2">
        <strong>Crear Gestor</strong>
      </h1>
      <form onSubmit={handleSubmit} className="col-4 p-5 mx-5">
        <div className="mb-3">
          <input
            required="true"
            type="text"
            onChange={handleChange}
            name="full_name"
            placeholder="Nombre Completo"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            required="true"
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            required="true"
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Contraseña de acceso"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            required
            id="sedes"
            type="text"
            onChange={handleChange}
            name="sedeId"
            placeholder="Sede"
            className="form-control"
          />
        </div>
        <button type="submit" className="button-style light-blue fs-4 p-1">
          Crear
        </button>
      </form>
    </div>
  );
}
