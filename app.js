var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin_module');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');
var userRouter = require('./routes/user_module/home');
var userbooklistRouter = require('./routes/user_module/book_list');
var userbookdetailsRouter = require('./routes/user_module/book_details');
var userprofileRouter = require('./routes/user_module/profile');
var searchprofileRouter = require('./routes/user_module/search_profile');
var borrowedRouter = require('./routes/user_module/borrowed_books');
var booknameRouter = require('./routes/user_module/book_name');
var bookauthorRouter = require('./routes/user_module/book_author');
var bookisbnRouter = require('./routes/user_module/book_isbn');
var searchnameRouter = require('./routes/user_module/search_book_name');
var searchauthorRouter = require('./routes/user_module/search_book_author');
var searchisbnRouter = require('./routes/user_module/search_book_isbn');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/books', adminRouter);
app.use('/update',updateRouter);
app.use('/delete',deleteRouter);
app.use('/user',userRouter);
app.use('/userbooklist',userbooklistRouter);
app.use('/userbookdetails',userbookdetailsRouter);
app.use('/profile',userprofileRouter);
app.use('/searchprofile',searchprofileRouter);
app.use('/borrowed',borrowedRouter);
app.use('/bookname',booknameRouter);
app.use('/bookauthor',bookauthorRouter);
app.use('/bookisbn',bookisbnRouter);
app.use('/searchname',searchnameRouter);
app.use('/searchauthor',searchauthorRouter);
app.use('/searchisbn',searchisbnRouter);




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
