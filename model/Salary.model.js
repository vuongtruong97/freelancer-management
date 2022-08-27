const mongoose = require('mongoose')
    Schema = mongoose.Schema    
const AutoIncrementFactory = require('mongoose-sequence');
 
 

const AutoIncrement = AutoIncrementFactory(mongoose);
 
var SalarySchema = new Schema({
    ProjectId: Number,
    accountId: Number,
    advanceMoney: Number,
    amountProject: Number,
    totalAmountProject: Number,
    completeDateProject: Date,
    status: {
        type: String,
        enum: ['COMPLETED', 'PENDING'],
        default: 'PENDING',
    }
},{
    timestamps: true
});
 
SalarySchema.plugin(AutoIncrement, {
    inc_field: 'id',
 
    id:'Salary'
});
var Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;