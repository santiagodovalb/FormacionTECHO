import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Radio, message } from "antd";
import { getBloques } from "../../../redux/bloques";
import isValid from "../../../utils/specialChars";
import useAuthorize from "../../../utils/authorization";
import "antd/dist/antd.css";
import "./AdminBloques.css";

export default function CrearBloque() {
  const [form, setForm] = useState({ rolesId: [] });
  const [roles, setRoles] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useAuthorize(user, 1);

  useEffect(() => {
    axios
      .get("/api/roles")
      .then((res) => res.data)
      .then((roles) => roles.filter((rol) => rol.id >= 3))
      .then((roles) => setRoles(roles));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMinimo = (e) => {
    let boolean = e.target.id === "si" ? true : false;
    setForm({ ...form, minimo: boolean });
  };

  const handleRoles = (e) => {
    let array = [...form.rolesId];
    e.target.checked
      ? (array = [...array, e.target.value])
      : array.splice(form.rolesId.indexOf(e.target.value), 1);
    setForm({ ...form, rolesId: [...array] });
  };

  const handleSubmit = (e) => {
    if (!isValid(form.titulo))
      return message.error("No se permiten caracteres especiales");
    axios.post("/api/bloques", form).then((res) => {
      dispatch(getBloques());
      history.push("/admin-bloques");
    });
  };

  return (
    <>
      <div className="admin">
        <h1 className="fs-2 text-secondary m-5">
          <strong>Crear nuevo bloque de formación</strong>
        </h1>
      </div>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 13,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          className="admin_input"
          label="Título"
          name="titulo"
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input name="titulo" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          className="admin_input"
          label="Descripción"
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input name="descripcion" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          className="admin_input"
          label="Preguntas"
          name="pregunta"
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input.TextArea name="pregunta" onChange={handleChange} />
        </Form.Item>
        <div className="admin">
          <h5>¿Es bloque mínimo?</h5>
          <Radio.Group>
            <Radio.Button id="si" value="si" onChange={handleMinimo}>
              Si
            </Radio.Button>
            <Radio.Button id="no" value="no" onChange={handleMinimo}>
              No
            </Radio.Button>
          </Radio.Group>
          <br />
          <h5>¿A qué roles está destinado?</h5>
          {roles.map((rol) => {
            return (
              <div value={rol.id}>
                <label className="admin_check" htmlFor={rol.tipo}>
                  {rol.tipo}
                </label>
                <input
                  type="checkbox"
                  name="roles"
                  value={rol.id}
                  id={rol.id}
                  onChange={handleRoles}
                />
              </div>
            );
          })}
          <br />
          <Form.Item>
            <button
              htmlType="submit"
              className="my-3 p-2 fs-4 button-style green"
            >
              Crear
            </button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
