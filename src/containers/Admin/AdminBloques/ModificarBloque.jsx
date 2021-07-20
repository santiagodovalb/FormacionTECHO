import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getBloques } from '../../../redux/bloques';

export default function ModificarBloque() {

    const [bloque, setBloque] = useState();
    const [form, setForm] = useState({bloque});
    const { id } = useParams()
    const user = useSelector(state => state.user)
    const roles = useSelector(state => state.roles).filter(rol => rol.id > 2)
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/api/bloques/${id}`)
        .then(res => res.data)
        .then(bloque => {
            console.log('BLOQUE', bloque);
            setForm({
                titulo: bloque.titulo,
                descripcion: bloque.descripcion,
                minimo: bloque.minimo,
                rolesId: bloque.roles.map(rol => rol.id)
            })
            setBloque(bloque)
        
            return bloque
            })
        .then(bloque => {
            const rolesIds = roles.map(rol => rol.id)
            for(let i = 0; i < roles.length; i++) {
                document.getElementById(`rol${rolesIds[i]}`).checked = bloque.roles.map(rol => rol.id).includes(rolesIds[i]) && 'true'
            }
            document.getElementById('minimoSi').checked = bloque.minimo && 'true'
            document.getElementById('minimoNo').checked = !bloque.minimo && 'true'
        })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/bloques/${id}`, form)
        .then(() => {
            dispatch(getBloques())
            history.push('/admin-bloques')
        })
    }

  
    if (user.rolId && user.rolId !== 1) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    return (
        <div>
            <h1>{bloque && bloque.titulo}</h1>
            {bloque && <form onSubmit={handleSubmit}>
                <label htmlFor='titulo'>Titulo</label>
                    <input type='text' name='titulo' onChange={handleChange} defaultValue={bloque.titulo}></input>
                <label htmlFor='descripcion'>Descripcion</label>
                    <textarea name='descripcion' onChange={handleChange} defaultValue={bloque.descripcion}></textarea>
                <p>Es bloque minimo?</p>
                    <label htmlFor='si'>Si</label>
                    <input type="radio" name='minimo' id='si' id='minimoSi' onChange={handleMinimo}/>
                    <label htmlFor='no'>No</label>
                    <input type="radio" name='minimo' id='no' id='minimoNo' onChange={handleMinimo}/>
                <p>A que roles esta destinado?</p>

                {roles.map(rol => {
                    return (
                        <div>
                            <label htmlFor={rol.tipo} >{rol.tipo}</label>
                        <input type="checkbox" name='roles' value={rol.id} id={`rol${rol.id}`} onChange={handleRoles}/>
                        </div>
                    )
                })}
                <button type='submit'>Modificar</button>
            </form>}
        </div>
    )
}
