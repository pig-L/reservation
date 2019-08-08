var mysql = require('mysql');
var async = require('async');

const pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'rsdatabase',
	acquireTimeout: 15000, // 连接超时时间
	connectionLimit: 100, // 最大连接数
	waitForConnections: true, // 超过最大连接时排队
	queueLimit: 0, // 排队最大数量(0 代表不做限制)
  });

   connectHandler = () => new Promise((resolve, reject) => {
   pool.getConnection((err, connection) => {
     if(err) {
       console.error('链接错误：' + err.stack + '\n' + '链接ID：' + connection.threadId)
       reject(err)
     } else {
       resolve(connection)
     }
   })
  })

  exports.insert = async (addSql,addSqlParams,callback) => {
   const connection = await connectHandler() // 得到链接
   //开启事务
   connection.beginTransaction( err => {
     if(err) {
       return '开启事务失败'
        } else {
           //执行INSERT插入操作
          connection.query(addSql,addSqlParams, (err,result) => {
            if(err) {
              console.log(err)
              connection.release();
              return connection.rollback(callback('插入数据失败！回滚', null))
            } else {
              connection.commit((error) => {
                if(error) {
				          return callback('事务提交失败', null)
                }
              })
              connection.release()  // 释放链接
              return callback(null, result)
            }
          })
        }
      })
    }
  
  exports.update = async (upSql,upSqlParams,callback) => {
    const connection = await connectHandler() // 得到链接
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
          } else {
            //执行update插入操作
            connection.query(upSql,upSqlParams, (err,result) => {
              if(err) {
                console.log(err)
                connection.release();
                return connection.rollback(callback('更新数据失败！回滚', null))
              } else {
                connection.commit((error) => {
                  if(error) {
                    return callback('事务提交失败', null)
                  }
                })
                connection.release()  // 释放链接
                return callback(null, result)
              }
            })
          }
        })
      }

  exports.updateThress = async (addSql1,addSqlParams1,addSql2,addSql3,addSqlParams3,AllCallback) => {
    const connection = await connectHandler() // 得到链接
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
          } else {
            //执行更新操作
            var task1 = function(callback){
              connection.query(addSql1,addSqlParams1, (err,result) => {
                if(err) {
                  console.log(err)
                    callback('更新数据失败！回滚', null)
                } 
                    callback(null, result)
              })
            }
            var task2 = function(callback){
              connection.query(addSql2, (err,result) => {
                if(err) {
                  console.log(err)
                  callback('删除数据失败！回滚', null)
                  return
                } 
                  callback(null, result)
              })
            }
            var task3 = function(callback3){
              connection.query(addSql3,addSqlParams3, (err,result) => {
                if(err) {
                  console.log(err)
                  callback3('插入数据失败！回滚', null)
                  return
                } 
                  callback3(null, result)
              })
            }
            async.series([task1, task2, task3],function(err,result){
              if (err) {  
                console.log(err);  
                //回滚  
                connection.release();
                return connection.rollback(AllCallback('更新数据失败！回滚', null))
              }
              //提交  
              connection.commit(function(err) {  
                if (err) {  
                  console.log(err);  
                  return AllCallback('事务提交失败', null)
                }  
                    
                console.log('成功,提交!');  
                //释放资源  
                connection.release();  
                return AllCallback(null, result)
              });
            })
          }
        })
      }

	exports.query = async (sql,callback)=>{
		const connection = await connectHandler() // 得到链接
			connection.query(sql,function(err,result){
				if (err) return callback(err, null);
			   else return callback(null, result);
			});
      connection.release()  // 释放链接
	}

  exports.queryTwo = async (qeSql1,qeSql2,AllCallback) => {
    const connection = await connectHandler() // 得到链接
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
         } else {
            //执行INSERT插入操作
            var task1 = function(callback){
              connection.query(qeSql1,(err,result) => {
                if(err) {
                  console.log(err)
                   callback('查询数据1失败！回滚', null)
                } 
                   callback(null, result)
              })
            }
            var task2 = function(callback){
              connection.query(qeSql2, (err,result) => {
                if(err) {
                  console.log(err)
                  callback('查询数据2失败！回滚', null)
                  return
                } 
                  callback(null, result)
              })
            }
            async.series([task1, task2],function(err,result){
              if (err) {  
                console.log(err);  
                //回滚  
                connection.release();
                return connection.rollback(AllCallback('查询数据失败！回滚', null))
              }
              //提交  
              connection.commit(function(err) {  
                if (err) {  
                  console.log(err);  
                  return AllCallback('事务提交失败', null)
                }  
                    
                console.log('成功,提交!');  
                //释放资源  
                connection.release();  
                return AllCallback(null, result)
              });
            })
         }
       })
     }

  exports.queryThree = async (qeSql1,qeSql2,qeSql3,AllCallback) => {
    const connection = await connectHandler() // 得到链接
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
         } else {
            //执行INSERT插入操作
            var task1 = function(callback){
              connection.query(qeSql1,(err,result) => {
                if(err) {
                  console.log(err)
                   callback('查询数据1失败！回滚', null)
                } 
                   callback(null, result)
              })
            }
            var task2 = function(callback){
              connection.query(qeSql2, (err,result) => {
                if(err) {
                  console.log(err)
                  callback('查询数据2失败！回滚', null)
                  return
                } 
                  callback(null, result)
              })
            }
            var task3 = function(callback){
              connection.query(qeSql3,(err,result) => {
                if(err) {
                  console.log(err)
                  callback('查询数据3失败！回滚', null)
                  return
                } 
                  callback(null, result)
              })
            }
            async.series([task1, task2, task3],function(err,result){
              if (err) {  
                console.log(err);  
                //回滚  
                connection.release();
                return connection.rollback(AllCallback('查询数据失败！回滚', null))
              }
              //提交  
              connection.commit(function(err) {  
                if (err) {  
                  console.log(err);  
                  return AllCallback('事务提交失败', null)
                }  
                    
                console.log('成功,提交!');  
                //释放资源  
                connection.release();  
                return AllCallback(null, result)
              });
            })
         }
       })
     }

  exports.insertThree = async (addSql1,addSqlParams1,addSql2,addSqlParams2,addSql3,addSqlParams3,AllCallback) => {
    const connection = await connectHandler() // 得到链接
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
         } else {
            //执行INSERT插入操作
            var task1 = function(callback){
              connection.query(addSql1,addSqlParams1, (err,result) => {
                if(err) {
                  console.log(err)
                   callback('插入数据失败！回滚', null)
                } 
                   callback(null, result)
              })
            }
            var task2 = function(callback){
              connection.query(addSql2,addSqlParams2, (err,result) => {
                if(err) {
                  console.log(err)
                  callback('插入数据失败！回滚', null)
                  return
                } 
                  callback(null, result)
              })
            }
            var task3 = function(callback3){
              connection.query(addSql3,addSqlParams3, (err,result) => {
                if(err) {
                  console.log(err)
                  callback3('插入数据失败！回滚', null)
                  return
                } 
                  callback3(null, result)
              })
            }
            async.series([task1, task2, task3],function(err,result){
              if (err) {  
                console.log(err);  
                //回滚  
                connection.release();
                return connection.rollback(AllCallback('插入数据失败！回滚', null))
              }
              //提交  
              connection.commit(function(err) {  
                if (err) {  
                  console.log(err);  
                  return AllCallback('事务提交失败', null)
                }  
                    
                console.log('成功,提交!');  
                //释放资源  
                connection.release();  
                return AllCallback(null, result)
              });
            })
         }
       })
     }


  exports.insertTwo = async (addSql1,addSqlParams1,addSql2,addSqlParams2,AllCallback) => {
  const connection = await connectHandler() // 得到链接
  //开启事务
  connection.beginTransaction( err => {
    if(err) {
      return '开启事务失败'
        } else {
          //执行INSERT插入操作
          var task1 = function(callback){
            connection.query(addSql1,addSqlParams1, (err,result) => {
              if(err) {
                console.log(err)
                  callback('插入数据失败！回滚', null)
              } 
                  callback(null, result)
            })
          }
          var task2 = function(callback){
            connection.query(addSql2,addSqlParams2, (err,result) => {
              if(err) {
                console.log(err)
                callback('插入数据失败！回滚', null)
                return
              } 
                callback(null, result)
            })
          }
          async.series([task1, task2],function(err,result){
            if (err) {  
              console.log(err);  
              //回滚  
              connection.release();
              return connection.rollback(AllCallback('插入数据失败！回滚', null))
            }
            //提交  
            connection.commit(function(err) {  
              if (err) {  
                console.log(err);  
                return AllCallback('事务提交失败', null)
              }  
                  
              console.log('成功,提交!');  
              //释放资源  
              connection.release();  
              return AllCallback(null, result)
            });
          })
        }
      })
    }