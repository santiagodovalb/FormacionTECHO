const Bloques = require("../models/bloques.js");
const Roles = require("../models/roles");
const Unidades = require("../models/unidades");
const Entregas = require("../models/entregas");

const bloquesController = {
  findAll(req, res, next) {
    Bloques.findAll({
      include: [{ model: Roles }, { model: Unidades, as: "unidades" }],
    })
      .then((bloques) => {
        return res.status(200).send(bloques);
      })
      .catch(next);
  },

  findOne(req, res, next) {
    const id = req.params.id;
    Bloques.findByPk(id, {
      include: [{ model: Roles }, { model: Unidades, as: "unidades" }],
    })
      .then((bloque) => {
        return res.status(200).send(bloque);
      })
      .catch(next);
  },
  findByRol(req, res, next) {
    Bloques.findByRol(req.params.id)
    .then(bloques => res.status(200).send(bloques))
    .catch(next)
  },
  createBloque(req, res, next) {
    const { titulo, descripcion, minimo, pregunta, rolesId } = req.body;
    Bloques.create({ titulo, descripcion, minimo, pregunta })
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
    const { titulo, descripcion, minimo, pregunta, rolesId } = req.body;
    Bloques.update(
      { titulo, descripcion, minimo, pregunta },
      { where: { id } }
    )
      .then(()=> Bloques.findByPk(id))
      .then((bloque) => {
        bloque.removeRoles([3, 4, 5]);
        for (let i = 0; i < rolesId.length; i++) {
          Roles.findByPk(rolesId[i]).then((rol) => {
            bloque.addRole(rol);
          });
        }
        return res.status(201).send(bloque);
      })
      .catch(next);
  },
  deleteBloque(req, res, next) {
    const id = req.params.id;
    Entregas.destroy({ where: { bloqueId: id } })
      .then(() => {
        Unidades.destroy({ where: { bloqueId: id } });
      })
      .then(() => {
        Bloques.destroy({ where: { id } }).then(() => {
          res.sendStatus(204);
        });
      })
      .catch(next);
  },
};

module.exports = bloquesController;
