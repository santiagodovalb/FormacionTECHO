const Bloques = require('./bloques')
const Roles = require('./roles')
const Sedes = require('./sedes')
const Users = require('./users')
const Entregas = require('./entregas')
const Unidades = require('./unidades')

Users.belongsTo(Sedes, {as: 'sede'}, {foreignKey: 'sedeID'})

Users.belongsTo(Roles, {as: 'rol'}, {foreignKey: 'rolID'})

Unidades.belongsTo(Bloques, {as: 'bloque'}, {foreignKey: 'bloqueID'})

Entregas.belongsTo(Bloques, {as: 'bloque'}, {foreignKey: 'bloqueID'})

Entregas.belongsTo(Users, {as: 'user'}, {foreignKey: 'userID'})

module.exports = {Bloques, Roles, Sedes, Users, Entregas, Unidades}