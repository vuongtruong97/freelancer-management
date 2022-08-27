const mongoose = require('mongoose')
Schema = mongoose.Schema
const AutoIncrementFactory = require('mongoose-sequence')

const AutoIncrement = AutoIncrementFactory(mongoose)
var AccountSchema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    birthday: Date,
    avatar: String,
    email: String,
    phone: String,
    password: String,
    origin_address: {
        detail: String,
        province: String,
        wards: String,
    },
    current_address: {
        detail: String,
        province: String,
        wards: String,
    },
    indentify: {
        front: String,
        back: String,
    },
    startDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
        default: 'ACTIVE',
    },
    updateInfoBy: [],
    role: {
        type: String,
        enum: ['ADMIN', 'MANAGER', 'BE_DEV', 'FE_DEV', 'USER', 'DESIGNER', 'FULLSTACK'],
        default: 'USER',
    },
})

AccountSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'Account' })
var Account = mongoose.model('Account', AccountSchema)
module.exports = Account
