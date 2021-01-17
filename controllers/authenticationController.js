const passport = require('passport')

exports.authenticateUser = passport.authenticate('local', {
    successRedirect: '/administration',
    failureRedirect: '/sign-in',
    failureFlash: true,
    badRequestMessage: 'Both fields are required',
})

// review if authenticated user exist
exports.authenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    // if has not been authenticated
    return res.redirect('sign-in')
}