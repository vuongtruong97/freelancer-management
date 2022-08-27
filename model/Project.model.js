const mongoose = require('mongoose')
Schema = mongoose.Schema
const AutoIncrementFactory = require('mongoose-sequence')

const AutoIncrement = AutoIncrementFactory(mongoose)

var ProjectSchema = new Schema({
    name: {
        type: String,
    },
    customer: { type: Number, ref: 'Account', required: true },
    devs: [{ type: Number, ref: 'Account' }],
    buget: { type: Number },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        default: 'PENDING',
        enum: ['SHEDULED', 'PENDING', 'RUNNING', 'COMPLETED'],
    },
})

ProjectSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'Project' })
var Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
