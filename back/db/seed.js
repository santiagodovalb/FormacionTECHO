const {Roles,Sedes, Users} = require("../models")

const Rol =["Admin","Gestor","Referente Comunitario", "Coordinación de comunidad", "Implementacion de programas"]

const Sede = ["Buenos Aires La Plata","Buenos Aires Sur","Buenos Aires Oeste","Buenos Aires Norte",
"Neuquen / Río Negro","Rosario","Córdoba","Salta","Tucuman","Corrientes / Chaco", "Misiones"]




const seed = () =>{
    console.log("SEED STARTING")

    Rol.map( async rol=>{
        await Roles.create({tipo : rol})
    })


    Sede.map(async sede =>{
        await Sedes.create({nombre: sede})
    })

    Users.create({
        full_name: 'Juancito Admin',
        email: 'admin@admin.com',
        password: 'admin',
        img: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    })
    .then(user => {
        Roles.findByPk(1).then(rol=>{
            user.setRol(rol)
        })
    })

    Users.create({
        full_name: 'Sergio Gestor',
        email: 'gestor@gestor.com',
        password: 'gestor',
        img: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    })
    .then(user => {
        Roles.findByPk(2).then(rol=>{
            user.setRol(rol)
        })
    })

    Users.create({
        full_name: 'Victor Voluntario',
        email: 'voluntario@voluntario.com',
        password: 'voluntario',
        img: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    })
    .then(user => {
        Roles.findByPk(3).then(rol=>{
            user.setRol(rol)
        })
    })

}


seed()