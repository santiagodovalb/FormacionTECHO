const Sedes = require('../models/sedes.js')


const sedesController = {
    findAll(req,res,next){
        Sedes.findAll().then((sedes)=>{
            return res.status(200).send(sedes)
        })
        .catch(next)
    },

    findOne(req,res,next){
        const id = req.params.id
        Sedes.findByPk(id).then((sede)=>{
            return res.status(200).send(sede)
        })
        .catch(next)
    },
    createSede(req,res,next){
        Sedes.findOne({where: {nombre: req.body.nombre}}).then((encontroSede)=>{
            if(!encontroSede){
                Sedes.create(req.body).then((sede)=>{
                    return res.status(201).send(sede)
                })
                .catch(next)
            }
            else{
                return res.status(400).send({message: "Sede ya existente"})
            }
        })
        .catch(next)
       
    },
    updateSede(req,res,next){
        const id = req.params.id
        Sedes.update(req.body,{where:{id}})
        .then(()=> Sedes.findByPk(id))
        .then((sede)=>{
            return res.status(201).send(sede)
        })
        .catch(next)
    },
    deleteSede(req,res,next){
        const id = req.params.id
        Sedes.destroy({where:{id}}).then(()=>{
            res.sendStatus(204)
        })
        .catch(next)
    }
}







module.exports = sedesController;