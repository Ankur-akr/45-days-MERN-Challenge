const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'replace_with_secret'
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub).select('-password');
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = { jwtStrategy };
