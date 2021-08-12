const Sequelize = require("sequelize")
require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;


// const client = new Sequelize("postgres://postgres:postgres@localhost/techo", {
//     logging: false,
//     dialect: "postgres"
// })

const client = new Sequelize(DB_DATABASE,DB_USERNAME, DB_PASSWORD, {
   host: DB_HOST,
   port: DB_PORT,
   dialect: 'mysql',
  })

module.exports = client;