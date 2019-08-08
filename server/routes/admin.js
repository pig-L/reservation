var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const db=require('../model/db.js');

router.post('/adminLogin', function(req, res, next) {
    db.query(`select * from admin where adminName = '${req.body.name}'`,(err,result)=>{
        if(err){
          res.send(err);
              return
        } else {
          if(result.length>0){
            if(req.body.password===result[0].password){
              req.session.user = result[0];
              res.send({ success: true ,info: result[0]});
            } else {
              res.send({ success: false,message:'密码输入错误' });
            }
          } else {
            res.send({ success: false,message:'该用户不存在' });
          }
        }
      })
});

router.post('/addAdmin', function(req, res, next) {
    var  addSql = 'INSERT INTO admin(adminName,password,flag) VALUES(?,?,?)';
    var  addSqlParams = [req.body.name,req.body.password,0];
    db.query(`select * from admin where adminName = '${req.body.name}'`,(err,result)=>{
        if(err){
          res.send(err);
              return
        } else {
          if(result.length>0){
            res.send({ success: false,message:'该管理员已存在' });
          } else {
            db.insert(addSql,addSqlParams,(err,result)=>{
                if(err){
                    res.send(err);
                    return
                }
                else {
                    if(result.affectedRows>0){
                        res.send({ success: true, message: '新增成功' });
                    } else{
                        res.send({ success: false, message: '新增失败' });
                    } 
                }
            })
          }
        }
    })
});

router.post('/editPassword', function(req, res, next) {
    db.update('UPDATE admin set password = ? WHERE adminName = ?',[req.body.password,req.body.name],(err,result)=>{
        if(err){
          res.send(err);
              return
        } else {
            if(result.affectedRows>0){
                res.send({ success: true, message: '修改成功' });
            } else{
                res.send({ success: false, message: '修改失败' });
            } 
        }
      })
});

router.post('/adminqueryWorks', function(req, res, next) {
    var tt = (req.body.num-1)*10;
    var que;
    var que2;
    if(!!req.body.workId){
        if(!!req.body.serviceType){
            que = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                JOIN merchat as m on w.merchatId = m.merchatId where w.workId =  ${mysql.escape(req.body.workId)}
             and w.serviceType = '${req.body.serviceType}' and w.flag = 0 ORDER BY w.workId LIMIT ${tt},10`;
            que2 =  `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                    JOIN merchat as m on w.merchatId = m.merchatId where w.workId =  ${mysql.escape(req.body.workId)}
                    and w.serviceType = '${req.body.serviceType}' and w.flag = 0  ORDER BY w.workId`;
        } else {
            que = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                JOIN merchat as m on w.merchatId = m.merchatId where w.workId =  ${mysql.escape(req.body.workId)} and w.flag = 0 
              ORDER BY w.workId LIMIT ${tt},10`;
            que2 = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                    JOIN merchat as m on w.merchatId = m.merchatId where w.workId =  ${mysql.escape(req.body.workId)} and w.flag = 0 
                    ORDER BY w.workId`;
        }
    } else {
        if(!!req.body.serviceType){
            que = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                JOIN merchat as m on w.merchatId = m.merchatId where w.serviceType = '${req.body.serviceType}'
                and w.flag = 0  ORDER BY w.workId LIMIT ${tt},10`;
            que2 = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
                  JOIN merchat as m on w.merchatId = m.merchatId where w.serviceType = '${req.body.serviceType}'
                  and w.flag = 0 ORDER BY w.workId`;
        } else {
            que = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
            JOIN merchat as m on w.merchatId = m.merchatId where w.flag = 0  ORDER BY w.workId LIMIT ${tt},10`;
            que2 = `select w.workId,w.workTitle,w.price,w.serviceType,w.serviceWay,m.name from works as w LEFT 
            JOIN merchat as m on w.merchatId = m.merchatId where w.flag = 0  ORDER BY w.workId`;
        }
    }
    db.queryTwo(que,que2,(err,result)=>{
        if(err){
          res.send(err);
              return
        } else {
            res.send({ success: true,worksInfo:result[0],total:result[1].length});
        }
    })
});

