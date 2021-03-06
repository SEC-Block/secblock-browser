const createError = require('http-errors')
const express = require('express')
const partials = require('express-partials')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const SENRouter = require('./routes/sen')
const RPCTransfer = require('./routes/rpc-transfer')
const Forwarding = require('./routes/forwarding')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(partials())
app.use(cors())

app.use('/', indexRouter)
app.use('/sen', SENRouter)
app.use('/rpctransfer', RPCTransfer)
app.use('/market', Forwarding)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {page: 'error', title: 'BIUT Error Page'})
})

module.exports = app
