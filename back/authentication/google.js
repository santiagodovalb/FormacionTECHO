const passport = require("passport");
const session = require("express-session");
const Users = require("../models/users");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "971364725971-qilntqti62plme9kbmbuc1ik6ilab9l9.apps.googleusercontent.com",
        clientSecret: "chn0_pMDqxKWJp4MNcP8fUMM",
        callbackURL: "http://localhost:3001/api/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        console.log("SADDSADSA",profile)
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