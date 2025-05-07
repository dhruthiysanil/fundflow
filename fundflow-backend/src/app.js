require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authRoutes = require("./routes/authRoutes");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors')
const {authMiddleware} = require('./middleware/authMiddleware');

const multer = require("multer");
const { fileURLToPath } = require("url");
const fs = require("fs");

// ES module dirname equivalent
// const __dirname = path.dirname(__filename)








var app = express();



let corsOptions = {
  origin : ['http://localhost:3000'],
}
app.use(cors(corsOptions))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use('/api',authMiddleware, indexRouter);
// app.use('/users', usersRouter);
app.use("/auth", authRoutes);

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
