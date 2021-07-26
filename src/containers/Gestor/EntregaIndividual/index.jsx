import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';

export default function EntregaIndividual() {

    const [entrega, setEntrega] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/entregas/${id}`)
        .then(res => res.data)
        .then(entrega => setEntrega(entrega))
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        axios.get(`/api/entregas/aprobar/${id}`)
        .then(() => history.push('/gestor/entregas'))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Voluntario: {entrega?.user.full_name}</h1>
            <h1>Bloque: {entrega?.bloque.titulo}</h1>
            <h1>Pregunta del bloque: {entrega?.bloque.pregunta}</h1>
            <h1>Contenido: {entrega?.contenido}</h1>
            <button type='button' onClick={(e) => handleClick(e)}>Marcar como completada</button>
        </div>
    )
}
