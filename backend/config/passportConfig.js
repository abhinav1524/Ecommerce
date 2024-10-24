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

    passport.deserializeUser(async (id, done) => {
        try {
            console.log("Deserializing user ID:", id);
            const user = await User.findById(id); // Fetch user from DB
            console.log("User retrieved from session:", user);
            if (!user) {
                return done(new Error('User not found')); // Handle case where user is not found
            }
            done(null, user); // Attach user to request
        } catch (err) {
            console.log(err);
            done(err); // Handle the error properly
        }
    }); 
};