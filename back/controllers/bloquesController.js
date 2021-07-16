const Bloques = require('../models/bloques.js')




const bloquesController ={
    findAll(req,res,next){
        Bloques.findAll().then((bloques)=>{
            return res.status(200).send(bloques)
        })
        .catch(next)
    },

    findOne(req,res,next){
        const id = req.params.id
        Bloques.findByPk(id).then((bloque)=>{
            return res.status(200).send(bloque)
        })
        .catch(next)
    },
    createBloque(req,res,next){
        Bloques.create(req.body).then((bloque)=>{
            return res.status(201).send(bloque)
        })
        .catch(next)
    },
    updateBloque(req,res,next){
        const id = req.params.id
        Bloques.update(req.body,{where:{id},returning:true}).then((bloque)=>{
            return res.status(201).send(bloque)
        })
        .catch(next)
    },
    deleteBloque(req,res,next){
        const id = req.params.id
        Bloques.destroy({where:id}).then(()=>{
            res.sendStatus(204)
        })
        .catch(next)
    }

}



module.exports = bloquesController;