import React, { useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Form, Input, message } from "antd";
import "./index.css";
import axios from 'axios'

export default function AdminUnidades ( { bloque }) {

    const { id } = useParams();
    const [form, setForm] = useState({bloqueId: bloque.id})
    const history = useHistory();


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        axios.post('/api/unidades', form)
        .then(() => history.push("/admin-bloques"))
    }

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