var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var Store = require('connect-mongo')(session);
var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
var mongoURI = 'mongodb://localhost:27017/db';
if(process.env.NODE_ENV === 'production'){
  apiOptions.server = "https://techifierkart.herokuapp.com/";
  mongoURI = 'mongodb://admin:Hello123@ds133353.mlab.com:33353/techifierkart';
}

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var apiAdminRouter = require('./app_api/routes/admin');

var app = express();
const option = {
  useNewUrlParser: true
};
mongoose.connect(mongoURI , option);
require('./app_server/config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysessionkey',
  resave: false , 
  saveUninitialized: false,
  store: new Store({mongooseConnection: mongoose.connection}),
  cookie: { maxAge:180*60*1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/admin', apiAdminRouter);
app.use('/user', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.adminLogin = false;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
