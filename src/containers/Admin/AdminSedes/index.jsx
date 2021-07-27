import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSedes } from "../../../redux/sedes";
import Sedes from "./Sedes";
import { Button, Form, Input, InputNumber } from "antd";
import { message } from "antd";
import useAuthorize from "../../../utils/authorization";

export default function AdminSedes() {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const onFinish = (id) => {
    axios
      .post(`/api/sedes/`, form)
      .then((res) => res.data)
      .then(() => dispatch(getSedes()));

      message.success("Sede creada correctamente")

  };

  const handleChange = (obj, obj2) => {
    
      setForm(obj2)
  };

  const toggleForm = () => {
    document.getElementById("newSede").style.display =
      document.getElementById("newSede").style.display === "block"
        ? "none"
        : "block";
  };

  useAuthorize(user, 1)

  return (
    <div>
      <h1>Gestionar sedes</h1>
      <Button type="button" onClick={toggleForm}>
        Crear nueva sede
      </Button>
      <Form
        style={{ display: "none" }}
        name="newSede"
        labelCol={{
          span: 6,
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
        <Form.Item 
          label="Comunidad Id"
          name="comunidadId">
        <InputNumber />

        </Form.Item>
        <Form.Item
          
          label="nombre"
          name="nombre"
        >
          <Input.TextArea/>
        </Form.Item>
          <Button  style={{ display: form.nombre? "block" : "none" }} htmlType="submit" type="submit">
            Crear
          </Button>
      </Form>
      <Sedes />
    </div>
  );
}
