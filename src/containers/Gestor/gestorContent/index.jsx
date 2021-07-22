import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updatePassword } from "../../../redux/users";
import { message } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./styles.css";

const GestorContent = () => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (user.rolId && user.rolId !== 2) {
    history.push("/unauthorized");
    return (
      <>
        <h1>No autorizado</h1>
      </>
    );
  }

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    console.log("FOORRRM", form);
  };

  const onSubmit = async () => {
    if (
      form.password === user.password &&
      form.newPassword === form.newPasswordConfirm
    ) {
      await dispatch(
        updatePassword({ id: user.id, password: form.newPassword })
      );
      message.success("Password changed");
    } else {
      message.error("Bad credentials");
    }
  };

  return (
    <>
      <div className="change_password_div">
        <h3>Cambiar contraseña</h3>
        <Form 
              initialValues={{
                remember: true,
              }}
        onFinish={onSubmit}>
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

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Cambiar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default GestorContent;
