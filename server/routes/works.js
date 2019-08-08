var express = require('express');
var uuid = require('node-uuid');
var mysql = require('mysql');
var multiparty = require('multiparty');
var sd = require('silly-datetime');
var router = express.Router();
var wid ;
const db=require('../model/db.js');

router.post('/upLoadWorks',function(req,res,next){
  wid = uuid.v1();
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "./public/images/";
  form.parse(req, function (err, fields, files) {
      if(err){
        res.send(err);
        return
      }
        var imgArr = [];
        files.images.forEach(function(i){
            //获取临时文件的存储路径
            var uploadTmpPath=i.path;
            imgArr.push(uploadTmpPath)
      });
      var  addSql = 'INSERT INTO works(workId,workTitle,freeService,price,request,serviceType,serviceWay,enableDate,enableEDate,connextWay,releaseTime,merchatId,viewImg,totalTime,limitNum,flag) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      var  addSqlParams = [wid,fields.title[0],fields.service[0], fields.price[0],fields.request[0],fields.type[0],fields.way[0],fields.sDate[0],fields.eDate[0],fields.connextWay[0],sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),fields.merchatId[0],imgArr[0],fields.totalTime[0],fields.limitNum[0],0];
      var sql_2 = "INSERT INTO workImg(wImgId,imgUrl,workId) VALUES ?";
      var ve =[]
      for(let i=0;i<imgArr.length;i++){
        ve.push([uuid.v1(),imgArr[i],wid])
      }
      if(fields.item!=undefined){
        var sql_3 = "INSERT INTO itemSet(itemId,itemContent,workId) VALUES ?";
        var vd =[]
        for(let i=0;i<fields.item.length;i++){
          vd.push([uuid.v1(),fields.item[i],wid])
        }
        db.insertThree(addSql,addSqlParams,sql_2,[ve],sql_3,vd,(err,result)=>{
          if(err){
              console.log('err');
              return
          }
          else {
              if(result[0].affectedRows>0&&result[1].affectedRows>0&&result[2].affectedRows>0){
                res.send({success: true,rid:wid});
              } else {
                console.log('上传失败')
                res.send({success: false});
              }
            }
        })
      } else {
        db.insertTwo(addSql,addSqlParams,sql_2,[ve],(err,result)=>{
          if(err){
              console.log('上传失败');
              return
          }
          else {
              if(result[0].affectedRows>0&&result[1].affectedRows>0){
                res.send({success: true,rid:wid});
              } else {
                console.log('上传失败')
                res.send({success: false});
              }
            }
        })
      }
  });
});

