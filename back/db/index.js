const Sequelize = require("sequelize")
const dbConfig = require("../config/config.json");

const client = new Sequelize("postgres://postgres:postgres@localhost/techo", {
    logging: false,
    dialect: "postgres"
})

// const client = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//    host: dbConfig.host,
//    dialect: dbConfig.dialect,
//   })

module.exports = client;