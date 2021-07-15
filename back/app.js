const express = require('express');
const app = express();

const db = require('./db')
const chalk = require('chalk')
const server = require('http').createServer();

//logger & parsers
require('./config')(app)

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

db.sync({force : true})
.then(createApp)
.then(createServer)
.catch(err => {
    console.log(chalk.red(err.stack))
    process.exit(1);
})
