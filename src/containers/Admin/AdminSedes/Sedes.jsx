import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSedes } from '../../../redux/sedes'

export default function Sedes() {

    const [form, setForm] = useState({})

    const sedes = useSelector(state => state.sedes)
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.user)

    const toggleForm = (id) => {
        console.log(document.getElementById(id))
        document.getElementById(id).style.display = document.getElementById(id).style.display === 'block' ? 'none' : 'block'
    }

    const handleSubmit = (id) => {
        axios.post(`/api/sedes/`, form)
        .then(res => res.data)
        .then(() => dispatch(getSedes()))
    }

    const handleChange = (e) => {
        setForm({nombre: e.target.value})
    }

    const handleDelete = (id) => {
        axios.delete(`/api/sedes/${id}`)
        .then(() => dispatch(getSedes()))
    }

    if (user.rolId && user.rolId !== 1) {
        history.push("/unauthorized");
        return <><h1>No autorizado</h1></>;
      }

    return (
        <div>
            {sedes && sedes.map(sede => {
                return (
                    <div>
                        <h3>{sede.nombre}</h3>
                        <button onClick={() => toggleForm(`sedeForm${sede.id}`)} type='button'>Modificar sede</button>
                        <form onSubmit={() => handleSubmit(sede.id)} id={`sedeForm${sede.id}`} style={{display: 'none'}}>
                            <label htmlFor='nombre'>Nombre</label>
                            <input onChange={handleChange} type='text' name='nombre' placeholder={sede.nombre}></input>
                            <button type='submit'>Confirmar cambios</button>
                        </form>
                        <button onClick={() => handleDelete(sede.id)} type='button'>Borrar sede</button>
                    </div>
                )
            })}
        </div>
    )
}
