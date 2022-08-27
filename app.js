require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var flash = require('express-flash')
var session = require('express-session')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var projectDRouter = require('./routes/projectDetail')
var manageRouter = require('./routes/manageProject')
var dashboardRouter = require('./routes/dashboard')
const Connect = require('./Database/Connect.db')
const configViewEngine = require('./configs/viewEngine')
const expressLayouts = require('express-ejs-layouts')
Connect()
var app = express()

// view engine setup
configViewEngine(app)

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressLayouts)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// express-session
// app.use(cookieParser('keyboard cat'));
app.use(
    session({
        secret: 'ABandsdsd@!',
        resave: false,
        saveUninitialized: true,
    })
)
app.use(flash())

app.use('/detail-project', projectDRouter)
app.use('/manage-project', manageRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/dashboard', dashboardRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('pages/page404')
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('pages/error')
})

module.exports = app
