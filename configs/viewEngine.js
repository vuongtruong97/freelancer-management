const path = require('path')
const configViewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, '../views'))
    app.set('layout', path.join(__dirname, '../views/layout/main.ejs'))
}

module.exports = configViewEngine
