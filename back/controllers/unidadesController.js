const Unidades = require('../models/unidades.js')
const Bloques = require('../models/bloques.js')






const unidadesController = {
    findAll(req,res,next){
        Unidades.findAll({where:{bloqueId: req.body.bloqueId}}).then((unidades)=>{
            return res.status(200).send(unidades)
        })
        .catch(next)
    },
    findOne(req,res,next){
        const id = req.params.id
        Unidades.findByPk(id).then((unidad)=>{
            return res.status(200).send(unidad)
        })
        .catch(next)
    },
    createUnidad(req,res,next){
        const {link,titulo,descripcion,bloqueId} = req.body
        Unidades.create({link,titulo,descripcion}).then((unidad)=>{
           return Bloques.findByPk(bloqueId).then((bloque)=>{
                unidad.setBloque(bloque)
                return res.status(201).send(unidad)
            })
            .catch(next)
        })
    },
    updateUnidad(req,res,next){
        const id = req.params.id
        Unidades.update(req.body,{where:{id},returning:true}).then((unidad)=>{
            return res.status(201).send(unidad)
        })
        .catch(next)
    },
    deleteUnidad(req,res,next){
        const id = req.params.id
        Unidades.destroy({where:id}).then(()=>{
            res.sendStatus(204)
        })
        .catch(next)
    },



}





module.exports = unidadesController;