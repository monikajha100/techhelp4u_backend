var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamRouter=require('./routes/team')
var pageRouter=require('./routes/page')
var workshopsRouter = require('./routes/workshops');
var contactusRouter=require('./routes/contactus');
var userinterfaceRouter = require('./routes/userinterface');
var adminloginRouter=require('./routes/adminlogin');
var speakerRouter=require('./routes/speaker')
var sponserRouter = require('./routes/speaker');

// var otprouterRouter=require('./routes/otprouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/team',teamRouter)
app.use('/page',pageRouter)
app.use('/sponser',sponserRouter)
app.use('/workshops', workshopsRouter);
app.use('/contactus', contactusRouter);
app.use('/userinterface', userinterfaceRouter);
app.use('/adminlogin',adminloginRouter)
app.use('/speaker',speakerRouter)




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
app.use(express.static(path.join(__dirname, 'build')));

// 🔥 Always LAST
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
module.exports = app;
