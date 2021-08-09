const express = require('express');
const app = express();
const path = require('path');

//logger & parsers
require('./config')(app)

//logins
require('./authentication')(app)

//redirigimos todos los pedidos con /api
app.use('/api', require('./routes'))

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

/* app.use(express.static("./build")) */

//error endware. Para que se active este endware es necesario que todas las rutas manejen el next(err) ya que express entiende que un .use() con un solo parametro es un error endware.
app.use((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
})

module.exports = app
