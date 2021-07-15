module.exports =  (app) => {
    require('./google')(app)
    require('./facebook')(app)
    require('./local')(app)
}