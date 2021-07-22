const S = require("sequelize");
const db = require("../db")

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

module.exports = Bloques