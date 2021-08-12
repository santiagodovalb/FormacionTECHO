module.exports =  (app) => {
    require('./local')(app)
    require('./google')(app)
    require('./facebook')(app)
}