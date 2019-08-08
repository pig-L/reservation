var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var sd = require('silly-datetime');
var uuid = require('node-uuid');
var mysql = require('mysql');
var cid;
const db=require('../model/db.js');

router.post('/uploadContent', function(req, res, next) {
    cid = uuid.v1();
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
       var comSql = 'INSERT INTO comment(commentId,content,ontime,attitude,quality,commentDate,reservaId,userId) VALUES(?,?,?,?,?,?,?,?)';
       var comSqlParams = [cid,fields.content[0],fields.onTime[0], fields.attitude[0],fields.quality[0],sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),fields.reserveId[0],fields.userId[0]];
       var comImg = "INSERT INTO commentImg(cimgId,cimgUrl,commentId) VALUES ?";
       var cImg =[];
      for(let i=0;i<imgArr.length;i++){
        cImg.push([uuid.v1(),imgArr[i],cid])
      }
      if(imgArr.length>0){
        db.insertTwo(comSql,comSqlParams,comImg,[cImg],(err,result)=>{
            if(err){
                console.log('上传失败');
                return
            }
            else {
                if(result[0].affectedRows>0&&result[1].affectedRows>0){
                  res.send({success: true,cid:cid});
                } else {
                  console.log('上传失败')
                  res.send({success: false});
                }
              }
          })
      } else{
        db.insert(comSql,comSqlParams,(err,result)=>{
            if(err){
                console.log('上传失败');
                return
            }
            else {
                if(result.affectedRows>0){
                  res.send({success: true,cid:cid});
                } else {
                  console.log('上传失败')
                  res.send({success: false});
                }
              }
          })
      }
       
    });
});

router.post('/queryComment', function(req, res, next) {
  var queComment = `select c.*,u.userName,u.proImg,ci.cimgId,group_concat(ci.cimgUrl) as imgData from comment as 
                c RIGHT JOIN user as u on c.userId = u.userId LEFT JOIN commentImg as ci 
                on c.commentId = ci.commentId where c.userId = ${mysql.escape(req.body.userId)} 
                GROUP BY c.commentId`;
  var queWork = `select c.commentId,i.itemContent,w.workTitle,w.price,w.viewImg,w.workId from reservation as r 
                LEFT JOIN works as w on w.workId = r.workId LEFT JOIN itemSet as i on r.itemId = i.itemId
                RIGHT JOIN comment as c on r.reservaId = c.reservaId where c.userId = ${mysql.escape(req.body.userId)} 
                GROUP BY c.commentId`;
    db.queryTwo(queComment,queWork,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          res.send({ success: true,commentData: result[0],workData: result[1]});   
      }
    });
});

router.post('/queryWorkComment', function(req, res, next) {
  // 0查询全部评论 1查询好评 2查询中评 3查询差评 4查询右图的评论
  var quwc = {
    0: `select c.commentId,r.workId,u.userName,u.proImg,c.commentDate,c.content,group_concat(ci.cimgUrl) as imgData from 
        comment as c LEFT JOIN user as u on c.userId = u.userId LEFT JOIN commentImg as ci on 
        c.commentId = ci.commentId LEFT JOIN reservation as r on c.reservaId = r.reservaId GROUP BY c.commentId 
        HAVING r.workId = ${mysql.escape(req.body.workId)} `,
    1: `select c.commentId,r.workId,u.userName,u.proImg,c.commentDate,c.quality+c.attitude as grade,c.content,group_concat(ci.cimgUrl) as imgData from 
        comment as c LEFT JOIN user as u on c.userId = u.userId LEFT JOIN commentImg as ci on 
        c.commentId = ci.commentId LEFT JOIN reservation as r on c.reservaId = r.reservaId GROUP BY c.commentId 
        HAVING r.workId = ${mysql.escape(req.body.workId)} and grade >8`,
    2: `select c.commentId,r.workId,u.userName,u.proImg,c.quality+c.attitude as grade,c.commentDate,c.content,
        group_concat(ci.cimgUrl) as imgData from comment as c LEFT JOIN user as u on c.userId = u.userId 
        LEFT JOIN commentImg as ci on c.commentId = ci.commentId LEFT JOIN reservation as r on c.reservaId = r.reservaId GROUP BY c.commentId 
        HAVING r.workId = ${mysql.escape(req.body.workId)} and grade BETWEEN 6 and 8`,
    3: `select c.commentId,r.workId,u.userName,u.proImg,c.quality+c.attitude as grade,c.commentDate,c.content,
        group_concat(ci.cimgUrl) as imgData from comment as c LEFT JOIN user as u on c.userId = u.userId 
        LEFT JOIN commentImg as ci on c.commentId = ci.commentId LEFT JOIN reservation as r on c.reservaId = r.reservaId GROUP BY c.commentId 
        HAVING r.workId = ${mysql.escape(req.body.workId)} and grade < 6`,
    4:  `select c.commentId,r.workId,u.userName,u.proImg,c.commentDate,c.content,group_concat(ci.cimgUrl) as imgData from 
        comment as c LEFT JOIN user as u on c.userId = u.userId LEFT JOIN commentImg as ci on 
        c.commentId = ci.commentId LEFT JOIN reservation as r on c.reservaId = r.reservaId GROUP BY c.commentId 
        HAVING r.workId = ${mysql.escape(req.body.workId)} and imgData is not null`,
  };
  db.query(quwc[req.body.type],(err,result)=>{
    if(err){
      res.send(err);
      return
    } else {
        res.send({ success: true,commentData:result});   
    }
  });
});

router.post('/queryCommentNum', function(req, res, next) {
    var queC1 = `select COUNT(c.commentId) as num from reservation as r RIGHT JOIN comment as c on 
                r.reservaId = c.reservaId where r.workId = ${mysql.escape(req.body.workId)}`;
    var queC2 = `select COUNT(c.commentId) as num from reservation as r RIGHT JOIN comment as c on 
                r.reservaId = c.reservaId where r.workId = ${mysql.escape(req.body.workId)}
                and c.quality > 4 and c.attitude > 4`;
    var queC3 = `select COUNT(c.commentId) as num from reservation as r RIGHT JOIN comment as c on 
                r.reservaId = c.reservaId where r.workId = ${mysql.escape(req.body.workId)}
                and c.quality < 3 and c.attitude < 3`;
    db.queryThree(queC1,queC2,queC3,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          res.send({ success: true,allComment: result[0],goodComment: result[1],badComment: result[2]});   
      }
    })
});

module.exports = router;
