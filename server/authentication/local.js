const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const { Users, Sedes, Roles } = require("../models");

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  //Configurando passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        Users.findOne({
          where: { email: email }
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password ",
              }); 
            }
            
            user.hash(password, user.salt).then(hash => {
              if (hash !== user.password) {
                return done(null, false)
              }
              done(null, user)
            })
            
          })
          .catch(done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findByPk(id).then((user) => {
      done(null, user)});
  });
};