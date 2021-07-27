import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Table } from 'antd'

export default function DashboardGestor() {

    const user = useSelector(state => state.user)
    const bloques = useSelector(state => state.bloques)
    const [voluntarios, setVoluntarios] = useState([])
    const history = useHistory();

    useEffect(() => {

        axios.get(`/api/users/sede/${user.sedeId}`)
        .then(res => res.data)
        .then(voluntarios => setVoluntarios(voluntarios.filter(voluntario => voluntario.rolId > 2)))
        .catch(err => err)
    }, [user, bloques])

    const minimos = (user) => {
        const bloquesMinimos = bloques.filter(bloque => bloque.minimo === true)
        const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
        const entregados = user.entregas.filter(entrega => entrega.bloque.minimo === true && entrega.aprobado === true)
        return `${entregados.length}/${userBloques.length}`
    }

    const opcionales = (user) => {
        const bloquesOpcionales = bloques.filter(bloque => bloque.minimo === false)
        const userBloques = bloquesOpcionales.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
        const entregados = user.entregas.filter(entrega => entrega.bloque.minimo === false && entrega.aprobado === true)
        return `${entregados.length}/${userBloques.length}`
    }

    const pendientes = (user) => {
        return user.entregas.filter(entrega => entrega.aprobado === false).length
    }

    const totalPendientes = () => {
        let entregas = voluntarios.map(voluntario => voluntario.entregas.map(entrega => entrega.aprobado))
        let pendientes = entregas.flat().filter(state => state === false)
        return pendientes.length
    }

    const totalMinimos = () => {
        const bloquesMinimos = bloques.filter(bloque => bloque.minimo === true)
        let totalMin = 0
        let aprobados = 0
        for (let i = 0; i < voluntarios.length; i++) {
            const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(voluntarios[i].rolId)).length
            totalMin += userBloques
            aprobados += voluntarios[i].entregas.filter(entrega => entrega.bloque.minimo === true && entrega.aprobado === true).length

        }
        return `${aprobados}/${totalMin}`
    }

    const totalOpcionales = () => {
        const bloquesMinimos = bloques.filter(bloque => bloque.minimo === false)
        let totalMin = 0
        let aprobados = 0
        for (let i = 0; i < voluntarios.length; i++) {
            const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(voluntarios[i].rolId)).length
            totalMin += userBloques
            aprobados += voluntarios[i].entregas.filter(entrega => entrega.bloque.minimo === false && entrega.aprobado === true).length

        }
        return `${aprobados}/${totalMin}`
    }

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
            bloquesMinimos: minimos(voluntario),
            bloquesOpcionales: opcionales(voluntario),
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
