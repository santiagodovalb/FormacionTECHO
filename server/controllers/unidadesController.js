const Unidades = require('../models/unidades.js')
const Bloques = require('../models/bloques.js')

const unidadesController = {
    
    findAll(req,res,next){
        const bloque = req.params.id
        Unidades.findAll({where:{bloqueId: bloque}})
        .then((unidades)=>{
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
        const {link,titulo,bloqueId} = req.body
        Unidades.create({link,titulo}).then((unidad)=>{
           return Bloques.findByPk(bloqueId).then((bloque)=>{
                unidad.setBloque(bloque)
                return res.status(201).send(unidad)
            })
            .catch(next)
        })
    },
    updateUnidad(req,res,next){
        const id = req.params.id
        Unidades.update(req.body,{where:{id}}).then(()=>{
            return Unidades.findByPk(id)    
        })
        .then((unidad)=> res.status(200).send(unidad))
        .catch(next)
    },
    deleteUnidad(req,res,next){
        const id = req.params.id
        Unidades.destroy({where:{id}}).then(()=>{
            res.sendStatus(204)
        })
        .catch(next)
    },



}





module.exports = unidadesController;