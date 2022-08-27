const jwt = require('jsonwebtoken')
const AuthenticationAccount = async (req, res, next) => {
    try {
        // console.log('====================================');
        const token =
            req.cookies.token || req.headers.authorization.replace('Bearer ', '')
        // console.log('====================================');
        // console.log(token);
        // console.log('====================================');
        if (!token) {
            res.redirect('/')
        }
        const decode = await jwt.decode(token)
        if (!decode) {
            res.redirect('/')
        }
        // console.log('====================================');
        // console.log(decode);
        // console.log('====================================');
        req.userId = decode.userId
        req.role = decode.role
        res.locals.username = 'Luật Nguyễn'
        next()
    } catch (error) {
        res.render('pages/maintenance')
    }
}
const AuthorizationAccount = (role) => {
    return (req, res, next) => {
        if (role.includes(req.role) === true) {
            return next()
        }
        return res.send('AnUthorization Account')
    }
}
module.exports = {
    AuthenticationAccount,
    AuthorizationAccount,
}
