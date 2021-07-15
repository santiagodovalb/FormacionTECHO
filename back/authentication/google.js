const passport = require("passport");
const session = require("express-session");
const Users = require("../models/users");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const { GOOGLE_CLIENT, GOOGLE_SECRET } = process.env

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:3001/api/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        Users.findOne({ where: { googleId: profile.id } }).then(
          async (user) => {
            if (user) {
              return done(null, user);
            } else {
              const { name, email, picture } = profile._json;
              const id = profile.id
              const newUser = await Users.create({
                full_name: name,
                email: email,
                googleId: id,
                img: picture,
              });
              return done(null, newUser);
            }
          }
        );

        /* Users.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        }); */
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
