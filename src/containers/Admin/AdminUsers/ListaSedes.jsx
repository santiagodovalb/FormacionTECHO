import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

export default function ListaSedes() {

    const sedes = useSelector(state => state.sedes)
    const user = useSelector(state => state.user)
    const history = useHistory()

    if (user.rolId && user.rolId !== 1) {
        history.push("/unauthorized");
        return <><h1>No autorizado</h1></>;
      }

    return (
        <div>
            {sedes.map(sede => {
                return (
                    <Link to={`/admin-usuarios/sede/${sede.id}`}>
                        <button type='button'>{sede.nombre}</button>
                    </Link>
                )
            })}
        </div>
    )
}
