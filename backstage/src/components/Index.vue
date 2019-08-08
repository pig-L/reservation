<template>
<div class="index">
  <el-container>
    <el-header>
      <span>岭师捷约摄妆网后台管理</span>
      <div class="exit">
        <span>欢迎{{userInfo.adminName}}管理员</span>
        <img src="../assets/exit.png" alt="" class="img_exit" @click="exit">
      </div>
    </el-header>
    <el-container class="contentMain">
      <el-aside width="250px">
        <ul>
          <router-link to='/Apply'><li class="active">申请处理</li></router-link>
          <router-link to='/Complaint'><li>投诉处理</li></router-link>
          <router-link to='/UserManage'><li>用户管理</li></router-link>
          <router-link to='/ServiceIndex'><li>服务管理</li></router-link>
          <router-link to='/AdminIndex' v-if="userInfo.flag===1"><li>管理员</li></router-link>
           <router-link to='/EditPassword'><li>修改密码</li></router-link>
        </ul>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import { Container, Header, Aside, Main } from 'element-ui'
export default {
  name: 'Index',
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    ElHeader: Header,
    ElAside: Aside,
    ElMain: Main,
    ElContainer: Container
  },
  mounted: function () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
    exit () {
      this.$store.dispatch('removeUserInfoAct')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  width:100%;
  height:100%;
}
  .el-header{
    background: #c5e7f1;
    line-height: 60px;
    moz-box-shadow:2px 2px 5px #7ecafe;
    -webkit-box-shadow:2px 2px 5px #7ecafe;
    box-shadow:2px 2px 5px #7ecafe;
    &>span{
      font-size:24px;
      padding-left:20px;
      font-family: Arial, Helvetica, sans-serif;
      font-style: italic;
      color:snow;
    }
    .exit{
      float:right;
      padding-right:20px;
      line-height: 60px;
      span{
        padding-right:30px;
        font-size:18px;
      }
      img{
        vertical-align: middle;
        width:35px;
        height:auto;
      }
    }
  }
  .el-aside{
    margin-top:5px;
    background: #c5e7f1;
    overflow: hidden;
    margin-bottom:20px;
    ul{
      text-align: center;
      margin-top:20px;
      li{
        display: inline-block;
        background-color: white;
        width:40%;
        padding:10px 20px;
        margin-bottom:20px;
        border-radius:20px;
      }
      a{
        color:#0092e1;
      }
      .router-link-active{
        li{
          background-color: #0092e1;
          color:white;
        }
      }
    }
  }
  .el-main{
    margin-top:5px;
  }
  .el-container.is-vertical{
    width:100%;
    height:100%;
  }
  .contentMain{
    height:calc( 100% - 65px );
  }
  .img_exit{
    cursor: pointer;
  }
</style>
