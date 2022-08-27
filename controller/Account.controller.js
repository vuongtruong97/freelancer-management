const Account = require('../model/Account.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const roleConstant = require('../middleware/role.constant')
const dashboardLayoutPath = path.join(__dirname, '../views/layout/dashboard.ejs')
const makeRandomPassword = require('../utils/makeRandomPassword')
const Email = require('../libs/nodemailer')

module.exports = {
    getListCustomer: async function (req, res, next) {
        try {
            if (req.role === roleConstant.ROLES.ADMIN) {
                const getList = await Account.find({
                    role: 'USER',
                })
                const data = []
                getList.map((item) => {
                    data.push({
                        fullName: item.fullName,
                        firstName: item.firstName,
                        phone: item.phone,
                        email: item.email,
                        status:
                            item.status === 'ACTIVE'
                                ? 'Hoạt động'
                                : item.status === 'INACTIVE'
                                ? 'Tạm ngưng'
                                : 'Khoá',
                        statusColor:
                            item.status === 'ACTIVE'
                                ? 'primary'
                                : item.status === 'INACTIVE'
                                ? 'warning'
                                : 'danger',
                        id: item.id,
                    })
                })
                res.render('pages/customer', {
                    data: data,
                    title: 'Dashboard Page',
                    layout: dashboardLayoutPath,
                })
            } else {
                const getList = await Account.find({
                    role: 'USER',
                })
                const data = []
                getList.map((item) => {
                    data.push({
                        fullName: item.fullName,
                        firstName: item.firstName,
                        phone: item.phone,
                        email: item.email,
                        status:
                            item.status === 'ACTIVE'
                                ? 'Hoạt động'
                                : item.status === 'INACTIVE'
                                ? 'Tạm ngưng'
                                : 'Khoá',
                        statusColor:
                            item.status === 'ACTIVE'
                                ? 'primary'
                                : item.status === 'INACTIVE'
                                ? 'warning'
                                : 'danger',
                        id: item.id,
                    })
                })
                res.render('pages/customer', {
                    data: data,
                    title: 'Dashboard Page',
                    layout: dashboardLayoutPath,
                })
            }
        } catch (err) {}
    },
    getListEmployees: async (req, res, next) => {
        try {
            if (req.role === roleConstant.ROLES.ADMIN) {
                const getList = await Account.find({
                    role: {
                        $in: ['MANAGER', 'BE_DEV', 'FE_DEV', 'DESIGNER', 'FULLSTACK'],
                    },
                })
                const data = []
                getList.map((item) => {
                    if (item.role === roleConstant.ROLES.BE_DEV) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            email: item.email,
                            roleName: 'BACKEND',
                            color: 'primary',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.FE_DEV) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            roleName: 'FRONT-END',
                            email: item.email,
                            color: 'success',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.DESIGNER) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            roleName: 'DESIGNER',
                            color: 'info',
                            email: item.email,
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.MANAGER) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            roleName: 'MANAGER',
                            email: item.email,
                            color: 'warning',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.FULLSTACK) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            roleName: 'FULLSTACK',
                            email: item.email,
                            color: 'dark',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    }
                })

                res.render('pages/staff', {
                    data: data,
                    title: 'Dashboard Page',
                    layout: dashboardLayoutPath,
                })
            } else {
                const getList = await Account.find({
                    role: { $in: ['BE_DEV', 'FE_DEV', 'DESIGNER'] },
                })
                const data = []
                getList.map((item) => {
                    if (item.role === roleConstant.ROLES.BE_DEV) {
                        data.push({
                            fullName: item.fullName,
                            email: item.email,
                            firstName: item.firstName,
                            roleName: 'BACKEND',
                            color: 'primary',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                        })
                    } else if (item.role === roleConstant.ROLES.FE_DEV) {
                        data.push({
                            fullName: item.fullName,
                            firstName: item.firstName,
                            roleName: 'FRONT-END',
                            email: item.email,
                            color: 'success',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.DESIGNER) {
                        data.push({
                            fullName: item.fullName,
                            roleName: 'DESIGNER',
                            firstName: item.firstName,
                            color: 'info',
                            email: item.email,
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                            phone: item.phone,
                        })
                    } else if (item.role === roleConstant.ROLES.MANAGER) {
                        data.push({
                            fullName: item.fullName,
                            roleName: 'MANAGER',
                            firstName: item.firstName,
                            phone: item.phone,
                            email: item.email,
                            color: 'warning',
                            status:
                                item.status === 'ACTIVE'
                                    ? 'Hoạt động'
                                    : item.status === 'INACTIVE'
                                    ? 'Tạm ngưng'
                                    : 'Khoá',
                            statusColor:
                                item.status === 'ACTIVE'
                                    ? 'primary'
                                    : item.status === 'INACTIVE'
                                    ? 'warning'
                                    : 'danger',
                            id: item.id,
                        })
                    }
                })
                console.log('====================================')
                console.log(data)
                console.log('====================================')
                res.render('pages/staff', {
                    data: data,
                    title: 'Dashboard Page',
                    layout: dashboardLayoutPath,
                })
            }
        } catch (error) {
            res.render('pages/maintenance')
        }
    },
    registerAccount: async (req, res, next) => {
        try {
            const payload = req.body
            const isExist = await Account.findOne({
                email: payload.email,
            })
            if (isExist) {
                req.flash('error', 'Email đã tồn tại vui lòng chọn email khác')
                return res.render('pages/register')
            }
            payload.password = await bcrypt.hashSync(payload.password, 10)
            const user = new Account(payload)
            await user.save()
            req.flash('success', 'Chúc mừng bạn đăng ký thành công tài khoản')
            return res.render('pages/register')
        } catch (e) {
            console.log('====================================')
            console.log(e)
            console.log('====================================')
            res.render('pages/maintenance')
        }
    },
    loginAccount: async (req, res, next) => {
        try {
            const { password, email } = req.body
            const isExist = await Account.findOne({ email })
            if (!isExist) {
                req.flash('error', 'Email hoặc mật khẩu không đúng'),
                    res.render('pages/login')
            }
            if (isExist.status === 'BLOCKED') {
                req.flash('error', 'Tài khoản của bạn đang bị khoá'),
                    res.render('pages/login')
            }
            const match = await bcrypt.compareSync(password, isExist.password)
            if (match) {
                const payload = {
                    userId: isExist.id,
                    role: isExist.role,
                }
                const token = await jwt.sign(payload, process.env.SECRET_TOKEN)
                res.cookie('token', token)
                req.flash('success', 'Đăng nhập thành công')
                res.redirect('/dashboard/index')
            }
        } catch (error) {
            res.render('pages/maintenance')
        }
    },
    getProfile: async function (req, res, next) {
        try {
            const UserId = req.userId
            const user = await Account.findOne({
                id: UserId,
            })
            res.render('pages/accountSettings', {
                title: 'Dashboard Page',
                data: user,
                layout: dashboardLayoutPath,
            })
        } catch (error) {
            res.render('pages/maintenance')
        }
    },
    updateProfile: async function (req, res, next) {
        try {
            const payload = req.body
            const UserId = req.userId
            const user = await Account.findOne({
                id: UserId,
            })
            const update = await Account.updateOne(
                {
                    id: UserId,
                },
                payload
            )
            if (!update || upload.nModified < 1) {
                req.flash('error', 'Cập nhật tài khoản thất bại')
                res.render('pages/profile', { data: user })
            }
            req.flash('success', 'Cập nhật tài khoản thành công')
            res.redirect('/profile')
        } catch (error) {
            res.render('pages/maintenance')
        }
    },
    getSettings: function (req, res, next) {
        try {
            res.render('pages/settingPassword', {
                title: 'Dashboard Page',
                layout: dashboardLayoutPath,
            })
        } catch (error) {}
    },
    settings: async function (req, res) {
        try {
            const id = req.userId
            const payload = req.body
            const findId = await Account.findOne({ id })
            const match = await bcrypt.compareSync(payload.password, findId.password)
            if (match) {
                const updateSetting = await Account.findOneAndUpdate(
                    {
                        id,
                    },
                    {
                        password: await bcrypt.hashSync(payload.Newpassword, 10),
                    }
                )
                if (!updateSetting || updateSetting.nModified < 1) {
                    req.flash('error', 'Cập nhật thất bại')
                    res.render('pages/settingPassword', {
                        title: 'Dashboard Page',
                        layout: dashboardLayoutPath,
                    })
                }
                req.flash('success', 'Cập nhật thành công')
                res.render('pages/settingPassword', {
                    title: 'Dashboard Page',
                    layout: dashboardLayoutPath,
                })
            }
            req.flash('error', 'Cập nhật thất bại')
            res.render('pages/settingPassword', {
                title: 'Dashboard Page',
                layout: dashboardLayoutPath,
            })
        } catch (error) {
            console.log('====================================')
            console.log(error)
            console.log('====================================')
            res.render('pages/maintenance')
        }
    },
    logOut: async function (req, res, next) {
        try {
            delete req.headers.authorization
            res.clearCookie('token')
            res.cookie('token', '')
            res.redirect('/')
        } catch (error) {
            res.render('pages/maintenance')
        }
    },
    updateRoleandStatus: async function (req, res, next) {
        try {
            const { id, status, role } = req.body

            const user = await Account.findOne({ id: id })

            if (!user) {
                req.flash('error', 'Không tìm thấy nhân viên')
                res.redirect('back')
            }

            Object.assign(user, { id, status, role })
            console.log('UPDATE', user)

            await user.save()
            res.redirect('back')
        } catch (error) {
            console.log(error)
            res.render('pages/maintenance')
        }
    },
    addEmployee: async function (req, res, next) {
        try {
            const { name, email, firstName, lastName, fullName, role } = req.body

            const userRole = req.role

            if (
                role === roleConstant.ROLES.MANAGER &&
                userRole !== roleConstant.ROLES.ADMIN
            ) {
                req.flash('error', 'Bạn không được phép thêm Manager')
                return res.redirect('back')
            }

            const isExist = await Account.findOne({ email })
            if (isExist) {
                req.flash('error', 'Email đã tồn tại vui lòng chọn email khác')
                res.locals.error = 'asfd'
                return res.redirect('back')
            }
            const password = makeRandomPassword(8)

            const hashedPass = bcrypt.hashSync(password, 10)

            const user = new Account({
                name,
                email,
                firstName,
                lastName,
                fullName,
                role,
                password: hashedPass,
            })

            const payload = password
            const mailer = new Email(user, payload)

            mailer.sendWellCome()

            await user.save()

            res.redirect('back')
        } catch (error) {
            console.log(error)
            res.render('pages/maintenance')
        }
    },
}
