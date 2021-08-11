const router = require('express').Router();
const bloquesController = require('../controllers/bloquesController.js')


router.get("/" , bloquesController.findAll)
router.get("/:id",bloquesController.findOne)
router.post("/", bloquesController.createBloque)
router.put("/:id",bloquesController.updateBloque) 
router.delete("/:id", bloquesController.deleteBloque) 




module.exports = router;