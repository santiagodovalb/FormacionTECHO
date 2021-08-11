const Bloques = require('./bloques')
const Roles = require('./roles')
const Sedes = require('./sedes')
const Users = require('./users')
const Entregas = require('./entregas')
const Unidades = require('./unidades')

Users.belongsTo(Sedes, {as: 'sede'}, {foreignKey: 'sedeID'})

Users.belongsTo(Roles, {as: 'rol'}, {foreignKey: 'rolID'})

Unidades.belongsTo(Bloques, {as: 'bloque'}, {foreignKey: 'bloqueID'})
Bloques.hasMany(Unidades, {as: 'unidades'}, {foreignKey: 'unidadId'})

Bloques.belongsToMany(Roles,{through:"bloques_rol"})
Roles.belongsToMany(Bloques,{through:"bloques_rol"})

Entregas.belongsTo(Bloques, {as: 'bloque'}, {foreignKey: 'bloqueID'})

Users.hasMany(Entregas, {as: 'entregas'})
Entregas.belongsTo(Users, {as: 'user'}, {foreignKey: 'userID'})

module.exports = {Bloques, Roles, Sedes, Users, Entregas, Unidades}