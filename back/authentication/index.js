module.exports =  (app) => {
    require('./google')(app)
    require('./facebook')(app)
}