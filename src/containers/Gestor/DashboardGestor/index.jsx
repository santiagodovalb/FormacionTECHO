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
            title: "Entregas pendientes por voluntario",
            render: (record) => (
              <React.Fragment>
                {record.voluntario}
                <br />
                {record.entregasPendientes}
              </React.Fragment>
            ),
            responsive: ["xs"]
          },
        {
            title: '',
            dataIndex: 'total',
            key: 'total',
            responsive: ["xs"]
        },
        {
            title: '',
            dataIndex: 'total',
            key: 'total',
            responsive: ["sm"]
        },
        
        {
            title: 'Voluntario',
            dataIndex: 'voluntario',
            key: 'voluntario',
            responsive: ['sm']
        },
        {
            title: 'Bloques minimos completados',
            dataIndex: 'bloquesMinimos',
            key: 'bloquesMinimos',
            responsive: ['sm']
        },
        {
            title: 'Bloques opcionales completados',
            dataIndex: 'bloquesOpcionales',
            key: 'bloquesOpcionales',
            responsive: ['sm']
        },
        {
            title: 'Entregas pendientes',
            dataIndex: 'entregasPendientes',
            key: 'entregasPendientes',
            responsive: ['sm']
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
            bloquesMinimos: totalMinimos(),
            bloquesOpcionales: totalOpcionales(),
            entregasPendientes: totalPendientes(),
    }]

    return (
        <div className="dashboard">
            <h1>Dashboard de {user.sede?.nombre}</h1>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    )
}
