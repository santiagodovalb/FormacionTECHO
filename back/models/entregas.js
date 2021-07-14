const S = require("sequelize");
const db = require("../db")

class Entregas extends S.Model {}

Entregas.init({
    contenido: {
        type: S.STRING
    }
}, { sequelize: db, timestamps: false, modelName: "entregas" })

module.exports = Entregas