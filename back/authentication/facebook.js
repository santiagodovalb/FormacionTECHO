const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;
const { Users, Sedes, Roles } = require("../models");
require('dotenv').config()
const { FACEBOOK_CLIENT, FACEBOOK_SECRET } = process.env

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "email", "name", "picture"],
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("ASDADS",profile)
        Users.findOne({ where: { facebookId: profile._json.id }, include: [{model: Sedes, as: 'sede'}, {model: Roles, as: 'rol'}]}).then(
          async (user) => {
            if (user) {
              return done(null, user);
            } else {
              const { last_name, first_name, email, id } = profile._json;
              const img = profile.photos[0].value
              const newUser = await Users.create({
                full_name: first_name + last_name,
                email: email,
                facebookId: id,
                img: img,
              });
              return done(null, newUser);
            }
          }
        );
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findByPk(id).then((user) => done(null, user));
  });
};
