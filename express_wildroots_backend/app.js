var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//MongoDB connection strings
mongoose.connect(
  process.env.MONGO__ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is  Connected"));

//const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://iledesma:thirteen13@cluster0.csatm.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// 'mongodb+srv://Exodus-Cyber:Password1@cluster0.ol4ue.mongodb.net/Wild-roots-blog?retryWrites=true&w=majority', {useNewUrlParser: true}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cookingRouter = require('./routes/cooking');
var gardeningRouter = require('./routes/gardening');
var contactRouter = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// in production never have this set up for cors
app.use(cors());
app.use(bodyParser.json());

// app.use('/', routes);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/gardening', gardeningRouter);
app.use('/cooking', cookingRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are in!')
  // we're connected!
});


module.exports = app;
