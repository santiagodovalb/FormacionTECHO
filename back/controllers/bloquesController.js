const Bloques = require("../models/bloques.js");
const Roles = require("../models/roles");

const bloquesController = {
  findAll(req, res, next) {
    Bloques.findAll({include:Roles,as:"rol"})
      .then((bloques) => {
        return res.status(200).send(bloques);
      })
      .catch(next);
  },

  findOne(req, res, next) {
    const id = req.params.id;
    Bloques.findByPk(id)
      .then((bloque) => {
        return res.status(200).send(bloque);
      })
      .catch(next);
  },
  createBloque(req, res, next) {
    const { titulo, descripcion, minimo, rolesId } = req.body;
    Bloques.create({ titulo, descripcion, minimo })
      .then((bloque) => {
        for (let i = 0; i < rolesId.length; i++) {
          Roles.findByPk(rolesId[i]).then((rol) => {
            bloque.addRole(rol);
          });
        }
        return res.status(201).send(bloque);
      })
      .catch(next);
  },
  updateBloque(req, res, next) {
    const id = req.params.id;
    Bloques.update(req.body, { where: { id }, returning: true })
      .then((bloque) => {
        return res.status(201).send(bloque);
      })
      .catch(next);
  },
  deleteBloque(req, res, next) {
    const id = req.params.id;
    Bloques.destroy({ where: id })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  },
};

module.exports = bloquesController;
