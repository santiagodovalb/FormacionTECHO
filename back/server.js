const chalk = require("chalk");
const db = require("./db");
const models = require("./models");
const server = require("http").createServer();
require("dotenv").config();
const { SERVER_PORT } = process.env;

const createApp = () => {
  const app = require("./app");
  server.on("request", app);
};

const createServer = () => {
  const PORT = SERVER_PORT;
  server.listen(PORT, () => {
    console.log(chalk.magenta("Server listen on port", chalk.blue(PORT)));
  });
};

db.sync({ force: true })
  .then(createApp)
  .then(createServer)
  .catch((err) => {
    console.log(chalk.red(err.stack));
    process.exit(1);
  });
