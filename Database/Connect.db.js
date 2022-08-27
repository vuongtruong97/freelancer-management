const mongoose = require('mongoose')

const Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('====================================')
        console.log('Database Connected')
        console.log('====================================')
    } catch (error) {
        console.log('====================================')
        console.log('Database Error: ' + error.message)
        console.log('====================================')
    }
}
module.exports = Connect
