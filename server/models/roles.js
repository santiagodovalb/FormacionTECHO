const S = require("sequelize");
const db = require("../db")

class Roles extends S.Model {}

Roles.init({
    tipo: {
        type: S.STRING,
        allowNull: false
    }
}, { sequelize: db, timestamps: false, modelName: "roles" })

module.exports = Roles