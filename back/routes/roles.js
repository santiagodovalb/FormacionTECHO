const router = require('express').Router();
const rolesController = require('../controllers/rolesController.js')

router.get('/', rolesController.findAll)
router.get('/:id', rolesController.findOne)
router.post('/', rolesController.createRole)
router.put('/:id', rolesController.updateRole)
router.delete('/:id', rolesController.deleteRole)
router.put('/set', rolesController.setUserRole)

module.exports = router