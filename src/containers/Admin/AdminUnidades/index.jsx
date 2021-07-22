import React, { useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function AdminUnidades ( { bloque }) {

    const { id } = useParams();
    const [form, setForm] = useState({bloqueId: bloque.id})
    const history = useHistory();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/unidades', form)
        .then(() => history.push('/admin-bloques'))
    }

    return (
        <div>
            <h1>Agregar unidad a {bloque?.titulo}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='titulo'>Titulo</label>
                <input type='text' onChange={handleChange} name='titulo' />
                <label htmlFor='link'>Link</label>
                <input type='text' onChange={handleChange} name='link' />
                <button type='submit'>Agregar unidad</button>
            </form>
        </div>

    )

}