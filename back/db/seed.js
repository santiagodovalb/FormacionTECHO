const {Roles,Sedes, Users,Bloques,Unidades} = require("../models")

const Rol =["Admin","Gestor","Referente Comunitario", "Coordinación de comunidad", "Implementacion de programas"]

const Sede = ["Buenos Aires La Plata","Buenos Aires Sur","Buenos Aires Oeste","Buenos Aires Norte",
"Neuquen / Rio Negro","Rosario","Cordoba","Salta","Tucuman","Corrientes / Chaco", "Misiones"]

const BloquesSeed = [
    {titulo:"Modelo de trabajo TECHO",
     descripcion:"Marco general del trabajo en las comunidades, los distintas formas de llegar al territorio y que buscamos alcanzar como organización",
     roles:Rol,
     minimo:true},

     {titulo:"Inducción Obligatoria a referentes",
     descripcion:"Misión, visión, valores e historia de TECHO. ¿Que esperamos del voluntariado? ¿Que nos identifica?",
     roles:Rol,
     minimo:true},


     {titulo:"Voluntariado",
     descripcion:"Voluntariado y participación activa en TECHO, ¿quienes conformamos la organización? ¿como nos organizamos?",
     roles:Rol,
     minimo:false},


     {titulo:"Inducción a gestión comunitaria 1",
     descripcion:"Descripciones generales de las responsabilidades del rol y que es lo que buscamos alcanzar",
     roles:"Coordinación de comunidad",
     minimo:true},



     {titulo:"La cuestión habitacional",
     descripcion:"Problematica habitacional y como se relaciona con el habitat y el trabajo de TECHO en territorio.",
     roles:"Coordinación de comunidad",
     minimo:true},

    ]


    const unidades = [
        {
            link: "https://docs.google.com/document/d/1pJjBACd23cLA5KZiFl6TdKYqZ4-cVV3PT0JMTJm8O-o/edit",
            titulo: "Marco general: Trabajo en comunidad",
            bloqueId:1
        },

        {
            link: "https://www.youtube.com/watch?v=eoXus74YL4Y&t=1s",
            titulo: "Modelo de trabajo TECHO",
            bloqueId:1
        },

        {
            link: "https://docs.google.com/presentation/d/15GH88eWHuZ77ZJ05i7SKsdoTdvq7KuFvVmKGCpDmHM0/edit#slide=id.g509f4839b1_0_9",
            titulo: "IOR 2020",
            bloqueId: 2
        },


        {
            link: "https://drive.google.com/file/d/1XR-OpGxcHR_gyzJe-g6k6y8qFb8LDWqM/view",
            titulo: "Programa de voluntariado",
            bloqueId: 3
        },


        {
            link: "https://docs.google.com/document/d/1dqWimNwOXQykgTiJNhnGT7pq_-GfVt7YAKD20-ysSp4/edit?ts=5e72628c",
            titulo: "Minimos y responsabilidades del CdC",
            bloqueId: 4
        },

        {
            link: "https://docs.google.com/presentation/d/1NG7qd0joJgZgmrWwYWsTyalz5iqC1hStfqhyqttPXBE/edit",
            titulo: "Mesa de trabajo parte1: Encuadre",
            bloqueId: 4
        },

        {
            link: "https://docs.google.com/presentation/d/10Ok7yvvLeggSAOmvZxfM0GYXUXU_xLzTA_-EQ-ZW_XU/edit#slide=id.g235b104dea_0_167",
            titulo: "Planificación comunitaria",
            bloqueId: 4
        },


        {
            link: "https://drive.google.com/file/d/0B4AHQ_kthZrLOFRrZTc0c1IwLXc/view?resourcekey=0-B5Yjf3MGAlCTa_3eQl8h8Q",
            titulo: "Marco de referencia",
            bloqueId: 5
        },
    ]



const seed = () =>{
    console.log("SEED STARTING")

    Rol.map( async rol=>{
        await Roles.create({tipo : rol})
    })


    Sede.map(async sede =>{
        await Sedes.create({nombre: sede})
    })

    /* BloquesSeed.map( async bloque=>{
        await Bloques.create({titulo: bloque.titulo, descripcion: bloque.descripcion,minimo:bloque.minimo})
    }) */

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
        sedeId: 1,
        password: 'voluntario',
        img: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    })
    .then(user => {
        Roles.findByPk(3).then(rol=>{
            user.setRol(rol)
        })
    })

   


    /* unidades.map( async unidad=>{
        await Unidades.create(unidad)
    }) */


}


seed()