import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {message} from  "antd"
import useAuthorize from "../../../utils/authorization";
import isValid from "../../../utils/specialChars";
import "./CrearGestor.css";

export default function CrearGestor() {
  const [form, setForm] = useState({ rolId: 2 });
  const user = useSelector(state => state.user)

  
  const sedes =  useSelector((state) => state.sedes)
  
  const history = useHistory();
  
  useEffect(() => {
    let options = "<option value=''>Seleccionar Sede</sede>";
    for (var i = 0; i < sedes.length; i++) {
      options += `<option value=${sedes[i]?.id}>${sedes[i]?.nombre}</option>`;
    }
    document.getElementById("sedes").innerHTML = options;
  }, [sedes, user]);
  
  useAuthorize(user, 1)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.confirmPassword === form.password){
      if (!isValid(form.password) || !isValid(form.full_name)) {
        return message.error("No se permiten caracteres especiales")
      }
      axios
        .post("/api/users/create", form)
        .then((res) =>{
          if(res.data){
              message.success("Gestor creado correctamente");
            }
          })
          .then(()=>{
            history.push("/admin-usuarios")
          })
          .catch(err=>message.warning("Mail ya existente"))
    }else{
      message.warning("Las constraseñas no coinciden")
    }
      
  };

  return (
    <div className="justify-content-center align-items-center text-center py-5">
      <h1 className="fs-2 text-secondary">
        <strong>Crear Gestor</strong>
      </h1>
      <form onSubmit={handleSubmit} id="formGestor"className="col col-xl-4 my-5">
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
          <input
            required="true"
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirme la contraseña"
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
        <button
          type="submit"
          className="button-style light-blue fs-3 my-3 py-2 button-style-form"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
