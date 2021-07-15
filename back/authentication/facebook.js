const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;
const Users = require("../models/users");

module.exports = (app) => {
  app.use(session({ secret: "techo", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new FacebookStrategy(
      {
        clientID: "506778867053695",
        clientSecret: "b5a618be5557fac054f95c2a111a76c7",
        callbackURL: "/api/facebook/callback",
        profileFields: ["id", "email", "name", "picture"],
      },
      function (accessToken, refreshToken, profile, done) {
        Users.findOne({ where: { facebookId: profile._json.id } }).then(
          async (user) => {
            if (user) {
              return done(null, user);
            } else {
              const { first_name, last_name, email, id } = profile._json;
              const newUser = await Users.create({
                full_name: name,
                email: email,
                facebookId: id,
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
    users.findByPk(id).then((user) => done(null, user));
  });
};
