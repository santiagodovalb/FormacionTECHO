const router = require('express').Router();
const entregasController = require("../controllers/entregasController")


router.get("/aprobar/:id",entregasController.aprobar) 
router.get("/" , entregasController.findAll)
router.get("/user/:id" , entregasController.findByUser)
router.get("/sede/:id", entregasController.findBySede)
router.get("/:id",entregasController.findOne)
router.post("/", entregasController.createEntrega)
router.put("/:id",entregasController.updateEntrega) 
router.delete("/:id", entregasController.deleteEntrega) 




module.exports = router
