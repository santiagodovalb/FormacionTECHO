const express = require('express');
const app = express();
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require('./db')
const models = require('./models')
const chalk = require('chalk')
const server = require('http').createServer();

//Evita problemas con el acceso CORS cuando hacemos peticiones AJAX desde un front a un back con puertos diferentes.
app.use(cors());

//Permite ver en la consola los request del cliente y los reponses del servidor
app.use(volleyball);

//Convierte los body request en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Permite configurar cookies en nuestro servidor
app.use(cookieParser());

//logins
require('./authentication')(app)

//redirigimos todos los pedidos con /api
app.use('/api', require('./routes'))

//error endware. Para que se active este endware es necesario que todas las rutas manejen el next(err) ya que express entiende que un .use() con un solo parametro es un error endware.
app.use((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
})


const createApp = () => {
    server.on('request', app)
}

const createServer = () => {
    const PORT = 3001;
    server.listen(PORT, () => {
        console.log(chalk.magenta('Server listen on port', chalk.blue(PORT)))
    })
}

db.sync({force : false})
.then(createApp)
.then(createServer)
.catch(err => {
    console.log(chalk.red(err.stack))
    process.exit(1);
})
