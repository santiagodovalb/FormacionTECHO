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
        full_name: 'juancito admin',
        email: 'admin@admin.com',
        password: 'admin',
    })
    .then(user => {
        Roles.findByPk(1).then(rol=>{
            user.setRol(rol)
        })
    })

}


seed()