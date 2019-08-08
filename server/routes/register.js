var express = require('express');
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var router = express.Router();
const db=require('../model/db.js');
/* GET home page. */
router.post('/', function(req, res, next) {
    var  addSql = 'INSERT INTO user(userId,phoneNum,userName,password,sex,jobType,identityNum,address,protocol,proImg,flag) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    var  addSqlParams = [uuid.v1(), req.body.phoneNum,req.body.name, req.body.password,req.body.sex,req.body.jobType,req.body.identityNum,req.body.address,req.body.agreement,'public\\images\\ic.jpg',0];
    db.insert(addSql,addSqlParams,(err,result)=>{
        if(err){
            res.send(err);
            return
        }
        else {
            if(result.affectedRows>0){
                res.send({ success: true });
            } else{
                res.send({ success: false });
            } 
        }
  })
});

router.post('/finduser', function(req, res, next) {
    db.query(`SELECT * FROM user where phoneNum = ${req.body.phoneNum}`,(err,result)=>{
        if(err){
            res.send(err);
            return
        } else {
            console.log(result.length)
            if(result.length>0){
                res.send({ success: true });
            } else {
                res.send({ success: false });
            }
        }
  })
});

router.post('/uploadProImg', function(req, res, next) {
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/images/";
    form.parse(req, function (err, fields, files) {
        if(err){
          res.send(err);
          return
        }
        var upsql;
        if(fields.type[0]==='0'){
            upsql = 'UPDATE user SET proImg = ? WHERE userId = ?' 
        } else if(fields.type[0]==='1') {
            upsql = 'UPDATE merchat SET bgImg = ? WHERE merchatId = ?' 
        }
        console.log(upsql)
        db.update(upsql,[files.images[0].path,fields.id[0]],(err,result)=>{
            if(err){
                res.send(err);
                return
            } else {
              if(result.affectedRows>0){
                res.send({success:true})
              } else {
                res.send({success:false})
              }
            }
        });
    });
  });

module.exports = router;
