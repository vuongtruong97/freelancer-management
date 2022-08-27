var express = require('express')
const AccountController = require('../controller/Account.controller')
const ProjectController = require('../controller/Project.controller')
const {
    AuthenticationAccount,
    AuthorizationAccount,
} = require('../middleware/authetication.middleware')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/login')
})
router.post('/', AccountController.loginAccount)
router.get('/register', function (req, res, next) {
    res.render('pages/register')
})
router.get('/profile', AuthenticationAccount, AccountController.getProfile)
router.post('/register', AccountController.registerAccount)
router.get('/settings', AuthenticationAccount, AccountController.getSettings)
router.post('/settings', AuthenticationAccount, AccountController.settings)
router.get('/logOut', AuthenticationAccount, AccountController.logOut)
router.post(
    '/update-role-status',
    AuthenticationAccount,
    AccountController.updateRoleandStatus
)
router.post('/add-project', ProjectController.createProject)
router.post('/add-employee', AuthenticationAccount, AccountController.addEmployee)
module.exports = router
