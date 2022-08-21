const userModel = require('../models/userModel')
function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;
    
    if (req.cookies && req.cookies.userEmail) {
        let emailInCookie = req.cookies.userEmail
        let userFromCookie = userModel.getUserByField('email', emailInCookie)
        
        if (userFromCookie) {
            delete userFromCookie.password
            req.session.userLogged = userFromCookie
        }
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true
    }


    next()
}

module.exports = userLoggedMiddleware