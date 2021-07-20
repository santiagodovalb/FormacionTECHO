const router = require('express').Router();
const entregasController = require("../controllers/entregasController")


router.get("/" , entregasController.findAll)
router.get("/:id",entregasController.findOne)
router.post("/", entregasController.createEntrega)
router.put("/:id",entregasController.updateEntrega) 
router.delete("/:id", entregasController.deleteEntrega) 




module.exports = router
