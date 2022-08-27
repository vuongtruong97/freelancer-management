const express = require('express')
const path = require('path')
const AccountController = require('../controller/Account.controller')
const ProjectController = require('../controller/Project.controller')

const {
    AuthenticationAccount,
    AuthorizationAccount,
} = require('../middleware/authetication.middleware')
const router = express.Router()

const dashboardLayoutPath = path.join(__dirname, '../views/layout/dashboard.ejs')

router.get('/index', AuthenticationAccount, function (req, res, next) {
    res.render('pages/dashboard', {
        title: 'Trang quản trị',
        layout: dashboardLayoutPath,
    })
})

router.get('/project', ProjectController.getListProject)

router.get(
    '/user',
    AuthenticationAccount,
    AuthorizationAccount(['ADMIN', 'MANAGER']),
    AccountController.getListEmployees
)
router.get('/customer', AccountController.getListCustomer)

router.get('/button', function (req, res, next) {
    res.render('pages/buttons', {
        title: 'Dashboard Page',
        layout: dashboardLayoutPath,
    })
})
router.get('/layout5', function (req, res, next) {
    res.render('pages/modals', {
        title: 'Dashboard Page',
        layout: dashboardLayoutPath,
    })
})

router.get('/account-pages', AuthenticationAccount, AccountController.getProfile)

module.exports = router
