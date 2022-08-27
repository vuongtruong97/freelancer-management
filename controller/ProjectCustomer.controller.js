const roleConstant = require("../middleware/role.constant");
const ProjectCustomer = require("../model/ProjectCustomer.model");
const _ = require('lodash')
const path = require("path");
const Account = require("../model/Account.model");
const Project = require("../model/Project.model");
const asyncForEach = require('async-await-foreach') 
const dashboardLayoutPath = path.join(__dirname, '../views/layout/dashboard.ejs')
const moment = require('moment');
module.exports = {
    getDetailsProject: async function (req, res, next) {
        try{
            const {id} = req.params;
            const user =  await Account.findOne({
                id
            }).select('-_id fullName firstName').lean()
            const projectAccount =  await ProjectCustomer.find({
                accountId: id,
            }).lean()
            const data = []
             await asyncForEach(projectAccount,async (item)=>{
                const project =  await Project.findOne({
                    accountId: id,
                }).lean()
                const ProjectManager =  await Account.findOne({
                    id: item.managerId,
                }).lean()
                const Manager =  await Account.findOne({
                    id: item.leaderId,
                }).lean()
                data.push({
                    projectId: item.projectId,
                    projectName: project.projectName,
                    accountId: item.accountId,
                    accountName: user.fullName?user.fullName:user.fistName,
                    leaderId: item.leaderId,
                    leaderName: Manager.fullName?Manager.fullName:Manager.fistName,
                    managerId: item.managerId,
                    manageName: ProjectManager.fullName?ProjectManager.fullName:ProjectManager.firstName,
                    advanceMoney: { firstTime: item.advanceMoney.firstTime,secondTime:item.advanceMoney.secondTime??0 ,lastTime:item.advanceMoney.lastTime??0},
                    totalMoney: item.totalMoney,
                    status: item.status,
                    startDate:item.startDate ? moment(item.startDate).format('DD:MM:YYYYY hh:mm:ss'):'-',
                    endDate: item.endDate ? moment(item.endDate).format('DD:MM:YYYYY hh:mm:ss'):'-',
                    createdAt:item.createdAt,
                    updatedAt: item.updatedAt,
                    id: item.id
                })
            })
            res.render('pages/projectCustomerDetail',{
                title: 'Danh sách dự án',
                data: data,
                layout: dashboardLayoutPath,
            })
        }catch(err){

        }
    },
    createProject: async function(req,res,next){
        try{
            const payload = req.body;
            payload.managerId= req.userId; 
            const project = new ProjectCustomer(payload);
            await project.save()
            res.status(200).json(project);
        }catch(e){
            console.log('====================================');
            console.log(e);
            console.log('====================================');
        }
    },
    manageProject : async function(req,res,next){
        try {
            if(req.role === roleConstant.ROLES.ADMIN){
                const findProject = await ProjectCustomer.find().lean()
                console.log('====================================');
                console.log(findProject);
                console.log('====================================');
                return res.render('pages/listProjectCustome',{
                    title: 'Danh sách dự án',
                    layout: dashboardLayoutPath,
                })
            }else {
                
                const findProject = await ProjectCustomer.find({
                    leaderId: req.userId
                })
                const result = findProject.map((item)=>{
               
                    return {
                        projectId: item.projectId,
                        accountId: item.accountId,
                        managerId: item.managerId,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        status: item.status,
                        id: item.id,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                    }
                })
                return res.send(result);
            }
        } catch (error) {
            
        }
           
    },
    customerProject: async function(req,res,next){
        try{
            const findProject = await ProjectCustomer.find({
                accountId: req.userId
            })
            const result = findProject.map((item)=>{
               
            return {
                projectId: item.projectId,
                accountId: item.accountId,
                managerId: item.managerId,
                startDate: item.startDate,
                endDate: item.endDate,
                advanceMoney: {
                    firstTime: item.advanceMoney.firstTime,
                    secondTime: item.advanceMoney.secondTime,
                    lastTime: item.advanceMoney.lastTime
                },
                totalMoney: item.totalMoney,
                status: item.status,
                id: item.id,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
               
               
            })
            return res.send(result);
        }catch(err){

        }
    }
}