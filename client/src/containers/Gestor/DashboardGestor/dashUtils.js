const minimos = (user, bloques) => {
    const bloquesMinimos = bloques.filter(bloque => bloque.minimo === true)
    const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
    const entregados = user.entregas.filter(entrega => entrega.bloque.minimo === true && entrega.aprobado === true)
    return `${entregados.length}/${userBloques.length}`
}

const minimosCompletados = (user) => {
    const entregados = user.entregas? user.entregas.filter(entrega => entrega.bloque.minimo === true && entrega.aprobado === true) : []
    return entregados.length
}

const minimosTotal = (user,bloques) =>{
    const bloquesMinimos = bloques.filter(bloque => bloque.minimo === true)
    const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
    return userBloques.length
}

const opcionales = (user, bloques) => {
    const bloquesOpcionales = bloques.filter(bloque => bloque.minimo === false)
    const userBloques = bloquesOpcionales.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
    const entregados = user.entregas.filter(entrega => entrega.bloque.minimo === false && entrega.aprobado === true)
    return `${entregados.length}/${userBloques.length}`
}

const opcionalesCompletados = (user) => {
    
    const entregados = user.entregas? user.entregas.filter(entrega => entrega.bloque.minimo === false && entrega.aprobado === true) : []
    return entregados.length
}

const opcionalesTotal = (user,bloques) =>{
    const bloquesMinimos = bloques.filter(bloque => bloque.minimo === false)
    const userBloques = bloquesMinimos.filter(bloque => bloque.roles.map(rol => rol.id).includes(user.rolId))
    return userBloques.length
}

const pendientes = (user) => {
    return user.entregas.filter(entrega => entrega.aprobado === false).length
}

const totalPendientes = (voluntarios) => {
    let entregas = voluntarios.map(voluntario => voluntario.entregas.map(entrega => entrega.aprobado))
    let pendientes = entregas.flat().filter(state => state === false)
    return pendientes.length
}

const totalMinimos = (voluntarios, bloques) => {
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

const totalOpcionales = (voluntarios, bloques) => {
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

export { totalMinimos, totalOpcionales, totalPendientes, minimos, opcionales, pendientes, minimosCompletados, opcionalesCompletados,minimosTotal,opcionalesTotal }