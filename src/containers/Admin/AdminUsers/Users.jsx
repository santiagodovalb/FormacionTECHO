import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setUsers } from '../../../redux/users'
import { useHistory, useLocation } from 'react-router-dom';

function Users () {

    const [rol, setRol] = useState(0);
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user)
    const roles = useSelector(state=>state.roles.filter((rol)=> rol.id!==1))
    const history = useHistory();
    const location = useLocation()
    const id = location.pathname.slice(21)
    useEffect(() => {
        axios.get(`/api/users/sede/${id}`)
        .then(res => res.data)
        .then(users => setUsers(users))
    }, [])

    const handleChange = (e) => {
        setRol(e.target.value)
    }

    const handleClick = (userId, rolId) => {
        return axios.post('http://localhost:3001/api/roles/set/', {userId, rolId, user})
    }

  
    if (user.rolId && user.rolId !== 1) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    return (
        <div>
            <h1>Administrar roles</h1>
            {console.log('USERS', users)}
            {!users.length && <h1>No hay voluntarios/gestores en esta sede</h1>}
            {users && users.map(user => {
                return (
                    <div key={user.id}>
                        <h2>Nombre: {user.full_name} Rol: {user.rolId}</h2>
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
                    </div>
                )
            })}
        </div>
    )
}

export default Users