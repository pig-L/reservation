<template>
  <div id="Success">
    <div class="head">信息提示</div>
    <main>
      <div class="tips"><span class="sp1">发布成功！</span><span class="sp2" @click="gocheck">查看已发布的服务</span></div>
      <div class="wrap_img"><img src="../../assets/index/great.gif" alt=""></div>
    </main>
  </div>
</template>

<script>
import { } from 'vant'
export default {
  name: 'Success',
  components: {
  },
  methods: {
    gocheck () {
      this.$router.push({name: 'ServiceDetail', params: {id: this.$route.params.rid}})
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #Success{
    width:100%;
    .head{
        width:100%;
        height:px2rem(120px);
        background: #ff69b4;
        line-height: px2rem(120px);
        text-align: center;
        color:#eee9e9;
        @include font-dpr(20px);
    }
    .tips{
      text-align: center;
      padding: px2rem(50px) 0;
      @include font-dpr(18px);
      .sp1{
        color:#f46c1f;
        @include font-dpr(22px);
      }
      .sp2{
        color:#00A2E9;
        text-decoration: underline;
      }
    }
    .wrap_img{
      text-align: center;
    }
  }
</style>
