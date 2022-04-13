var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config({path: ".env"})
var cookieParser = require('cookie-parser');
const Session = require('./config/SessionConn')
var logger = require('morgan');
const flash = require('connect-flash')
const passport = require('passport');
var cors = require('cors')

const passportConfig = require('./passport/passport')

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users')
var indexRouter = require('./routes/index')
var uploadRouter = require('./routes/upload')

var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();
app.use(cookieParser('1q2w3e4r~!'));
app.use(Session)

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/api/auth', authRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
