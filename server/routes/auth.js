const router = require('express').Router();
const passport = require("passport");

const login = (req, res, next) => {
    res.send(req.user);
}

router.get("/facebook", passport.authenticate('facebook', { scope: ['email'] }), login)

router.get("/facebook/callback", passport.authenticate('facebook', {
        successRedirect: `/user`,
        failureRedirect:'/login'
    }))

    
router.get('/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect(`/user`);
});
    

module.exports = router