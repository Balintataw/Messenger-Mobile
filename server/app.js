var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// required for uploading images to amaon s3 bucket
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
// var AWS = require('aws-sdk/dist/aws-sdk-react-native');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// AWS.config.update({
//     // Your SECRET ACCESS KEY from AWS should go here,
//     // Never share it!
//     // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
//     // secretAccessKey: "ab7786ad6",
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     // Not working key, Your ACCESS KEY ID from AWS should go here,
//     // Never share it!
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     // accessKeyId: "ab7786ad6",
//     region: 'us-east-1' // region of your bucket
// });

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'messagingpp-20190202095441-deployment',
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })
  
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(3001, function() {
    console.log('listening on port 3001')
})

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
