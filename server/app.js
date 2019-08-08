const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require("express-session");
const db=require('./model/db.js');
const schedule = require('node-schedule');

var reserveRouter = require('./routes/reserve');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var commentRouter = require('./routes/comment');
var worksRouter = require('./routes/works');
var merchatRouter = require('./routes/merchat');
var collectRouter = require('./routes/collect');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization'],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 保存session在数据库
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  rolling:true,
  cookie:{
  maxAge:60*1000*60*24
  }
  }))
app.use(express.static(path.join(__dirname, '/')));

app.use('/users/reserve', reserveRouter);
app.use('/users/check', usersRouter);
app.use('/users/register', registerRouter);
app.use('/users/comment', commentRouter);
app.use('/users/release', worksRouter);
app.use('/users/marchat', merchatRouter);
app.use('/users/collect', collectRouter);
app.use('/users/admin', adminRouter);


// catch 404 and forward to error handler
  app.post('/login', function(req, res, next) {
    db.query(`select * from user where phoneNum = ${req.body.iphone}`,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result.length>0){
          if(result[0].flag===1){
            res.send({ success: false,message:'该用户已被注销' });
          } else {
            if(req.body.password===result[0].password){
              req.session.user = result[0];
              res.send({ success: true ,info: result[0]});
            } else {
              res.send({ success: false,message:'密码输入错误' });
            }
          }
        } else {
          res.send({ success: false,message:'该用户不存在' });
        }
      }
    })
  });

  app.get('/getUserInfo', function(req, res, next) {
    var info = req.session.user
    if(info){
      res.send({userInfo: info})
    } else {
      res.send({userInfo: null})
    }
  });

  app.get('/exit', function(req, res, next) {
    req.session.destroy();
    res.send({success:true});
  });

  const  scheduleUpdateReserve = ()=>{
    //每天的23时59分59秒定时执行一次，更新一下预约表如果处于待接单和已接单状态而又过了预约时间则改变状态为未完成
      schedule.scheduleJob('59 59 23 * * *',()=>{
        db.update('update reservation set orderType = ? where orderType in (0,1) and unix_timestamp(now()) > unix_timestamp(reserveDate)',4,(err,result)=>{
          if(err){
            res.send(err);
            return
          }
        })
      }); 
  }
  
  scheduleUpdateReserve();


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
  res.send('error');
});

module.exports = app;
