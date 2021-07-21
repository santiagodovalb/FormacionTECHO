import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router";

export default function Unidades() {

    const [unidades, setUnidades] = useState([])
    const { id } = useParams();

    const clickCheck = []

    for (let i = 0; i < unidades.length; i++) {
        clickCheck[i] = false
    }

    const handleClick = (id) => {
        clickCheck[id - 1] = true
    }

    useEffect(() => {
        for (let i = 0; i < unidades.length; i++) {
            clickCheck[i] = false
        }
        axios
      .get(`/api/unidades/bloque/${id}`)
      .then((res) => res.data)
      .then((data) => setUnidades(data))
    }, [])

    return (
        <div>
            {console.log(clickCheck)}
            {console.log(unidades)}
            {unidades.map(unidad => {
                return (
                <a href={`${unidad.link}`} target='_blank'>
                    <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue" onClick={() => handleClick(unidad.id)} id={`unidad${unidad.id}`}>
                    {unidad.titulo}
                    </button>
                </a>
                )
            })}
        </div>
    )
}
