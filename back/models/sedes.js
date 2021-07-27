const S = require("sequelize");
const db = require("../db")

class Sedes extends S.Model {}

Sedes.init({
    nombre: {
        type: S.STRING,
        allowNull: false
    },
    comunidadId: {
        type: S.INTEGER
    }
}, { sequelize: db, timestamps: false, modelName: "sedes" })

module.exports = Sedes