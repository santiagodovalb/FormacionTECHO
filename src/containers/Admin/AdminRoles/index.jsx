import { getRoles } from '@testing-library/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Roles from './Roles'
import useAuthorize from "../../../utils/authorization";

export default function AdminRoles() {
    const [form, setForm] = useState({})

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const handleSubmit = (id) => {
        axios.post('/api/roles/', form)
        .then(res => res.data)
        .then(() => {
            dispatch(getRoles())})
    }

    const handleChange = (e) => {
        setForm({tipo: e.target.value})
    }

    const toggleForm = () => {
        document.getElementById('newRole').style.display = document.getElementById('newRole').style.display === 'block' ? 'none' : 'block'
    }

    useAuthorize(user, 1)

    return (
        <div>
            <h1>Gestionar roles</h1>
            <button type='button' onClick={toggleForm}>Crear nuevo rol</button>
            <form onSubmit={handleSubmit} id='newRole' style={{display: 'none'}}>
                            <label htmlFor='nombre'>Tipo</label>
                            <input onChange={handleChange} type='text' name='tipo' ></input>
                            <button type='submit'>Crear</button>
                        </form>
            <Roles />
        </div>
    )
}
