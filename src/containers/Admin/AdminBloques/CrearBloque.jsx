import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Radio } from "antd";
import { getBloques } from "../../../redux/bloques";
import "antd/dist/antd.css";
import "./index.css";

export default function CrearBloque() {
  const [form, setForm] = useState({ rolesId: [] });
  const [roles, setRoles] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

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

  if (user.rolId && user.rolId !== 1) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  const handleSubmit = (e) => {
    axios.post("/api/bloques", form).then((res) => {
      dispatch(getBloques());
      history.push("/admin-bloques");
    });
  };

  return (
    <>
      <div className="admin">
        <h1>Crear nuevo bloque de formación</h1>
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
          label="Pregunta"
          name="pregunta" 
          rules={[
            {
              required: true,
              message: "Por favor complete el campo",
            },
          ]}
        >
          <Input name="pregunta" onChange={handleChange} />
        </Form.Item>
        <div className="admin">
          <h5>Es bloque mínimo?</h5>
          <Radio.Group>
            <Radio.Button id="si" value="si" onChange={handleMinimo}>
              Si
            </Radio.Button>
            <Radio.Button id="no" value="no" onChange={handleMinimo}>
              No
            </Radio.Button>
          </Radio.Group>
          <br />
          <h5>A que roles esta destinado?</h5>
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
            <button htmlType="submit" className="mb-3 mt-3 p-3 fs-3 button-style light-blue">
              Crear
            </button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
