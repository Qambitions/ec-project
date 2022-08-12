var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var purchase_overview = require('./management/purchase_overview.js');
var purchase_detail = require('./management/purchase_detail.js');
var order_overview = require('./management/order_overview.js');
var order_detail = require('./management/order_detail.js');
var user_overview = require('./management/user_overview.js');
var user_detail = require('./management/user_detail.js');
var inventory_overview_product = require('./management/inventory_overview_product.js');
var inventory_detail_product = require('./management/inventory_detail_product.js');
var main_dashboard = require('./management/main_dashboard.js');
var create_po = require('./management/create_po.js');
var list_branch = require('./management/list_branch.js');
var list_supplier = require('./management/list_supplier.js');
var add_item = require('./management/add_item.js');

app.use('/purchase_detail', purchase_detail);
app.use('/purchase_overview', purchase_overview);
app.use('/order_overview', order_overview);
app.use('/user_overview', user_overview);
app.use('/inventory_overview_product', inventory_overview_product);
app.use('/inventory_detail_product', inventory_detail_product);
app.use('/user_detail', user_detail);
app.use('/order_detail', order_detail);
app.use('/main', main_dashboard);
app.use('/create_po', create_po);
app.use('/list_branch', list_branch);
app.use('/list_supplier', list_supplier);
app.use('/add_item', add_item);

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
