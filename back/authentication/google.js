const passport = require("passport");
const session = require("express-session");
const Users = require("../models/users");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        consumerKey:
          "971364725971-qilntqti62plme9kbmbuc1ik6ilab9l9.apps.googleusercontent.com",
        consumerSecret: "chn0_pMDqxKWJp4MNcP8fUMM",
        callbackURL: "http://www.example.com/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        Users.findOne({ where: { googleId: profile.id } }).then(
          async (user) => {
            if (user) {
              return done(null, user);
            } else {
              const { id, name, email } = profile;
              const newUser = await Users.create({
                full_name: name,
                email: email,
                googleId: id,
              });
              return done(null, newUser);
            }
          }
        );

        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.findByPk(id).then((user) => done(null, user));
  });
};
