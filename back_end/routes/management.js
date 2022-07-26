var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var order_overview = require('./management/order_overview.js');
var order_detail = require('./management/order_detail.js');
var user_overview = require('./management/user_overview.js');
var user_detail = require('./management/user_detail.js');
var inventory_overview_product = require('./management/inventory_overview_product.js');


app.use('/order_overview', order_overview);
app.use('/user_overview', user_overview);
app.use('/inventory_overview_product', inventory_overview_product);
app.use('/user_detail', user_detail);
app.use('/order_detail', order_detail);

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
