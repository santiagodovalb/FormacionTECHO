import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Unidades({ unidades }) {

    const [form, setForm] = useState({})
    const history = useHistory();

    const handleClick = (id) => {
        document.getElementById(`unidad${id}`).style.display = document.getElementById(`unidad${id}`).style.display === 'none' ? 'block' : 'none'
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        axios.put(`/api/unidades/${id}`, form)
        .then(() => history.push('/admin-bloques'))
    }

    const handleDelete = (id) => {
        console.log('AIDI', id)
        axios.delete(`/api/unidades/${id}`)
        .then(() => history.push('/admin-bloques'))
    }

    return (
        <div>
        {unidades?.map(unidad => {
            return (
                <div>
                <button onClick={() => handleClick(unidad.id)} type='button'>{unidad.titulo}</button>
                <form onSubmit={(e) => handleSubmit(e, unidad.id)} id={`unidad${unidad.id}`} style={{display: 'none'}}>
                    <label htmlFor='titulo'>Titulo</label>
                    <input type='text' onChange={handleChange} name='titulo' defaultValue={unidad.titulo} />
                    <label htmlFor='link'>Link</label>
                    <input type='text' onChange={handleChange} name='link' defaultValue={unidad.link}/>
                    <button type='submit'>Modificar unidad</button>
                </form>
                    <button type='button' onClick={() => handleDelete(unidad.id)}>Eliminar Unidad </button>
                </div>
            )
        })}
        </div>
    )
}