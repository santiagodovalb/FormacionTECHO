const { Roles, Sedes, Users, Bloques, Unidades } = require("../models");

const Rol = [
  { tipo: "Admin" },
  { tipo: "Gestor" },
  { tipo: "Referente Comunitario" },
  { tipo: "Coordinación de comunidad" },
  { tipo: "Implementacion de programas" },
];

const Sede = [
  { 
    nombre: "Buenos Aires La Plata",
    comunidadId: 1
  },
  { 
    nombre: "Buenos Aires Sur",
  comunidadId: 4 
  },
  { 
    nombre: "Buenos Aires Oeste",
    comunidadId: 3
  },
  { 
    nombre: "Buenos Aires Norte",
    comunidadId: 2
  },
  { 
    nombre: "Neuquen / Rio Negro",
    comunidadId: 9 
  },
  { 
    nombre: "Rosario",
    comunidadId: 10 
  },
  { 
    nombre: "Cordoba",
  comunidadId: 5
  },
  { 
    nombre: "Salta",
    comunidadId: 11
  },
  { 
    nombre: "Tucuman",
  comunidadId: 12
  },
  { 
    nombre: "Corrientes / Chaco",
    comunidadId: 7 },
  { 
    nombre: "Misiones",
    comunidadId: 8
  },
];

const BloquesSeed = [
  {
    titulo: "Modelo de trabajo TECHO",
    descripcion:
      "Marco general del trabajo en las comunidades, los distintas formas de llegar al territorio y que buscamos alcanzar como organización",
    roles: [3, 4, 5],
    minimo: true,
    pregunta: "que comiste hoy ?",
  },

  {
    titulo: "Inducción Obligatoria a referentes",
    descripcion:
      "Misión, visión, valores e historia de TECHO. ¿Que esperamos del voluntariado? ¿Que nos identifica?",
    roles: [3, 4, 5],
    minimo: true,
    pregunta: "que merendaste hoy ?",
  },

  {
    titulo: "Voluntariado",
    descripcion:
      "Voluntariado y participación activa en TECHO, ¿quienes conformamos la organización? ¿como nos organizamos?",
    roles: [3, 4, 5],
    minimo: false,
    pregunta: "que desayunaste hoy ?",
  },

  {
    titulo: "Inducción a gestión comunitaria 1",
    descripcion:
      "Descripciones generales de las responsabilidades del rol y que es lo que buscamos alcanzar",
    roles: [4],
    minimo: true,
    pregunta: "que cenaste hoy ?",
  },

  {
    titulo: "La cuestión habitacional",
    descripcion:
      "Problematica habitacional y como se relaciona con el habitat y el trabajo de TECHO en territorio.",
    roles: [4],
    minimo: true,
    pregunta: "que amorzaste hoy ?",
  },
];

const unidades = [
  {
    link: "https://docs.google.com/document/d/1pJjBACd23cLA5KZiFl6TdKYqZ4-cVV3PT0JMTJm8O-o/edit",
    titulo: "Marco general: Trabajo en comunidad",
    bloqueId: 1,
  },

  {
    link: "https://www.youtube.com/watch?v=eoXus74YL4Y&t=1s",
    titulo: "Modelo de trabajo TECHO",
    bloqueId: 1,
  },

  {
    link: "https://docs.google.com/presentation/d/15GH88eWHuZ77ZJ05i7SKsdoTdvq7KuFvVmKGCpDmHM0/edit#slide=id.g509f4839b1_0_9",
    titulo: "IOR 2020",
    bloqueId: 2,
  },

  {
    link: "https://drive.google.com/file/d/1XR-OpGxcHR_gyzJe-g6k6y8qFb8LDWqM/view",
    titulo: "Programa de voluntariado",
    bloqueId: 3,
  },

  {
    link: "https://docs.google.com/document/d/1dqWimNwOXQykgTiJNhnGT7pq_-GfVt7YAKD20-ysSp4/edit?ts=5e72628c",
    titulo: "Minimos y responsabilidades del CdC",
    bloqueId: 4,
  },

  {
    link: "https://docs.google.com/presentation/d/1NG7qd0joJgZgmrWwYWsTyalz5iqC1hStfqhyqttPXBE/edit",
    titulo: "Mesa de trabajo parte1: Encuadre",
    bloqueId: 4,
  },

  {
    link: "https://docs.google.com/presentation/d/10Ok7yvvLeggSAOmvZxfM0GYXUXU_xLzTA_-EQ-ZW_XU/edit#slide=id.g235b104dea_0_167",
    titulo: "Planificación comunitaria",
    bloqueId: 4,
  },

  {
    link: "https://drive.google.com/file/d/0B4AHQ_kthZrLOFRrZTc0c1IwLXc/view?resourcekey=0-B5Yjf3MGAlCTa_3eQl8h8Q",
    titulo: "Marco de referencia",
    bloqueId: 5,
  },
];

const seed = () => {
  console.log("SEED STARTING");

  Roles.bulkCreate(Rol)

  Sedes.bulkCreate(Sede);

  BloquesSeed.map((bloqueCreado) => {
    Bloques.create({
      titulo: bloqueCreado.titulo,
      descripcion: bloqueCreado.descripcion,
      minimo: bloqueCreado.minimo,
      pregunta: bloqueCreado.pregunta,
    }).then((bloque) => {
      for (let i = 0; i < bloqueCreado.roles.length; i++) {
        Roles.findByPk(bloqueCreado.roles[i]).then((rol) => {
          bloque.addRole(rol);
        });
      }
    });
  });

  unidades.map((unidadCreada) => {
    Unidades.create({
      link: unidadCreada.link,
      titulo: unidadCreada.titulo,
    }).then((unidad) => {
      Bloques.findByPk(unidadCreada.bloqueId).then((bloque) => {
        unidad.setBloque(bloque);
      });
    });
  });
  Users.create({
    full_name: "Juancito Admin",
    email: "admin@admin.com",
    password: "admin",
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  }).then((user) => {
    Roles.findByPk(1).then((rol) => {
      user.setRol(rol);
    });
  });

  Users.create({
    full_name: "Sergio Gestor",
    email: "gestor@gestor.com",
    password: "gestor",
    
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  }).then((user) => {
    Roles.findByPk(2).then((rol) => {
      user.setRol(rol);
      user.setSede(3)
    });
  });

  Users.create({
    full_name: "Victor Voluntario",
    email: "voluntario@voluntario.com",
    password: "voluntario",
    img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  }).then((user) => {
    Roles.findByPk(3).then((rol) => {
      user.setRol(rol);
      user.setSede(3);
    });
  });
};

seed();
