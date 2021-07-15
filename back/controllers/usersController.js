const Users = require ("../models/users")



const usersController = {
    findAll(req,res,next){
        Users.findAll()
        .then(user => res.status(200).json(user))
        .catch(next)
    },
    findOne(req,res,next){
        Users.findByPk({
            where:{id: req.params.id}
        })
        .then(user => res.status(200).json(user))
        .catch(next)
    },
    setUser(req,res,next){
        Users.update(req.body,{
            where:{id:req.params.id},
            returning:true,
        })
        .then(user => res.status(200).json(user))
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