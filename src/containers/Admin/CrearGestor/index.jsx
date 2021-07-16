import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function CrearGestor() {

    const [form, setForm] = useState({rolId: 2})

    const history = useHistory()

    const handleChange = (e) => {
        console.log(form)
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/create', form)
        .then(res => res.data)
        .then(() => history.push('/admin-usuarios'))
    }

    return (
        <div>
            <h1>Crear Gestor</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='full_name'>Nombre completo</label>
                    <input type='text' onChange={handleChange} name='full_name' />
                <label htmlFor='email'>Email</label>
                    <input type='text' onChange={handleChange} name='email' />
                <label htmlFor='password'>Contraseña de acceso</label>
                    <input type='password' onChange={handleChange} name='password' />
                <label htmlFor='sede'>Sede</label>
                    <select name='sede'>
                        <option>Seleccionar sede</option>
                    </select>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}
