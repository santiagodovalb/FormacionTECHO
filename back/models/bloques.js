const S = require("sequelize");
const db = require("../db")
const Roles = require('../models/roles')

class Bloques extends S.Model {}

Bloques.init({
    titulo: {
        type: S.STRING,
        allowNull: false
    },
    descripcion: {
        type: S.STRING,
        allowNull: false
    },
    minimo: {
        type: S.BOOLEAN
    },
    pregunta:{
        type: S.STRING,
    }
}, { sequelize: db, timestamps: false, modelName: "bloques" })

Bloques.findByRol = (rolId) => {
    return Bloques.findAll({include: [{model: Roles}]})
    .then(bloques => bloques.filter((bloque) => bloque.roles.map((rol) => rol.id).includes(rolId)))
}

module.exports = Bloques