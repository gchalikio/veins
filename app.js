var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//View Router
var indexRouter = require('./app/routes/index');
//API routers
var mongoRouter = require('./app/routes/mongo.route');
var mssqlRouter = require('./app/routes/mssql.route');
var fbaseRouter = require('./app/routes/fbase.route');
var mysqlRouter = require('./app/routes/mysql.route');
var oracleRouter = require('./app/routes/oracle.route');
var postgreRouter = require('./app/routes/postgre.route');

var app = express();

//initialise Database Configurations
// -- DO NOT REMOVE --
var initConnections = require('./app/config/init');
initConnections.init();
// -- DO NOT REMOVE --

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//View Router
app.use('/', indexRouter);
//API Routers
app.use('/mongo', mongoRouter); //u can rename your routes
app.use('/mssql', mssqlRouter);
app.use('/fbase', fbaseRouter);
app.use('/mysql', mysqlRouter);
app.use('/oracle', oracleRouter);
app.use('/postgre', postgreRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;