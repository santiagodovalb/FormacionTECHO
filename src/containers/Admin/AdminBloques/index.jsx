import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function AdminBloques() {

    const bloques = useSelector(state => state.bloques)

    return (
        <div>
            <h1>Gestionar o crear bloques</h1>
            <Link to='/admin-bloques-crear'>
            <button type='button'>Crear nuevo bloque</button>
            </Link>
            <br/>
            {bloques.map(bloque => {
                return (
                    <Link to={`/admin-bloques/${bloque.id}`}>
                    <button type='button'>{bloque.titulo}</button>
                    </Link>
                )
            })}
        </div>
    )
}
