var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var sd = require('silly-datetime');
var mysql = require('mysql');
const db=require('../model/db.js');


router.post('/playReserve', function(req, res, next) {
    var  addSql
    var  addSqlParams
    var id = uuid.v1()
    if(req.body.itemId){
      addSql = 'INSERT INTO reservation(reservaId,itemId,reserveDate,reserveNum,orderTime,orderType,userId,workId,merchatId,totalTime) VALUES(?,?,?,?,?,?,?,?,?,?)';
      addSqlParams = [id, req.body.itemId,req.body.reserveTime,req.body.reserveNum,sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),0,req.body.userId,req.body.workId,req.body.merchatId,req.body.totalTime];
    } else {
      addSql = 'INSERT INTO reservation(reservaId,reserveDate,reserveNum,orderTime,orderType,userId,workId,merchatId,totalTime) VALUES(?,?,?,?,?,?,?,?,?)';
      addSqlParams = [id,req.body.reserveTime,req.body.reserveNum,sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),0,req.body.userId,req.body.workId,req.body.merchatId,req.body.totalTime];
    }
    db.insert(addSql,addSqlParams,(err,result)=>{
        if(err){
            res.send(err);
            return
        }
        else {
            if(result.affectedRows>0){
                res.send({ success: true,info:{reserveId:id,workId:req.body.workId  }});
            } else{
                res.send({ success: false });
            } 
        }
  })
});

router.post('/selectReserve', function(req, res, next) {
  // 00 特定的根据reservaId和workId
  // 11选择用户全部的根据userId
  // 12选择用户待接单的根据userId和orderType
  // 13选择用户已接单的根据userId和orderType
  // 14选择用户已完成的根据userId和orderType
  // 15选择用户已取消的根据userId和orderType
  // 16选择用户未完成的根据userId和orderType
  // 17选择用户对应商家提出的取消的根据userId和orderType 21
  // 22选择商家的全部根据merchatId
  // 22选择商家待接单的根据merchatId和orderType
  // 23选择商家已接单的根据merchatId和orderType
  // 24选择商家已完成的根据merchatId和orderType
  // 25选择商家已取消的根据merchatId和orderType
  // 26选择商家未完成的根据merchatId和orderType
  // 27选择商家对应的用户提出来的取消根据merchatId和orderType 22
     var selSql = {
       0: `select * from(select re.*,c.commentId,u.userName,u.phoneNum from reservation as re LEFT JOIN comment as c on re.reservaId = 
            c.reservaId LEFT JOIN user as u on re.userId = u.userId where re.reservaId = ${mysql.escape(req.body.rid)})as r LEFT JOIN
            (select works.workTitle,works.viewImg,works.price,works.workId,works.serviceWay from works
            where workId = ${mysql.escape(req.body.wid)})as w ON r.workId = w.workId`,
        11: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)}`,
        12: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 0`,
        13: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 1`,
        14: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
             as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 3`,
        15: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 2`,
        16: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 4`,
        17: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.userId = ${mysql.escape(req.body.tid)} and r.orderType = 21`,
        21: `select r.reservaId,r.workId,r.reserveDate,r.orderType,r.userId,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}`,
        22: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 0`,
        23: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,r.acceptTime,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 1`,
        24: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,r.acceptTime,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
             as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 3`,
        25: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 2`,
        26: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
            as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 4`,
        27: `select * from(select r.reservaId,r.workId,r.reserveDate,r.userId,r.orderType,w.workTitle,w.viewImg,w.price,w.serviceWay,u.userName,u.phoneNum from reservation 
              as r LEFT JOIN works as w on r.workId = w.workId LEFT JOIN user as u on r.userId = u.userId where r.merchatId = ${mysql.escape(req.body.tid)} or r.userId = ${mysql.escape(req.body.uid)}) as ur where ur.orderType = 22`
     }
  db.query(selSql[req.body.type],(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
      return
    } else {
        res.send({ success: true,orderInfo:result });
    }
  });
});

router.post('/updateOrderType', function(req, res, next) {
    var aptime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if(req.body.type===1){
      var upsql = 'UPDATE reservation SET orderType = ?,acceptTime = ? WHERE reservaId = ?'
      var upParams = [req.body.type,aptime,req.body.reserveId]
    } else {
      var upsql = 'UPDATE reservation SET orderType = ? WHERE reservaId = ?'
      var upParams = [req.body.type,req.body.reserveId]
    }
    db.update(upsql,upParams,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
        if(result.affectedRows>0){
          res.send({success:true,time: aptime})
        } else {
          res.send({success:false})
        }
      }
    })
  });

router.post('/checkReserTime', function(req, res, next) {
  db.query(`select reserveDate,DATE_ADD(reserveDate,INTERVAL totalTime*60 MINUTE) as newDate from reservation where workId = ${mysql.escape(req.body.workId)} and orderType in (0,1)`,(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
      return
    } else {
        res.send({ success: true,workTimes:result });
    }
  });
});

router.post('/uploadComplaint', function(req, res, next) {
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "./public/images/";
  form.parse(req, function (err, fields, files) {
      if(err){
          res.send(err);
      }
      var imgArr = [];
      if(files.images){
          files.images.forEach(function(i){
              //获取临时文件的存储路径
              var uploadTmpPath=i.path;
              imgArr.push(uploadTmpPath)
         });
      }
      var imgStr = imgArr.join(',');
     var comSql = 'INSERT INTO complaint(cpContent,cpimg,reservaId,workId,userId,flag,cpTime) VALUES(?,?,?,?,?,?,?)';
     var comSqlParams = [fields.content[0],imgStr,fields.reservaId[0], fields.workId[0],fields.userId[0],0,sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')];
    db.insert(comSql,comSqlParams,(err,result)=>{
      if(err){
          console.log('投诉失败');
          return
      }
      else {
          if(result.affectedRows>0){
            res.send({success: true});
          } else {
            console.log('投诉失败')
            res.send({success: false});
          }
        }
    })   
  });
});

module.exports = router;
