import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import Swal from 'sweetalert2'
import useAuthorize from "../../../utils/authorization";

export default function Unidades({ forceRender, unidades }) {
  const [form, setForm] = useState({});
  const history = useHistory();

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
      .then(() => history.push("/admin-bloques"));
  };

  const alertaEliminar = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const handleDelete = (id) => {
    console.log("AIDI", id);
    alertaEliminar.fire({
      title: 'Estás seguro?',
      text: "Si lo confirmas, no podrás deshacerlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        alertaEliminar.fire(
          'Eliminado!',
          'El módulo fue eliminado correctamente.',
          'success'
        )
        axios
          .delete(`/api/unidades/${id}`)
          .then(() => forceRender());
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        alertaEliminar.fire(
          'Cancelado',
          'El módulo está a salvo',
          'error'
        )
      }
    })
  };

  return (
    <>
      {unidades?.map((unidad) => {
        return (
          <div>
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
              style={{display: 'none'}}
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

