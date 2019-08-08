var express = require('express');
var uuid = require('node-uuid');
var mysql = require('mysql');
var router = express.Router();
const db=require('../model/db.js');

router.post('/collectWorNot', function(req, res, next) {
    if(req.body.flag){
        // req.body.type 1是商家 0作品
        var addSql = {
            0: 'INSERT INTO collectWork(collectWorkId,workId,userId) VALUES(?,?,?)',
            1: 'INSERT INTO collectMerchat(collMerId,merchatId,userId) VALUES(?,?,?)'
        }
      var  addSqlParams = [uuid.v1(), req.body.typeId,req.body.userId];
      db.insert(addSql[req.body.type],addSqlParams,(err,result)=>{
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
    } else {
        var  delSql = {
            0: `DELETE FROM collectWork where workId = ${mysql.escape(req.body.typeId)} and userId = ${mysql.escape(req.body.userId)}`,
            1: `DELETE FROM collectMerchat where merchatId = ${mysql.escape(req.body.typeId)} and userId = ${mysql.escape(req.body.userId)}`
        }
      db.query(delSql[req.body.type],(err,result)=>{
          if(err){
              res.send(err);
              return
          }
          else {
              if(result.affectedRows>0){
                res.send({ success: true });
              }
          }
      })
    }
    
});

router.post('/findCollectW', function(req, res, next) {
    var finSql = {
        0: `select * from collectWork where workId = ${mysql.escape(req.body.typeId)} and userId = ${mysql.escape(req.body.userId)}`,
        1: `select * from collectMerchat where merchatId = ${mysql.escape(req.body.typeId)} and userId = ${mysql.escape(req.body.userId)}`
    }
    db.query(finSql[req.body.type],(err,result)=>{
        if(err){
        console.log(err);
        res.send(err);
        return
        } else {
            if(result.length>0){
                res.send({ success: true,workInfo:result });
            } else {
                res.send({ success: false });
            }
        }
    });
});

router.post('/queryCollect', function(req, res, next) {
    var queSql2= `select w.workId,w.workTitle,w.viewImg,w.price,cw.collectWorkId from works as w RIGHT JOIN  collectWork as cw on w.workId = cw.workId  where cw.userId = ${mysql.escape(req.body.userId)} and w.flag = 0`;
    var queSql3= `select u.userName,m.bgImg,cm.merchatId,u.address,cm.collMerId from merchat as m LEFT JOIN user as u on m.userId = u.userId RIGHT JOIN collectMerchat as cm on m.merchatId = cm.merchatId where cm.userId = ${mysql.escape(req.body.userId)} and m.flag=0`;
    if(req.body.type===1){
        var queSql1= `select price,workId,viewImg,workTitle from works where merchatId =  ${mysql.escape(req.body.merchatId)} and flag=0`;
        db.queryThree(queSql1,queSql2,queSql3,(err,result)=>{
            if(err){
            console.log(err);
            res.send(err);
            return
            } else {
                res.send({ success: true,workInfo:result[0],collectW:result[1],collectM:result[2]});
            }
        });
    } else if(req.body.type===0) {
        db.queryThree(queSql2,queSql3,(err,result)=>{
            if(err){
            console.log(err);
            res.send(err);
            return
            } else {
                res.send({ success: true,collectW:result[0],collectM:result[1]});
            }
        });
    }
});

router.post('/deleteCollect', function(req, res, next) {
    // 0 删除收藏的作品 1 删除收藏的商家
    if(req.body.type===0){
        var delSql = `DELETE FROM collectWork where collectWorkId = ${mysql.escape(req.body.collectId)} `;
    } else if(req.body.type===1){
        var delSql = `DELETE FROM collectMerchat where collMerId = ${mysql.escape(req.body.collectId)} `;
    }
    db.query(delSql,function(err,result){
        if(err){
            console.log(err)
            res.send(err);
        } else {
            if(result.affectedRows>0){
                res.send({success: true})
            } else {
                res.send({success: false})
            }
        }
    });
});

  module.exports = router;