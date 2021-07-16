const router = require('express').Router();
const sedesController = require('../controllers/sedesController.js')

router.get("/" , sedesController.findAll)
router.get("/:id",sedesController.findOne)
router.post("/", sedesController.createSede)
router.delete("/:id",sedesController.deleteSede) 
router.put("/:id", sedesController.deleteSede) 


module.exports= router;

