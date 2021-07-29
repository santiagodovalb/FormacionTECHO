const Users = require("../models/users");
const Roles = require("../models/roles");
const { Op } = require("sequelize");
const { Entregas, Sedes, Bloques } = require("../models");
const bcrypt = require("bcrypt");

const usersController = {
  findAll(req, res, next) {
    Users.findAll({
      include: [{ model: Roles, as: "rol" }],
      where: {
        id: {
          [Op.ne]: req.user.id,
        },
      },
    })
      .then((user) => res.status(200).json(user))
      .catch(next);
  },
  findOne(req, res, next) {
    Users.findByPk(req.params.id, {
      include: [
        { model: Roles, as: "rol" },
        { model: Sedes, as: "sede" },
      ],
    })

      .then((user) => res.status(200).json(user))
      .catch(next);
  },
  findBySede(req, res, next) {
    const sedeId = req.params.id;
    Users.findAll({
      include: [
        { model: Roles, as: "rol" },
        {
          model: Entregas,
          as: "entregas",
          include: [{ model: Bloques, as: "bloque" }],
        },
      ],
      where: {
        sedeId: sedeId,
      },
    })
      .then((user) => res.status(200).json(user))
      .catch(next);
  },
 
  createUser(req, res, next) {
    console.log(req.body)
    Users.findOne({where:{email: req.body.email}}).then((encontroUser)=>{
      if(!encontroUser){
        Users.create(req.body)
        .then((user) => res.status(200).json(user))
        .catch(next);
      }else{
        return res.status(400).send({message:"Ya existe un usuario con ese email"})
      }
    })
    .catch(next)
    
  },
  findAllEntregas(req, res, next) {
    Users.findAll({
      include: [
        { model: Roles, as: "rol" },
        {
          model: Entregas,
          as: "entregas",
          include: [{ model: Bloques, as: "bloque" }],
        },
      ],
      where: {
        id: {
          [Op.ne]: req.user.id,
        },
      },
    })
      .then((users) => res.status(200).send(users))
      .catch(next);
  },
  setUser(req, res, next) {
    Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
      .then((user) => {
        return Users.findByPk(user[1][0].id, {
          include: [
            { model: Roles, as: "rol" },
            { model: Sedes, as: "sede" },
          ],
        });
      })
      .then((user) => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch(next);
  },
  deleteUser(req, res, next) {
    Entregas.destroy({ where: { userId: req.params.id } }).then(() => {
      Users.destroy({
        where: { id: req.params.id },
      })
        .then((user) => res.sendStatus(204))
        .catch(next);
    });
  },
  login(req, res, next) {
    res.send(req.user);
  },
  logOut(req, res, next) {
    req.logout();
    res.status(200).send({});
  },
  isLogged(req, res, next) {
    if (!req.user) return res.status(401).send({logged: false});
    return res.send(req.user);
  },
  updatePass(req, res, next) {
    Users.findByPk(req.params.id).then((userAUpdatear) => {
      bcrypt.compare(
        req.body.oldP,
        userAUpdatear.password,
        (err, result) => {
          if (result) {
            Users.update({password: req.body.newP}, {
              where: { id: req.params.id },
              returning: true,
            })
              .then((user) => {
                return Users.findByPk(user[1][0].id, {
                  include: [
                    { model: Roles, as: "rol" },
                    { model: Sedes, as: "sede" },
                  ],
                });
              })
              .then((user) => {
                res.status(200).json(user);
              })
              .catch(next);
            
          }
          else if(!result) res.status(400).send({message:"error ingrese denuevo los datos"})
        }
      );
    });
  },
};

module.exports = usersController;
