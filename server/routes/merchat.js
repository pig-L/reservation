var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const db=require('../model/db.js');


  router.post('/queryMerchat', function(req, res, next) {
    var selMer = `select * from(
      select u.userName,u.address,u.proImg,mm.* from user as u LEFT JOIN (
      select b.*,count(b.reservaId) as num from(select DISTINCT(a.merchatId),a.serviceType,a.userId,r.reservaId 
      from (select DISTINCT(w.workId),w.serviceType,m.merchatId,m.name,m.userId from works as w RIGHT JOIN merchat as m 
      on w.merchatId = m.merchatId where w.flag=0 and m.flag =0) as a LEFT JOIN reservation as r on a.workId = r.workId) as b group by b.merchatId,b.serviceType) as mm
      on u.userId = mm.userId) as bb where bb.userName like '%${req.body.name}%' and bb.serviceType = '${req.body.type}'`
    db.query(selMer,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          res.send({success:true,data:result});
      }
    })
  });

  router.post('/queryMerchatInfo', function(req, res, next) {
    var quSql1 = `select workId,viewImg,workTitle from works where merchatId = ${mysql.escape(req.body.merchatId)}`;
    var quSql2 = `select count(workId) as num from reservation where workId in (select workId from works where merchatId = ${mysql.escape(req.body.merchatId)})`;
    var quSql3 = `select u.userName,u.address,u.proImg,m.bgImg from user as u LEFT JOIN merchat as m on u.userId = m.userId where m.merchatId = ${mysql.escape(req.body.merchatId)}`;
    db.queryThree(quSql1,quSql2,quSql3,(err,result)=>{
      if(err){
        res.send(err);
        return
      } else {
          res.send({ success: true,worksData: result[0],reservaData:result[1],merchatInfo:result[2]});
      }
    })
  });


module.exports = router;