router.post('/findWork', function(req, res, next) {
  var sql_1 = `select * from(select w.*,u.address from works as w LEFT JOIN merchat as m on w.merchatId = m.merchatId 
  LEFT JOIN user as u on m.userId = u.userId) as a where a.workId = ${mysql.escape(req.body.id)}`
  db.query(sql_1,(err,result)=>{
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

router.post('/findWorkImg', function(req, res, next) {
  db.query(`SELECT * FROM workImg where workId = ${mysql.escape(req.body.id)}`,(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
      return
    } else {
        if(result.length>0){
            res.send({ success: true,workImgInfo:result });
        } else {
            res.send({ success: false });
        }
    }
  });
});

router.post('/findWorkItem', function(req, res, next) {
  db.query(`SELECT * FROM itemSet where workId = ${mysql.escape(req.body.id)}`,(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
      return
    } else {
        if(result.length>0){
            res.send({ success: true,workItemInfo:result });
        } else {
            res.send({ success: false });
        }
    }
  });
});


router.post('/selectWorks', function(req, res, next) {
  // 1 按类型查询 2 按类型再分价格从低到高 3 按照下单量来排序  4 按分类再按价格区间 5按分类再按大于某个价格
  // 6 按标题模糊匹配 7 按最新发布 8 按时间来筛选
  var selectSql = {
    1: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
        w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
        as r on w.workId = r.workId where w.flag=0 GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
         LEFT JOIN user as u on m.userId = u.userId where a.serviceType = '${req.body.type}'`,
    2: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
      w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
      as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
       LEFT JOIN user as u on m.userId = u.userId where a.serviceType = '${req.body.type}' ORDER BY a.price+0`,
    3: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
      w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
      as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
       LEFT JOIN user as u on m.userId = u.userId where a.serviceType = '${req.body.type}' ORDER BY num DESC`,
    4: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
      w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
      as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
       LEFT JOIN user as u on m.userId = u.userId where a.serviceType = '${req.body.type}' and a.price BETWEEN ${req.body.lowp} and ${req.body.highp}`,
    5: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
      w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
      as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
       LEFT JOIN user as u on m.userId = u.userId where a.serviceType = '${req.body.type}' and a.price > ${req.body.price}`,
    6:  `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
      w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
      as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
       LEFT JOIN user as u on m.userId = u.userId where a.workTitle like '%${req.body.title}%'`,
    7: `select a.*,u.userName,u.jobType,u.proImg from (select w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
        w.serviceWay,w.serviceType,w.request,w.releaseTime,r.reservaId,count(r.reservaId) as num from works
        as w LEFT JOIN reservation as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId) as a LEFT JOIN merchat
         as m on a.merchatId = m.merchatId LEFT JOIN user as u on m.userId = u.userId where a.serviceType = 0
        ORDER BY a.releaseTime DESC`,
    8: `select a.*,u.userName,u.jobType,u.proImg from (select DATEDIFF(w.enableEDate,'${req.body.date}') as date,w.enableEDate,w.workId,w.merchatId,w.workTitle,w.viewImg,w.price,
        w.serviceWay,w.serviceType,w.request,r.reservaId,count(r.reservaId) as num from works as w LEFT JOIN reservation
       as r on w.workId = r.workId where w.flag=0  GROUP BY w.workId having w.serviceType = '${req.body.type}' and date>=0) as a LEFT JOIN merchat as m on a.merchatId = m.merchatId
      LEFT JOIN user as u on m.userId = u.userId`
  }
    db.query(selectSql[req.body.condition],(err,result)=>{
      if(err){
        console.log(err);
        res.send(err);
        return
      } else {
          res.send({ success: true,workInfo:result });
      }
    });
});

router.post('/deleteWorks', function(req, res, next) {
  var upu = `update works set flag = 1 where workId = '${req.body.workId}'`;
    db.query(upu,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result.affectedRows>0){
          res.send({ success: true});
        } else {
          res.send({ success: false,message: '删除失败'});
        }
      }
    })
});

router.post('/updateWorks', function(req, res, next) {
  var upsql = 'UPDATE works SET workTitle = ?,freeService = ?,price = ?,request = ?,serviceType = ?,serviceWay = ?,enableDate = ?,enableEDate = ?,connextWay = ? WHERE workId = ?';
  var upParams = [req.body.title,req.body.service,req.body.price,req.body.request,req.body.type,req.body.way,req.body.sDate,req.body.eDate,req.body.connextWay,req.body.workId];
  var delItem = `DELETE FROM itemSet where workId = ${mysql.escape(req.body.workId)} `;
  var uwid = req.body.workId;
  if(req.body.item!=undefined){
    var insSpl = "INSERT INTO itemSet(itemId,itemContent,workId) VALUES ?";
    var ver =[];
    for(let i=0;i<req.body.item.length;i++){
      ver.push([uuid.v1(),req.body.item[i],uwid]);
    }
    db.updateThress(upsql,upParams,delItem,insSpl,[ver],(err,result)=>{
      if(err){
        console.log(err);
        res.send(err);
        return
      } else {
          res.send({ success: true});
      }
    });
  } else{
    db.update(upsql,upParams,(err,result)=>{
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
    })
  }
});

router.post('/deleteWorkImg', function(req, res, next) {
  db.query(`DELETE FROM workImg where wImgId = ${mysql.escape(req.body.id)}`,(err,result)=>{
    if(err){
      console.log(err);
      res.send(err);
      return
    } else {
        if(result.affectedRows>0){
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    }
  });
});

router.post('/upLoadSingleImg', function(req, res, next) {
  var imgId = uuid.v1();
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "./public/images/";
  form.parse(req, function (err, fields, files) {
      if(err){
        res.send(err);
        return
      }
      var imgArr = [];
      files.images.forEach(function(i){
            //获取临时文件的存储路径
            var uploadTmpPath=i.path;
            imgArr.push(uploadTmpPath)
      });
      db.insert( "INSERT INTO workImg(wImgId,imgUrl,workId) VALUES(?,?,?)",[imgId,imgArr[0],fields.workId[0]],(err,result)=>{
        if(err){
            res.send(err);
            return
        }
        else {
            if(result.affectedRows>0){
                res.send({ success: true, imgInfo: {wImgId:imgId,imgUrl:imgArr[0]} });
            } else{
                res.send({ success: false });
            } 
        }
      })
  });
});

module.exports = router;
