const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const Keys = require("./keys");
const Usuario = require("../models/apiModel");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = Keys.secretOrKey;

  passport.use(
    "jwt-users",
    new JwtStrategy(opts, (jwt_payload, done) => {
      users.getById(jwt_payload.id, (err, users) => {
        if (err) {
          return done(err, false);
        }
        if (users) {
          return done(null, users);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
