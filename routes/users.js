var express = require('express')
var router = express.Router()
const AccountController = require('../controller/Account.controller')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})
// router.post('/login', AccountController.loginAccount)

module.exports = router
