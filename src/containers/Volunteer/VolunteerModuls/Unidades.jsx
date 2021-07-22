import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router";
import Checkbox from 'antd/lib/checkbox/Checkbox';

export default function Unidades({ setChecks }) {

    const [unidades, setUnidades] = useState([])
    const { id } = useParams();

    
    useEffect(() => {
        axios
      .get(`/api/unidades/bloque/${id}`)
      .then((res) => res.data)
      .then((data) => setUnidades(data))
    }, [])

    const handleChange = (e) => {
        console.log('click')
        const status = e.target.checked
        localStorage.setItem(e.target.id, status ? 'true' : 'false')
        setChecks()
    }

    return (
        <div>
            {unidades.map(unidad => {
                const id = `check${unidad.id}`
                return (
                <div>
                <a href={`${unidad.link}`} target='_blank'>
                    <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue" id={`unidad${unidad.id}`}>
                    {unidad.titulo}
                    </button>
                </a>
                <Checkbox defaultChecked={localStorage.getItem(id) === 'true' ? true : false} onChange={handleChange} id={id}>Completado</Checkbox>
                </div>
                )
            })}
        </div>
    )
}
