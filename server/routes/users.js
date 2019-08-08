var express = require('express');
var mysql = require('mysql');
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var router = express.Router();
const db=require('../model/db.js');

/* GET users listing. */
  router.post('/checkUser', function(req, res, next) {
    db.query(`SELECT * FROM merchat where userId = ${mysql.escape(req.body.userId)}`,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          if(result.length>0){
              res.send({ success: true,merchatInfo:result[0] });
          } else {
              res.send({ success: false });
          }
      }
    })
  });
  router.post('/joinUs', function(req, res, next) {
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/images/";
    form.parse(req, function (err, fields, files) {
        if(err){
          res.send(err);
          return
        }
        db.query(`SELECT * FROM apply where userId = ${mysql.escape(fields.userId[0])}`,(err,result)=>{
          if(err){
            res.send(err);
            return
          } else {
              if(result.length>0){
                  res.send({ success: false,message: '请勿多次申请' });
              } else {
                  var imgArr = [];
                  files.images.forEach(function(i){
                      //获取临时文件的存储路径
                      var uploadTmpPath=i.path;
                      imgArr.push(uploadTmpPath)
                });
                var  addSql = 'INSERT INTO apply(name,identityNum,idenImgInfr,idenImgBack,licenseImg,deviceImg,userId,flag,bgImg) VALUES(?,?,?,?,?,?,?,?,?)';
                var  addSqlParams = [fields.name[0],fields.identityNum[0], imgArr[0],imgArr[1],imgArr[2],imgArr[3],fields.userId[0],0,'public\\images\\bg.jpg'];
                db.insert(addSql,addSqlParams,(err,result)=>{
                  if(err){
                      res.send(err);
                      console.log(err)
                      return
                  }
                  else {
                      if(result.affectedRows>0){
                          res.send({ success: true, message: '申请提交成功' });
                      } else{
                          res.send({ success: false, message: '申请提交失败' });
                      } 
                  }
                });
              }
          }
        })
    });
  });

  router.post('/checkMerchat', function(req, res, next) {
    var selMer = `select * from works where merchatId = (select merchatId from merchat
       where userId = ${mysql.escape(req.body.userId)}) AND workId = ${mysql.escape(req.body.workId)}`
    db.query(selMer,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          if(result.length>0){
              res.send({ result:true });
          } else {
              res.send({ result: false });
          }
      }
    })
  });

  router.post('/updateUserInfo', function(req, res, next) {
    var upsql;
    var upParams;
    if(req.body.tag===0){
      upsql = 'UPDATE user SET userName = ?,sex = ?,jobType = ?,identityNum = ?,address = ? WHERE userId = ?';
      upParams = [req.body.name,req.body.sex,req.body.jobType,req.body.identityNum,req.body.address,req.body.userId];
    } else if (req.body.tag ===1 ){
      upsql = 'UPDATE user SET userName = ?,password = ?,sex = ?,jobType = ?,identityNum = ?,address = ? WHERE userId = ?';
      upParams = [req.body.name,req.body.password,req.body.sex,req.body.jobType,req.body.identityNum,req.body.address,req.body.userId];
    }
    db.update(upsql,upParams,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
        if(result.affectedRows>0){
          if(req.body.password){
            req.session.user.password = req.body.password
          }
          req.session.user.userName = req.body.name
          req.session.user.sex = req.body.sex
          req.session.user.jobType = req.body.jobType
          req.session.user.identityNum = req.body.identityNum
          req.session.user.address = req.body.address
          res.send({success:true})
        } else {
          res.send({success:false})
        }
      }
    })
  });

  router.post('/deleteUser', function(req, res, next) {
    var upu = `update user set flag = 1 where userId = '${req.body.userId}'`;
    var upu2 = `update works set flag = 1 where merchatId = (select merchatId from merchat where userId = '${req.body.userId}')`;
    db.queryTwo(upu,upu2,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result[0].affectedRows>0){
          res.send({ success: true});
        } else {
          res.send({ success: false});
        }
      }
    })
  });

module.exports = router;
