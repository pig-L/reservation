<template>
  <div id="CommonNav">
    <ul>
      <li @click="$router.push({name: 'Index'})"><div><img src="../assets/index/index.png" alt=""></div><div class="index">首页</div></li>
      <li @click="$router.push({name: 'Find'})"><div><img src="../assets/index/find.png" alt=""></div><div class="find">发现</div></li>
      <li @click="$router.push({name: 'JoinMerchant'})"><div><img src="../assets/index/join.png" alt=""></div><div class="join">成为商家</div></li>
      <li @click="$router.push({name: 'Login'})"><div><img src="../assets/index/login.png" alt=""></div><div class="login">登录</div></li>
      <li @click="$router.push({name: 'MineIndex'})"><div><img src="../assets/index/mine.png" alt=""></div><div class="mine">我的</div></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommonNav',
  methods: {

  }
}
</script>

<style lang="scss">
@import '../style/base.scss';
#CommonNav{
  width:100%;
  height:px2rem(180px);
  background: #fcb1b7;
  position: fixed;
  z-index: 1;
  bottom:0;
  left:0;
  ul{
    width:100%;
    overflow: hidden;
    height:px2rem(180px);
    box-sizing:border-box;
    padding-top:px2rem(10px);
    li{
      float:left;
      height:100%;
      width:20%;
      text-align: center;
      color:#db1e71;
      @include font-dpr(14px);
      img{
        width:px2rem(80px);
        height:px2rem(80px);
      }
    }
  }
}
</style>
