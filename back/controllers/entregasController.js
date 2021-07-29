const { sendNewEntrega, sendEntregaCompletada } = require("../config/transporter");
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
    let currentEntrega = await Entregas.findOne({where: {bloqueId, userId}, include: [{model: Users, as: 'user'}, {model: Bloques, as: 'bloque'}]});

    try {

    if(currentEntrega){ 
      await currentEntrega.update({ contenido, aprobado: false });
      let gestores =  await Users.findAll({where: {sedeId: currentEntrega.user.sedeId, rolId: 2}})
      console.log("GESTORES", gestores)
      gestores.forEach(gestor => sendNewEntrega(gestor, currentEntrega))
    }
    else {
      currentEntrega = await Entregas.create({ contenido })
      await currentEntrega.setUser(userId)
      await currentEntrega.setBloque(bloqueId)
      let entregaInclude = await Entregas.findOne({where: {id: currentEntrega.id}, include: [{model: Users, as: 'user'}, {model: Bloques, as: 'bloque'}]})
      let gestores =  await Users.findAll({where: {sedeId: entregaInclude.user.sedeId, rolId: 2}})
      console.log("GESTORES", gestores)
      gestores.forEach(gestor => sendNewEntrega(gestor, entregaInclude))
    }
    res.status(201).send(currentEntrega)
    }
    
    catch(err) {next(err)}
  },
  aprobar(req, res, next){
    Entregas.findByPk(req.params.id, {include: [{model: Users, as: 'user'}, {model: Bloques, as: 'bloque'}]})
    .then(entrega => {
      entrega.aprobar()
      let voluntario = entrega.user
      sendEntregaCompletada(voluntario, entrega)
    })
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
