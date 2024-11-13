const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = function(passport) {
    // Local strategy for username and password verification
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                return isMatch ? done(null, user) : done(null, false, { message: 'Incorrect credentials' });
            } catch (err) {
                return done(err);
            }
        })
    );

    // JWT strategy for token verification
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET
            },
            async (jwtPayload, done) => {
                try {
                    const user = await User.findById(jwtPayload.id);
                    return user ? done(null, user) : done(null, false);
                } catch (err) {
                    return done(err, false);
                }
            }
        )
    );
};
