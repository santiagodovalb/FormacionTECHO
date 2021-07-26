import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSedes } from "../../../redux/sedes";
import Sedes from "./Sedes";
import { Button, Form, Input } from "antd";
import { message } from "antd";

export default function AdminSedes() {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  const onFinish = (id) => {
    axios
      .post(`/api/sedes/`, form)
      .then((res) => res.data)
      .then(() => dispatch(getSedes()));

      message.success("Sede creada correctamente")

  };

 /*  const onFinish = (values) => {
    console.log("Success:", values);
  }; */

  const handleChange = (e) => {
      console.log(e.target.value)
      setForm({ nombre: e.target.value });
      console.log("FORM",form)
  };

  const toggleForm = () => {
    document.getElementById("newSede").style.display =
      document.getElementById("newSede").style.display === "block"
        ? "none"
        : "block";
  };

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
        onFinish={onFinish}
      >
        <Form.Item
          onChange={handleChange}
          label="nombre"
          name="nombre"
          /* rules={[
            {
              required: true,
              message: "Ingrese el nombre de la sede",
            },
          ]} */
        >
          <Input.TextArea/>
          <Button  style={{ display: form.nombre? "block" : "none" }} htmlType="submit" type="submit">
            Crear
          </Button>
        </Form.Item>
      </Form>
      <Sedes />
    </div>
  );
}
