const Sequelize = require("sequelize")
const dbConfig = require("../config/config.json");

const client = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
   host: dbConfig.host,
   dialect: dbConfig.dialect,
   port: dbConfig.port
  })

module.exports = client;