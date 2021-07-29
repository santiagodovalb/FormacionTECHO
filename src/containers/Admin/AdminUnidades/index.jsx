import React, { useState } from "react";
import { Form, Input, message } from "antd";
import "./index.css";
import axios from "axios";
import useAuthorize from "../../../utils/authorization";
import { useSelector } from "react-redux";
import isValid from "../../../utils/specialChars"

export default function AdminUnidades({ forceRender, bloque }) {
  const user = useSelector(state => state.user)
  const [form, setForm] = useState({ bloqueId: bloque.id });
  useAuthorize(user, 1)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if(! isValid(form.titulo)){
      message.error("No se permiten caracteres especiales")
    }else{

      axios
        .post("/api/unidades", form)
        .then(() => forceRender(), message.success("Agregado correctamente"));
    }
  };

  return (
    <div>
      <h1 className="fs-2">
        <strong>Agregar unidad a {bloque?.titulo}</strong>
      </h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Titulo"
          name="titulo"
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input type="text" onChange={handleChange} name="titulo"></Input>
        </Form.Item>
        <Form.Item
          label="Link"
          name="link"
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input type="text" onChange={handleChange} name="link"></Input>
        </Form.Item>
        <div className="admin_unidades">
          <button
            type="submit"
            className="mb-3 mt-3 p-3 fs-3 button-style light-blue"
          >
            Agregar unidad
          </button>
        </div>
      </Form>
    </div>
  );
}
