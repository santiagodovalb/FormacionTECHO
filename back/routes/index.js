const router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/roles', require('./roles'))
router.use('/users', require('./users'))
router.use('/sedes', require("./sedes"))
router.use("/bloques", require("./bloques"))
  
module.exports = router