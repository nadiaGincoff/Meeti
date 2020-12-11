const Users = require('../models/Users');
const sendEmail = require('../handlers/emails')

exports.formCreateAccount = (req, res) => {
    res.render("create-account", {
        pageName: "Create your account"
    });
}

exports.createAccount = async (req, res) => {
    const user = req.body;
    
    req.checkBody('repeat-password', 'the confirmed password cannot be empty password ').notEmpty();
    req.checkBody('repeat-password', 'the password is different ').equals(req.body.password);

    // read express error
    const expressErrors = req.validationErrors();
    // console.log(expressErrors)

    try {
        await Users.create(user)
        
        // confirmation url
        const url = `http://${req.headers.host}/confirm-account/${user.email}`

        // Send email confirmation
        await sendEmail.sendEmail({
            user,
            url,
            subject: 'Confirm your Meeti account',
            file: 'confirm-account'
        }),

        req.flash('exito', 'We have sent an e-mail, confirm your account');
        res.redirect('/sign-in')
    } catch (error) {
        console.log(error)
        // extract error message
        const sequelizeErrors = error.errors.map(error => error.message)

        // extract only error messages
        const errExp = expressErrors.map(err => err.msg)

        // join errors
        const listErrors = [ ...sequelizeErrors, ...errExp]

        req.flash('error', listErrors);
        res.redirect('/create-account');
    }
}

// sign in form
exports.formSignIn = (req, res) => {
    res.render("sign-in", {
        pageName: "Sign in"
    });
}

// confirm user subscription
exports.confirmAccount = async (req, res, next) => {
    // verify if user exist
    const user = await Users.findOne({ where: { email: req.params.mail }})
    console.log(req.params.mail)

    // if dont exist , redirect
    if (!user) {
        req.flash('error', 'This account doesnt exist')
        res.redirect('/create-account')
        return next(); // detiene la ejectucion del middleware, se fuerza a finalizar
    }

    // if exist, confirm subscription and redirect
    user.active = 1;
    await user.save();
    req.flash('exito', 'this account has been confirmed')
    res.redirect('/sign-in')
}