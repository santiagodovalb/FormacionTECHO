import { getRoles } from "../../../redux/roles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import Roles from "./Roles";
import useAuthorize from "../../../utils/authorization";
import "./AdminRoles.css";
import { message, Input, Form, Button } from "antd";
import isValid from "../../../utils/specialChars";

export default function AdminRoles() {
  const [form, setForm] = useState({});

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleSubmit = () => {
    if (!isValid(form.tipo))
      return message.error("No se permiten caracteres especiales");
    axios
      .post("/api/roles/", form)
      .then((res) => {
        if (res.data) {
          message.success("Rol creado correctamente");
        }
      })
      .then(() => dispatch(getRoles()))
      .catch((err) => message.error("Rol no creado"));
  };

  const handleChange = (obj1, obj2) => {
    setForm(obj2);
  };

  const toggleForm = () => {
    document.getElementById("newRole").style.display =
      document.getElementById("newRole").style.display === "block"
        ? "none"
        : "block";
  };

  useAuthorize(user, 1);

  return (
    <div className="adminRoles">
      <h1 className="fs-2 text-secondary text-center p-5">
        <strong>Gestionar roles</strong>
      </h1>
      <button
        type="button"
        onClick={toggleForm}
        className="mb-5 p-3 fs-4 button-style green"
      >
        Crear nuevo rol
      </button>
      <div className="createRol">
        <Form
          style={{ display: "none" }}
          name="newRole"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onValuesChange={(obj, obj2) => handleChange(obj, obj2)}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tipo de rol" name="tipo">
            <Input.TextArea />
          </Form.Item>

          <Button
            style={{ display: form.tipo ? "block" : "none" }}
            htmlType="submit"
            type="submit"
          >
            Crear rol
          </Button>
        </Form>
      </div>
      <Roles />
    </div>
  );
}