router.post('/querySingleWork', function(req, res, next) {
  var qsw1 = `select w.*,m.name from works as w LEFT JOIN merchat as m on w.merchatId = m.merchatId where w.workId =  ${mysql.escape(req.body.workId)}`
  var qsw2 = `select imgUrl from workImg where workId =  ${mysql.escape(req.body.workId)}`
  var qsw3 = `select itemContent from itemSet where workId =  ${mysql.escape(req.body.workId)}`
  db.queryThree(qsw1,qsw2,qsw3,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
          res.send({ success: true, info: result[0],imgData:result[1],item:result[2]});
      }
  })
});

router.post('/adminqueryUser', function(req, res, next) {
  var tt = (req.body.num-1)*10;
  var quew;
  var quew2;
  if(!!req.body.userId){
      quew = `select * from user where userId = ${mysql.escape(req.body.userId)} and flag = 0`;
      quew2 = `select * from user where userId = ${mysql.escape(req.body.userId)} and flag = 0`;
  } else {
      quew = `select * from user where flag = 0 ORDER BY userId LIMIT ${tt},10`;
      quew2 = `select * from user where flag = 0 ORDER BY userId`;
  }
  db.queryTwo(quew,quew2,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
          res.send({ success: true,userInfo:result[0],total:result[1].length});
      }
  })
});

router.get('/queryApply', function(req, res, next) {
  db.query('select * from apply where flag = 0',(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
          res.send({ success: true,applyInfo:result});
      }
  })
});

router.post('/dealApply', function(req, res, next) {
  if(req.body.type===1){
    var deal = `insert into merchat(merchatId,name,identityNum,idenImgInfr,idenImgBack,licenseImg,deviceImg,userId,bgImg,flag)
            select apId,name,identityNum,idenImgInfr,idenImgBack,licenseImg,deviceImg,userId,bgImg,flag from apply where 
            apId = ${req.body.apId}`;
    var upd = `update apply set flag = 1 where apId = ${req.body.apId}`;
    db.queryTwo(deal,upd,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result[1].affectedRows>0){
          res.send({ success: true});
        } else {
          res.send({ success: false});
        }
      }
    })
  } else if(req.body.type===2){
    var upd2 = `update apply set flag = 2 where apId = ${req.body.apId}`;
    db.query(upd2,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result.affectedRows>0){
          res.send({ success: true});
        } else {
          res.send({ success: false});
        }
      }
    })
  }
});

router.get('/queryComplaint', function(req, res, next) {
  db.query('select cp.cpId,cp.cpContent,cpimg,u.userName,m.name,cp.cpTime,cp.workId,m.merchatId from complaint as cp LEFT JOIN user as u on cp.userId = u.userId LEFT JOIN reservation as r on cp.reservaId = r.reservaId LEFT JOIN merchat as m on r.merchatId = m.merchatId where cp.flag = 0',(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
          res.send({ success: true,complaintInfo:result});
      }
  })
});

router.post('/dealComplaint', function(req, res, next) {
  if(req.body.type===1){
    var deal = `update works set flag = 1 where workId = '${req.body.tId}'`;
    var upd = `update complaint set flag = 1 where cpId = ${req.body.cpId}`;
    db.queryTwo(deal,upd,(err,result)=>{
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
  } else if(req.body.type===2){
    var deal2 = `update user set flag = 1 where userId = (select userId from merchat where merchatId = '${req.body.tId}')`;
    var dealw = `update works set flag = 1 where  merchatId = '${req.body.tId}'`;
    var upd2 = `update complaint set flag = 1 where cpId = ${req.body.cpId}`;
    db.queryThree(deal2,dealw,upd2,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result[0].affectedRows>0){
          db.query(`update merchat set flag = 1 where merchatId = '${req.body.tId}'`,(err,result)=>{
            if(err){
              res.send(err);
                  return
            } else {
              if(result.affectedRows>0){
                res.send({ success: true});
              } else {
                res.send({ success: false});
              }
            }
          })
        } else {
          res.send({ success: false});
        }
      }
    })
  } else if(req.body.type===3){
    var upd3 = `update complaint set flag = 1 where cpId = ${req.body.cpId}`;
    db.query(upd3,(err,result)=>{
      if(err){
        res.send(err);
            return
      } else {
        if(result.affectedRows>0){
          res.send({ success: true});
        } else {
          res.send({ success: false});
        }
      }
    })
  }
});

  module.exports = router;