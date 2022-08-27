var express = require('express');
const ProjectCustomerController = require('../controller/ProjectCustomer.controller');
const { AuthorizationAccount, AuthenticationAccount } = require('../middleware/authetication.middleware');
const roleConstant = require('../middleware/role.constant');
var router = express.Router();
const path = require("path");
const ProjectController = require('../controller/Project.controller');
const dashboardLayoutPath = path.join(__dirname, '../views/layout/dashboard.ejs')
/* GET users listing. */
router.get('/customer', AuthenticationAccount,ProjectCustomerController.customerProject);
router.get('/manager', AuthenticationAccount,AuthorizationAccount([roleConstant.ROLES.ADMIN,roleConstant.ROLES.MANAGER]),ProjectCustomerController.manageProject);
router.get('/add-project-customer', AuthenticationAccount,(req, res, next) => {
    res.render('pages/addProjectCustomer',{
        title: 'Danh sách dự án',
        layout: dashboardLayoutPath,
    })
})
router.post('/add-project',ProjectController.createProject)
router.post('/',AuthenticationAccount,ProjectCustomerController.createProject)


router.get('/project-detail/:id',ProjectCustomerController.getDetailsProject)
module.exports = router;
