const S = require("sequelize");
const db = require("../db")

class Unidades extends S.Model {}

Unidades.init({
    link: {
        type: S.STRING,
        allowNull: false
    },
    titulo: {
        type: S.STRING,
        allowNull: false
    },
    descripcion: {
        type: S.STRING,
        allowNull: false
    }
}, { sequelize: db, timestamps: false, modelName: "unidades" })

module.exports = Unidades