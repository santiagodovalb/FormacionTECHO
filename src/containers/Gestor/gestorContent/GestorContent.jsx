import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/users";
import { message } from "antd";
import { Form, Input, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./GestorContent.css";
import useAuthorize from "../../../utils/authorization";
import isValid from '../../../utils/specialChars'

const GestorContent = () => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useAuthorize(user, 2);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = async () => {
    if (form.newPassword === form.newPasswordConfirm) {
      if (!isValid(form.newPassword)) {
        return message.error("No se permiten caracteres especiales")
      }
      await dispatch(
        updatePassword({
          id: user.id,
          oldP: form.password,
          newP: form.newPassword,
        })
      ).then((data) => {
        if (!data.payload) message.error("Bad credentials");
        else {
          message.success("Password changed");
        }
      });
    }
  };

  return (
    <>
      <div className="change_password_div">
        <h1 className="fs-3 text-secondary m-5">
          <strong>Cambiar contraseña</strong>
        </h1>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            onChange={onChange}
            label="Actual contraseña:"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            onChange={onChange}
            label="Nueva contraseña:"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            onChange={onChange}
            label="Confirmá la nueva contraseña"
            name="newPasswordConfirm"
            
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
            <Button type="primary" htmlType="submit">
              Cambiar
            </Button>
          
        </Form>
        </div>
    </>
  );
};

export default GestorContent;
