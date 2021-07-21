import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router";

export default function Unidades() {

    const [unidades, setUnidades] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios
      .get(`/api/unidades/bloque/${id}`)
      .then((res) => res.data)
      .then((data) => setUnidades(data))
    }, [])

    return (
        <div>
            {unidades.map(unidad => {
                return (
                <a href={`${unidad.link}`} target='_blank'>
                    <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue">
                    {unidad.titulo}
                    </button>
                </a>
                )
            })}
        </div>
    )
}
