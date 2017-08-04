var express = require('express');
var path = require('path');

var logger = require('morgan');
//PROXY
const httpProxy = require('http-proxy');


const ejs = require('ejs');
const ejsMate = require('ejs-mate');



var app = express();
app.use('/assets',express.static(__dirname + '/public'));
//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target:'http://localhost:3001'
});
app.use('/api',(req,res)=>{
  apiProxy.web(req,res);
})
//END PROXY

// view engine setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));








app.get('*',(req,res)=>{
  res.render("index");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
