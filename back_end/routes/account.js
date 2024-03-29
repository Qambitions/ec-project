var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var login = require('./account/login');
var signup = require('./account/signup');
var autologin = require('./account/autologin');
var logout = require('./account/logout');
var user_info = require('./account/user_info');
var change_password = require('./account/change_password');
var add_new_address = require('./account/add_new_address');
var add_comment = require('./account/add_comment');

app.use('/login', login);
app.use('/signup', signup);
app.use('/autologin', autologin);
app.use('/logout', logout);
app.use('/user_info', user_info);
app.use('/change_password', change_password);
app.use('/add_new_address', add_new_address);
app.use('/add_comment', add_comment);

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
