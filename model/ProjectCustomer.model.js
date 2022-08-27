const mongoose = require('mongoose')
    Schema = mongoose.Schema    
const AutoIncrementFactory = require('mongoose-sequence');
 
 

const AutoIncrement = AutoIncrementFactory(mongoose);

var projectCustomerSchema = new Schema({
    projectId: Number,
    accountId: Number,
    managerId: Number,
    leaderId: Number,
    advanceMoney: {
        firstTime: Number,
        secondTime: Number,
        lastTime: Number
    },
    totalMoney: Number,
    totalBudgetTeam: Number,
    startDate: Date,
    endDate: Date,
    status:{
        type: String,
        default: 'PENDING',
        enum: ['PENDING','DEVELOPMENT','APPROVED','COMPLETED']
    }

},{
    timestamps: true
})

projectCustomerSchema.plugin(AutoIncrement, {
    inc_field: 'id',
    id: 'Project_customer',
    
})
var ProjectCustomer = mongoose.model('ProjectCustomer', projectCustomerSchema)
module.exports = ProjectCustomer