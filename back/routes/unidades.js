const router = require('express').Router();
const unidadesController = require('../controllers/unidadesController.js')

router.get("/" , unidadesController.findAll)
router.get("/:id",unidadesController.findOne)
router.post("/", unidadesController.createUnidad)
router.delete("/:id",unidadesController.deleteUnidad) 
router.put("/:id", unidadesController.updateUnidad) 





module.exports = router;