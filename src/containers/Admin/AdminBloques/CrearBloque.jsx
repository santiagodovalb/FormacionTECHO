import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBloques } from '../../../redux/bloques';

export default function CrearBloque() {

    const [form, setForm] = useState({rolesId: []})
    const [roles, setRoles] = useState([])
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/roles')
        .then(res => res.data)
        .then(roles => roles.filter(rol => rol.id >= 3))
        .then(roles => setRoles(roles))
    }, [])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleMinimo = (e) => {
        let boolean = e.target.id === 'si' ? true : false
        setForm({...form, minimo: boolean})
    }

    const handleRoles = (e) => {
        let array = [...form.rolesId]
        e.target.checked ? array = [...array, e.target.value] : array.splice(form.rolesId.indexOf(e.target.value), 1)
        setForm({...form, rolesId: [...array]})
    }

  
    if (user.rolId && user.rolId !== 1) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/bloques', form)
        .then(res => {
            dispatch(getBloques())
            history.push('/admin-bloques')})
    }

    return (
        <div>
            <h1>Crear nuevo bloque de formacion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='titulo'>Titulo</label>
                    <input type='text' name='titulo' onChange={handleChange}></input>
                <label htmlFor='descripcion'>Descripcion</label>
                    <input type='text' name='descripcion' onChange={handleChange}></input>
                    <label htmlFor='pregunta'>Pregunta</label>
                    <input type='text' name='pregunta' onChange={handleChange}></input>    
                <p>Es bloque minimo?</p>
                    <label htmlFor='si'>Si</label>
                    <input type="radio" name='minimo' id='si' onChange={handleMinimo}/>
                    <label htmlFor='no'>No</label>
                    <input type="radio" name='minimo' id='no' onChange={handleMinimo}/>
                <p>A que roles esta destinado?</p>

                {roles.map(rol => {
                    return (
                        <div>
                            <label htmlFor={rol.tipo} >{rol.tipo}</label>
                        <input type="checkbox" name='roles' value={rol.id} id={rol.id} onChange={handleRoles}/>
                        </div>
                    )
                })}
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}
