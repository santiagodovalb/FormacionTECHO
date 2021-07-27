import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuthorize from "../../../utils/authorization";

export default function ListaSedes() {

    const sedes = useSelector(state => state.sedes)
    const user = useSelector(state => state.user)

    useAuthorize(user, 1)

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
