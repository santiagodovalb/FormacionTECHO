import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getRoles } from '../../../redux/roles'
import useAuthorize from "../../../utils/authorization";

export default function Roles() {
    const [form, setForm] = useState({})

    const roles = useSelector(state => state.roles).filter(rol => rol.id > 1)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    

    const toggleForm = (id) => {
        document.getElementById(id).style.display = document.getElementById(id).style.display === 'block' ? 'none' : 'block'
    }

    const handleSubmit = (id) => {
        axios.put(`/api/roles/${id}`, form)
        .then(res => res.data)
        .then(() => dispatch(getRoles()))
    }

    const handleChange = (e) => {
        setForm({tipo: e.target.value})
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        return axios.delete(`/api/roles/${id}`)
        .then(() => dispatch(getRoles()))
    }

    useAuthorize(user, 1)

    return (
        <div>
            {roles && roles.map(rol => {
                return (
                    <div>
                        <h3>{rol.tipo}</h3>
                        <button onClick={() => toggleForm(`sedeForm${rol.id}`)} type='button'>Modificar Rol</button>
                        <form onSubmit={() => handleSubmit(rol.id)} id={`sedeForm${rol.id}`} style={{display: 'none'}}>
                            <label htmlFor='nombre'>Tipo</label>
                            <input onChange={handleChange} type='text' name='nombre' placeholder={rol.tipo}></input>
                            <button type='submit'>Confirmar cambios</button>
                        </form>
                            <button onClick={(e) => handleDelete(e, rol.id)} type='button'>Borrar rol</button>
                    </div>
                )
            })}
        </div>
    )
}