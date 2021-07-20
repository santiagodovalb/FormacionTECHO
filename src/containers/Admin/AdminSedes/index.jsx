import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSedes } from '../../../redux/sedes'
import Sedes from './Sedes'

export default function AdminSedes() {

    const [form, setForm] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.user)

    if (user.rolId && user.rolId !== 1) {
        history.push("/unauthorized");
        return <><h1>No autorizado</h1></>;
    }

    const handleSubmit = (id) => {
        axios.post(`/api/sedes/`, form)
        .then(res => res.data)
        .then(() => dispatch(getSedes()))
    }

    const handleChange = (e) => {
        setForm({nombre: e.target.value})
    }

    const toggleForm = () => {
        document.getElementById('newSede').style.display = document.getElementById('newSede').style.display === 'block' ? 'none' : 'block'
    }

    return (
        <div>
            <h1>Gestionar sedes</h1>
            <button type='button' onClick={toggleForm}>Crear nueva sede</button>
            <form onSubmit={handleSubmit} id='newSede' style={{display: 'none'}}>
                            <label htmlFor='nombre'>Nombre</label>
                            <input onChange={handleChange} type='text' name='nombre' ></input>
                            <button type='submit'>Crear</button>
                        </form>
            <Sedes />
        </div>
    )
}
