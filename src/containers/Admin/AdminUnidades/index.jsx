import React, { useState} from 'react';
import { Form, Input } from "antd";
import "./index.css";
import axios from 'axios'
import useAuthorize from "../../../utils/authorization";
import { useSelector } from 'react-redux';


export default function AdminUnidades ( { forceRender, bloque }) {

    const [form, setForm] = useState({bloqueId: bloque.id})
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        axios.post('/api/unidades', form)
        .then(() => forceRender())
    }

    useAuthorize(user, 1)

    return (
        <div>
            <h1>Agregar unidad a {bloque?.titulo}</h1>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Titulo">
                    <Input type="text" onChange={handleChange} name="titulo"></Input>
                </Form.Item>
                <Form.Item  label="Link">
                    <Input type="text" onChange={handleChange} name="link"></Input>
                </Form.Item>
                <div className="admin_unidades">
                <button type='submit' className="mb-3 mt-3 p-3 fs-3 button-style light-blue">Agregar unidad</button>
                </div>
            </Form>
        </div>

    )

}