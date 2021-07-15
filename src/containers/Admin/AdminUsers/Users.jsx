import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setUsers } from '../../../redux/users'

function Users () {

    const [rol, setRol] = useState(0);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(setUsers())
    }, [dispatch])

    const handleChange = (e) => {
        setRol(e.target.value)
    }

    const handleClick = (userId, rolId) => {
        console.log('DATA', userId, rolId)
        axios.put(`/api/roles/set/`, {userId, rolId})
        .then(() => dispatch(setUsers()))
    }
    console.log("USERS del admin", users)

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
                        <button onClick={() => handleClick(user.id, rol)} type='button'>Asignar rol</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Users