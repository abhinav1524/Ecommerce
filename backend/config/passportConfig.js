const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {
                                return done(null, user); // Pass the user object instead of true
                            } else {
                                return done(null, false, { message: 'Incorrect credentials' });
                            }
                        })
                        .catch(err => done(err)); // Handle bcrypt error
                })
                .catch(err => done(err));
        })
    );    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err); // Handle the error properly
            });
    });    
};