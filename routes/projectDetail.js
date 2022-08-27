var express = require('express')
const ProjectCustomerController = require('../controller/ProjectCustomer.controller')
var router = express.Router()


/* GET users listing. */
router.get('/:id',ProjectCustomerController.getDetailsProject)
// router.post('/login', AccountController.loginAccount)

module.exports = router
