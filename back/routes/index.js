const router = require('express').Router();

router.use('/auth', require('./auth'))
router.use('/roles', require('./roles'))

router.get("/me", (req, res) => {
    if (!req.user) res.sendStatus(401)
    else res.send(req.user)
  })
  
module.exports = router