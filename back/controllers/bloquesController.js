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
    Bloques.findByPk(id, {include:Roles,as:"rol"})
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
    const { titulo, descripcion, minimo, rolesId } = req.body;
    Bloques.update({ titulo, descripcion, minimo }, { where: { id }, returning: true })
      .then((bloque) => {
        bloque[1][0].removeRoles([3, 4, 5]);
        for (let i = 0; i < rolesId.length; i++) {
          Roles.findByPk(rolesId[i]).then((rol) => {
            bloque[1][0].addRole(rol);
          })}
        return res.status(201).send(bloque);
      })
      .catch(next);
  },
  deleteBloque(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id;
    Bloques.destroy({ where: {id} })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  },
};

module.exports = bloquesController;
