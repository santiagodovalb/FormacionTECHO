import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Sedes() {

    const sedes = useSelector(state => state.sedes)

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
