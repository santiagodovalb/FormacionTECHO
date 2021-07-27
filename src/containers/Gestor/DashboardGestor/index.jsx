import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Table } from 'antd'
import { totalMinimos, totalOpcionales, totalPendientes, minimos, opcionales, pendientes } from './dashUtils'
import useAuthorize from '../../../utils/authorization'

export default function DashboardGestor() {

    const user = useSelector(state => state.user)
    const bloques = useSelector(state => state.bloques)
    const [voluntarios, setVoluntarios] = useState([])

    useEffect(() => {

        axios.get(`/api/users/sede/${user.sedeId}`)
        .then(res => res.data)
        .then(voluntarios => setVoluntarios(voluntarios.filter(voluntario => voluntario.rolId > 2)))
        .catch(err => err)
    }, [user, bloques])

    useAuthorize(user, 2)

    const columns = [
        {
            title: '',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Voluntario',
            dataIndex: 'voluntario',
            key: 'voluntario',
        },
        {
            title: 'Bloques minimos completados',
            dataIndex: 'bloquesMinimos',
            key: 'bloquesMinimos',
        },
        {
            title: 'Bloques opcionales completados',
            dataIndex: 'bloquesOpcionales',
            key: 'bloquesOpcionales',
        },
        {
            title: 'Entregas pendientes',
            dataIndex: 'entregasPendientes',
            key: 'entregasPendientes',
        }
    ]
    
    const dataVoluntarios = voluntarios.map(voluntario => {
        return (
          {
            key: voluntario.id,
            total: '',
            voluntario: voluntario.full_name,
            bloquesMinimos: minimos(voluntario, bloques),
            bloquesOpcionales: opcionales(voluntario, bloques),
            entregasPendientes: pendientes(voluntario),
          }
        )
      })
    
    const dataSource = [...dataVoluntarios, {
        
            key: 'total',
            total: 'Total',
            voluntario: voluntarios.length,
            bloquesMinimos: totalMinimos(voluntarios, bloques),
            bloquesOpcionales: totalOpcionales(voluntarios, bloques),
            entregasPendientes: totalPendientes(voluntarios),
          
    }]

    return (
        <div>
            <h1>Dashboard de {user.sede?.nombre}</h1>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    )
}
