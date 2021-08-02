import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSedes } from "../../../redux/sedes";
import Sedes from "./ListaSedes";
import { Button, Form, Input, InputNumber } from "antd";
import { message } from "antd";
import useAuthorize from "../../../utils/authorization";
import isValid from "../../../utils/specialChars";
import "./AdminSedes.css";

export default function AdminSedes() {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const onFinish = () => {
    if (!isValid(form.nombre)) return message.error("No se permiten caracteres especiales")
    axios
      .post(`/api/sedes/`, form)
      .then((res) => {
        if (res.data) {
          message.success("Sede creada correctamente");
        }
      })
      .then(() => {
        dispatch(getSedes());
      })
      .catch(err=>message.warning("No se pudo crear la sede"));
  };

  const handleChange = (obj, obj2) => {
    setForm(obj2);
  };

  const toggleForm = () => {
    document.getElementById("newSede").style.display =
      document.getElementById("newSede").style.display === "block"
        ? "none"
        : "block";
  };

  useAuthorize(user, 1);

  return (
    <div className="wh-100 text-center p-5 justify-content-center align-items-center">
      <div className="col-auto">
        <h1 className="fs-2 text-secondary text-center">
          <strong>Gestionar sedes</strong>
        </h1>
        <button
          type="button"
          onClick={toggleForm}
          className="my-5 p-3 fs-3 button-style green"
        >
          Crear nueva sede
        </button>
      </div>
      <div className="createSede">
      <Form
        style={{ display: "none" }}
        name="newSede"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onValuesChange={(obj, obj2) => handleChange(obj, obj2)}
        onFinish={onFinish}
      >
        <Form.Item label="Comunidad Id" name="comunidadId">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Nombre" name="nombre">
          <Input.TextArea />
        </Form.Item>
        <Button
          style={{ display: form.nombre ? "block" : "none" }}
          htmlType="submit"
          type="submit"
        >
          Crear sede
        </Button>
      </Form>
      </div>
      <div className="table">
        <Sedes />
      </div>
    </div>
  );
}
