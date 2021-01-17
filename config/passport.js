const passport = require('passport')
const LocalStrategy = require('passport-local')
const Users = require('../models/Users')

// Passport is Express-compatible authentication middleware for Node.js.

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, next) => {
        // this code execute when llenas form
        const user = await Users.findOne({ where: { email, active: 1 }});

        //review if exist
        if(!user) return next(null, false, {
            message: 'Your account has not been confirmed, please check your email'
        });

        // if exist
        const verificatePass = user.validatePassword(password);

        // if incorrect password
        if(!verificatePass) return next(null, false, {
            message: 'Incorrect password'
        });

        return next(null, user)
    }
))

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

module.exports = passport;