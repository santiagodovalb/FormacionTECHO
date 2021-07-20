const Users = require ("../models/users")
const Roles = require ("../models/roles")
const { Op } = require("sequelize");

const usersController = {
    findAll(req,res,next){
        Users.findAll({
            include: [{model: Roles, as: 'rol'}],
            where: {
                id: {
                    [Op.ne]: req.user.id
                }
            }
        })
        .then(user => res.status(200).json(user))
        .catch(next)
    },
    findOne(req,res,next){
        Users.findByPk(req.params.id,{
            include: [{model: Roles, as: 'rol'}]
        })

        .then(user => res.status(200).json(user))
        .catch(next)
    },
    findBySede(req, res, next) {
        const sedeId = req.params.id
        Users.findAll({
            where: {
                sedeId: sedeId
            }
        })
        .then(user => res.status(200).json(user))
        .catch(next)
    },
    createUser(req, res, next) {
        Users.create(req.body)
        .then(user => res.status(200).json(user))
        .catch(next)
    },
    setUser(req,res,next){
        Users.update(req.body,{
            where:{id:req.params.id},
            returning:true,
        })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(next)
    },
    deleteUser(req,res,next){
        Users.destroy({
            where:{id:req.params.id}
        })
        .then(user => res.sendStatus(204))
        .catch(next)
    },
    login(req, res, next) {
        res.send(req.user);
    },
    logOut(req, res, next) {
        req.logout();
        res.status(200).send({})
    },
    isLogged(req, res, next) {
        if (!req.user) return res.sendStatus(401);
        return res.send(req.user);
    },
}

module.exports = usersController