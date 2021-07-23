const S = require("sequelize");
const db = require("../db");
const Users = require("./users");
const Bloques = require("./bloques");

class Entregas extends S.Model {}

Entregas.init(
  {
    contenido: {
      type: S.STRING,
      allowNull: false,
    },
    aprobado: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, timestamps: true, modelName: "entregas" }
);

Entregas.findByUser = function (userId) {
  return Entregas.findAll({
    include: [
      {
        model: Users,
        as: "user",
      },
      {
        model: Bloques,
        as: "bloque",
      },
    ],
  }).then((entregas) =>
    entregas.filter((entrega) => entrega.user.id === userId)
  );
};

Entregas.findBySede = function (sedeId) {
  return Entregas.findAll({
    include: [
      {
        model: Users,
        as: "user",
      },
      {
        model: Bloques,
        as: "bloque",
      },
    ],
  }).then((entregas) =>
    entregas.filter((entrega) => entrega.user.sedeId === sedeId)
  );
};

Entregas.prototype.aprobar = function () {
  this.aprobado = true;
  return this.save();
};

module.exports = Entregas;
