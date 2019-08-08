# reservation
vue+node.js+express实现前后端分离的手机端预约（化妆、摄影、服装）系统和后台管理系统
# 说明
backstage文件夹放的是后台管理页面源码<br>
进入backstage文件夹<br>
npm install下载依赖<br>
npm run dev启动<br>

reservation文件夹放的是手机端预约系统的页面源码<br>
进入reservation文件夹<br>
npm install下载依赖<br>
npm run dev启动<br>

server文件夹放的是node.js+express源码和打包好的页面<br>
进入server文件夹<br>
npm install下载依赖<br>
npm run start启动<br>

rsdatabase文件夹是本系统mysql数据库，需要把这个文件夹放在本地mysql数据库存储的位置<br>
# 运行
如要运行则按照上面的server文件夹操作步骤即可<br>
如要修改页面则按照对应手机端页面或者是后台管理页面进入相应的源码文件夹<br>
访问：<br>
http://localhost:3000/index.html#/ 进入手机端首页<br>
http://localhost:3000/backstage.html#/ 进入后台管理系统<br>
手机端页面登录：<br>
账号：18718217438<br>
密码：123@321<br>
后台管理页面登录：<br>
账号：superAdmin<br>
密码：superAdmin<br>
# 效果演示
### 成为商家
首先登录，如果要发布服务则要先申请成为商家<br>
![图片演示](https://raw.github.com/yourName/repositpry/master/yourprojectName/img-folder/test.jpg)
管理员通过审核
### 发布服务
发布成功之后可以在，个人主页看到自己发布的服务
![图片演示](https://raw.github.com/yourName/repositpry/master/yourprojectName/img-folder/test.jpg)
### 预约服务
预约成功之后，商家接受预约之后，完成服务之后用户可以评价服务
![图片演示](https://raw.github.com/yourName/repositpry/master/yourprojectName/img-folder/test.jpg)





