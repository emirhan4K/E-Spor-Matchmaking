const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const userRepository = require("../repositories/user.repository");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await userRepository.findById(jwt_payload.userId);

        if (user) {
          return done(null, { userId: user._id, ...user._doc });
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};