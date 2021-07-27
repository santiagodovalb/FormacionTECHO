import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector} from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import useAuthorize from "../../../utils/authorization";

function Users () {

    const [rol, setRol] = useState(0);
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const roles = useSelector(state=>state.roles.filter((rol)=> rol.id!==1))
    const location = useLocation()
    const id = location.pathname.slice(21)

    useEffect(() => {
        axios.get(`/api/users/sede/${id}`)
        .then(res => res.data)
        .then(users => setUsers(users))
    }, [user])

    const handleChange = (e) => {
        setRol(e.target.value)
    }

    const handleClick = (userId, rolId) => {
        axios.post('/api/roles/set/', {userId, rolId, user})
        .then(() => axios.get(`/api/users/sede/${id}`))
        .then(res => res.data)
        .then(users => setUsers(users))
    }

    const handleDelete = (userId) => {
        return axios.delete(`/api/users/${userId}`)
        .then(() => axios.get(`/api/users/sede/${id}`)
            .then(res => res.data)
            .then(users => setUsers(users)))
    }

  
    useAuthorize(user, 1)

    return (
        <div>
            <h1>Administrar roles</h1>
            {!users.length && <h1>No hay voluntarios/gestores en esta sede</h1>}
            {users && users.map(user => {
                return (
                    
                    <div key={user.id}>
                        <h2>Nombre: {user.full_name} Rol: {user.rol && user.rol.tipo}</h2>
                        <label htmlFor='rol'>Seleccionar rol</label>
                        <select onChange={handleChange}>
                            <option>Seleccionar rol</option>
                            {roles && roles.map(rol=>{
                                return(
                                <option value={rol.id}> {rol.tipo} </option>
                                )
                            })}
                        </select>
                        <button onClick={(e) => handleClick(user.id, parseInt(rol))} type='button'>Asignar rol</button>
                        <button onClick={() => handleDelete(user.id)} type="button"> Eliminar usuario</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Users