const router = require("express").Router();
const passport = require("passport")
const usersController = require("../controllers/usersController")


router.get('/me', usersController.isLogged)
router.post("/login", passport.authenticate("local"), usersController.login);
router.post("/logout", usersController.logOut)
router.post('/create', usersController.createUser)
router.get("/:id", usersController.findOne)
router.put("/:id", usersController.setUser)
router.delete("/:id", usersController.deleteUser)
router.get('/sede/:id', usersController.findBySede)
router.get("/",usersController.findAll)

module.exports = router