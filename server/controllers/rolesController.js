const Roles = require("../models/roles.js");
const Users = require("../models/users.js");

const rolesController = {
  findAll(req, res, next) {
    Roles.findAll()
      .then((roles) => res.status(200).json(roles))
      .catch(next);
  },

  findOne(req, res, next) {
    Roles.findByPk(req.params.id)
      .then((rol) => res.status(200).json(rol))
      .catch(next);
  },

  createRole(req, res, next) {
    Roles.findOne({ where: { tipo: req.body.tipo } })
      .then((rolEncontrado) => {
        if (!rolEncontrado) {
          Roles.create(req.body)
            .then((role) => {
              res.status(201).json(role);
            })
            .catch(next);
        } else {
          return res.status(400).send({ message: "El rol ya existe" });
        }
      })
      .catch(next);
  },

  updateRole(req, res, next) {
    Roles.update(req.body, {
      where: {
        id: req.params.id,
      },
      
    })
      .then(()=> Roles.findByPk(req.params.id))
      .then((role) => res.status(204).json(role))
      .catch(next);
  },

  deleteRole(req, res, next) {
    const id = req.params.id;
    Roles.destroy({
      where: { id },
    })
      .then(() => res.sendStatus(204))
      .catch(next);
  },

  setUserRole(req, res, next) {
    const id = req.body.userId;
    const rolId = req.body.rolId;
    const userRole = req.body.user.rolId;

    if (rolId === 1) throw "Permission denied";
    if (userRole === 2 && rolId <= 2) throw "Permission denied";

    Users.findByPk(id)
      .then((user) => {
        Roles.findByPk(rolId).then((rol) => {
          user.setRol(rol);
          res.sendStatus(201);
        });
      })
      .catch(next);
  },
};

module.exports = rolesController;
