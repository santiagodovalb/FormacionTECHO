const Roles = require('../models/roles.js')
const Users = require('../models/users.js')

const rolesController = {

    findAll(req, res, next) {
        Roles.findAll()
        .then(roles => res.status(200).json(roles))
        .catch(next)
    },

    createRole(req, res, next) {
        Roles.create(req.body)
        .then(role => res.status(201).json(role))
        .catch(next)
    },

    updateRole(req, res, next) {
        Roles.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(role => res.status(204).json(role))
        .catch(next)
    },

    deleteRole(req, res, next) {
        Roles.destroy({
            where: req.params.id
        })
        .then(() => res.status(204))
    },

    setUserRole(req, res, next) {
        const id = req.body.userId
        const rol = req.body.rolId
        const userRole = req.user.rolId
        const userLogged = req.user

        if (rol === 1) throw 'Permission denied'
        if (userRole === 2 && rol <= 2) throw 'Permission denied'
        Users.findByPk({where:{id}})
        .then((user)=>{
            user.setRol(rol)
            res.status(201)
        })
        .catch(next)
    }
}

module.exports = rolesController