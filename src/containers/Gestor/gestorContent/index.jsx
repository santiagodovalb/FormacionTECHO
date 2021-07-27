import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updatePassword } from "../../../redux/users";
import { message } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./styles.css";
import useAuthorize from "../../../utils/authorization";

const GestorContent = () => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useAuthorize(user, 2)

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <>
      <div className="change_password_div">
        <h3>Cambiar contraseña</h3>
        <Form 
              {...layout}
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
            labelAlign="right-align"
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
