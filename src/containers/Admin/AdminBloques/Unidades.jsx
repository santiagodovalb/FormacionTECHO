import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import Swal from 'sweetalert2'
import useAuthorize from "../../../utils/authorization";
import { useSelector } from "react-redux";

export default function Unidades({ forceRender, unidades }) {
  const [form, setForm] = useState({});
  const user = useSelector(state => state.user)

  useAuthorize(user, 1)

  const handleClick = (id) => {
    document.getElementById(`unidad${id}`).style.display =
      document.getElementById(`unidad${id}`).style.display === "none"
        ? "block"
        : "none";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, id) => {
    axios
      .put(`/api/unidades/${id}`, form)
      .then(() => forceRender(), message.success("Modificado correctamente"));
  };

  const alertaEliminar = Swal.mixin({
    buttonsStyling: true,
  });

  const handleDelete = (id) => {
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
            "El módulo fue eliminado correctamente.",
            "success"
          );
          axios.delete(`/api/unidades/${id}`).then(() => forceRender());
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alertaEliminar.fire("Cancelado", "El módulo está a salvo", "error");
        }
      });
  };

  return (
    <>
      {unidades?.map((unidad) => {
        return (
          <div key={unidad.id}>
            <div className="admin">
              <button
                className="mb-3 mt-3 p-3 fs-3 button-style light-blue"
                onClick={() => handleClick(unidad.id)}
                type="button"
              >
                {unidad.titulo}
              </button>
            </div>
            <Form
              style={{ display: "none" }}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 13,
              }}
              onFinish={(e) => handleSubmit(e, unidad.id)}
              id={`unidad${unidad.id}`}
            >
              <Form.Item label="Titulo">
                <Input
                  type="text"
                  name="titulo"
                  onChange={handleChange}
                  defaultValue={unidad.titulo}
                ></Input>
              </Form.Item>
              <Form.Item label="Link">
                <Input
                  type="text"
                  name="link"
                  onChange={handleChange}
                  defaultValue={unidad.link}
                ></Input>
              </Form.Item>
              <div className="admin">
                <button
                  className="mb-3 mt-3 p-3 fs-3 button-style light-blue"
                  htmlType="submit"
                >
                  Modificar unidad
                </button>
                <button
                  className="mb-3 mt-3 p-3 fs-3 button-style green"
                  type="button"
                  onClick={() => handleDelete(unidad.id)}
                >
                  Eliminar Unidad{" "}
                </button>
              </div>
            </Form>
            <br />
          </div>
        );
      })}
    </>
  );
}
