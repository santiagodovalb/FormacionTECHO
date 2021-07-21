const { Entregas, Users, Bloques } = require("../models");

const entregasController = {
  findAll(req, res, next) {
    Entregas.findAll({
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
    })
      .then((entregas) => res.status(200).send(entregas))
      .catch(next);
  },
  findByUser(req, res, next) {
      Entregas.findByUser(parseInt(req.params.id))
        .then((entregas) => res.status(200).send(entregas))
        .catch(next);
    },
  findBySede(req, res, next) {
    Entregas.findBySede(parseInt(req.params.id))
    .then(entregas => res.status(200).send(entregas))
    .catch(next)
  },
  findOne(req, res, next) {
    const id = req.params.id;
    Entregas.findByPk(id, {
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
    })
      .then((entrega) => res.status(200).send(entrega))
      .catch(next);
  },
  createEntrega : async (req, res, next) => {
    const {contenido, bloqueId, userId}  = req.body
    let currentEntrega = await Entregas.findOne({where: {bloqueId, userId}});

    if(currentEntrega){ 
      currentEntrega.update({ contenido });
    }
    else {
      currentEntrega = await Entregas.create({ contenido })
    }

    currentEntrega.setUser(userId)
    currentEntrega.setBloque(bloqueId)
    res.status(201).send(currentEntrega)

  },
  aprobar(req, res, next){
    Entregas.findByPk(req.params.id)
    .then(entrega => entrega.aprobar())
    .then(() => res.sendStatus(200))
    .catch(next)
  },
  updateEntrega(req,res,next){
      const {contenido,aprobado} = req.body
    Entregas.update({contenido,aprobado},{where: {id:req.params.id},returning:true}).then((entrega)=>{    
        return res.status(201).send(entrega[1][0])
    })
    .catch(next)
  },
  deleteEntrega(req,res,next){
      Entregas.destroy({where:{id:req.params.id}}).then(()=>{
          return res.sendStatus(204)
      })
      .catch(next)
  },
};

module.exports = entregasController;
