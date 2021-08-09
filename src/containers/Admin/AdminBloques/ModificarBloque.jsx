import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Input, Radio, message } from "antd";
import Swal from "sweetalert2";
import { getBloques } from "../../../redux/bloques";
import AdminUnidades from "../AdminUnidades/AdminUnidades.jsx";
import Unidades from "./Unidades.jsx";
import useAuthorize from "../../../utils/authorization";

export default function ModificarBloque() {
  const [count, setCount] = useState(0);
  const [bloque, setBloque] = useState();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ bloque });
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const roles = useSelector((state) => state.roles).filter((rol) => rol.id > 2);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/bloques/${id}`)
      .then((res) => res.data)
      .then((bloque) => {
        setForm({
          titulo: bloque.titulo,
          descripcion: bloque.descripcion,
          minimo: bloque.minimo,
          rolesId: bloque.roles.map((rol) => rol.id),
        });
        setBloque(bloque);

        return bloque;
      })
      .then((bloque) => {
        const rolesIds = roles.map((rol) => rol.id);
        for (let i = 0; i < roles.length; i++) {
          document.getElementById(`rol${rolesIds[i]}`).checked =
            bloque.roles.map((rol) => rol.id).includes(rolesIds[i]) && "true";
        }
        document.getElementById("minimoSi").checked = bloque.minimo && "true";
        document.getElementById("minimoNo").checked = !bloque.minimo && "true";
      });
  }, [showForm, count, user, id]);

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

  const handleSubmit = () => {
    axios.put(`/api/bloques/${id}`, form)
    .then(() => {
      dispatch(getBloques());
    })
    .then(() =>{
      message.success("Modificado correctamente")
      history.push("/admin-bloques")
    })
  };

  const alertaEliminar = Swal.mixin({
    buttonsStyling: true,
  });

  const handleDelete = () => {
    alertaEliminar
      .fire({
        title: "Estás seguro?",
        text: "Si lo confirmas, no podrás deshacerlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          alertaEliminar.fire(
            "Eliminado!",
            "El bloque fue eliminado correctamente.",
            "success"
          );
          axios.delete(`/api/bloques/${id}`).then(() => {
            dispatch(getBloques());
            history.push("/admin-bloques");
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaEliminar.fire("Cancelado", "El bloque está a salvo", "error");
        }
      });
  };

  const toggleUnidad = () => {
    setShowForm(!showForm);
  };

  const forceRender = () => {
    setCount(count + 1);
  };

  useAuthorize(user, 1);

  return (
    <div>
      <div className="admin">
        <h1 className="fs-2 text-secondary m-5">
          <strong>{bloque && bloque.titulo}</strong>
        </h1>
        <br />
      </div>
      {bloque && (
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 13,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Titulo">
            <Input
              className="admin_input"
              type="text"
              name="titulo"
              onChange={handleChange}
              defaultValue={bloque.titulo}
            ></Input>
          </Form.Item>
          <Form.Item label="Descripción">
            <Input.TextArea
            defaultValue={bloque.descripcion}
              autoSize={true}
              name='descripcion'
              className="admin_input"
              showCount
              maxLength={350}
              onChange={handleChange}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item  label="Preguntas" >
            <Input.TextArea
              className="admin_input"
              onChange={handleChange}
              name="pregunta"
              defaultValue={bloque.pregunta}
            ></Input.TextArea>
          </Form.Item>

          <div className="admin">
            <h5>¿Es bloque mínimo?</h5>
            <Radio.Group>
              <Radio.Button id="minimoSi" value={true} onChange={handleMinimo}>
                Si
              </Radio.Button>
              <Radio.Button id="minimoNo" value={false} onChange={handleMinimo}>
                No
              </Radio.Button>
            </Radio.Group>
            <br />
            <h5>¿A qué roles está destinado?</h5>

            {roles.map((rol) => {
              return (
                <div key={rol.id}>
                  <label className="admin_check" htmlFor={rol.tipo}>
                    {rol.tipo}
                  </label>
                  <input
                    type="checkbox"
                    name="roles"
                    value={rol.id}
                    id={`rol${rol.id}`}
                    onChange={handleRoles}
                  />
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-danger m-4 px-3 fs-4"
              type="button"
              onClick={handleDelete}
            >
              Eliminar
            </button>
            <button
              className="btn btn-outline-primary m-4 px-3 fs-4"
              type="submit"
            >
              Modificar
            </button>
          </div>
        </Form>
      )}
      <div className="my-5 d-flex justify-content-center">
        <button
          className="mb-3 mt-3 p-3 fs-4 button-style button-style green"
          type="button"
          onClick={toggleUnidad}
          style={{ display: showForm ? "none" : "block" }}
        >
          Agregar unidad al bloque
        </button>
        {showForm && (
          <AdminUnidades forceRender={forceRender} bloque={bloque} />
        )}
        <br />
      </div>
      <div className="admin">
        <h1 className="fs-2 text-secondary">
          <strong>Unidades del bloque</strong>
        </h1>
        <br />
      </div>
      <Unidades forceRender={forceRender} unidades={bloque?.unidades} />
    </div>
  );
}
