import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setUsers } from '../../../redux/users'
import { useHistory } from 'react-router-dom';

function Users () {

    const [rol, setRol] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const users = useSelector(state => state.users)
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setUsers())
    }, [dispatch])

    const handleChange = (e) => {
        setRol(e.target.value)
    }

    const handleClick = (userId, rolId) => {
        return axios.post('http://localhost:3001/api/roles/set/', {userId, rolId, user})
        .then(() => {
            console.log('ENTRA')
            dispatch(setUsers())})
    }

  
    if (user.rolId && user.rolId !== 1) {
      history.push("/unauthorized");
      return <><h1>No autorizado</h1></>;
    }

    return (
        <div>
            {users && users.map(user => {
                return (
                    <div key={user.id}>
                        <h2>Nombre: {user.full_name} Rol: {user.rol?.tipo}</h2>
                        <label htmlFor='rol'>Seleccionar rol</label>
                        <select onChange={handleChange}>
                            <option>Seleccionar rol</option>
                            <option value='2'>Gestor</option>
                            <option value='3'>Referente Comunitario</option>
                        </select>
                        <button onClick={(e) => handleClick(user.id, parseInt(rol))} type='button'>Asignar rol</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Users