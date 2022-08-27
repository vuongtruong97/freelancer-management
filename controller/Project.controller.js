const _ = require('lodash')
const Project = require('../model/Project.model')
const Account = require('../model/Account.model')
const path = require('path')
var moment = require('moment')

const dashboardLayoutPath = path.join(__dirname, '../views/layout/dashboard.ejs')

module.exports = {
    createProject: async function (req, res, next) {
        try {
            const payload = req.body
            const prject = new Project(payload)
            console.log(payload)
            const data = await prject.save()
            res.redirect('back')
        } catch (error) {
            console.log('====================================')
            console.log(error)
            console.log('====================================')
        }
    },

    getListProject: async function (req, res, next) {
        try {
            const projects = await Project.find().lean()

            const listCustomers = await Account.find({ role: 'USER' }).lean()
            const listDevs = await Account.find({
                role: { $in: ['BE_DEV', 'FE_DEV', 'DESIGNER', 'FULLSTACK'] },
            }).lean()

            res.render('pages/project', {
                data: projects,
                devs: listDevs,
                customers: listCustomers,
                moment: moment,
                title: 'Danh sách dự án',
                layout: dashboardLayoutPath,
            })
        } catch (error) {
            console.log(error)
        }
    },
}
