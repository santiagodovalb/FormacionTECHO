const Sequelize = require("sequelize")

const client = new Sequelize("postgres://postgres:postgres@localhost/techo", {
    logging: false,
    dialect: "postgres"
})



/* const dbConfig = {
    HOST: "localhost",

USER: "root",

PASSWORD: "123456",

DB: "techo3",

dialect: "mysql",
}

const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

}) */

module.exports = client;