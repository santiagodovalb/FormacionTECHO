import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function CrearGestor() {

    const [form, setForm] = useState({rolId: 2})

    const sedes = useSelector(state => state.sedes)

    const history = useHistory()

    useEffect(() => {
        let options = "<option>Seleccionar Sede </sede>";
        for (var i = 0; i < sedes.length; i++) {
          options += `<option value=${sedes[i]?.id}>${sedes[i]?.nombre}</option>`;
        }
        document.getElementById("sedes").innerHTML = options
    }, [sedes])

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
                    <select name='sedeId' id='sedes' onChange={handleChange}>
                    </select>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}
