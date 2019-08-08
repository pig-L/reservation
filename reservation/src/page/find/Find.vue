<template>
  <div id="Find">
      <div class="head">发现</div>
      <van-tabs :sticky="true" :offset-top="45">
        <van-tab title="商家"><merchant></merchant></van-tab>
        <van-tab title="最新发布"><works></works></van-tab>
      </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Merchant from './Merchant.vue'
import Works from './Works.vue'
export default {
  name: 'Find',
  components: {
    VanTab: Tab,
    VanTabs: Tabs,
    Merchant,
    Works
  },
  data () {
    return {
      itemData: []
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #Find{
    width:100%;
    .head{
        width:100%;
        height:45px;
        background: #ff69b4;
        line-height:45px;
        text-align: center;
        color:#eee9e9;
        position: fixed;
        top:0;
        left:0;
        z-index: 2;
        @include font-dpr(20px);
    }
    .van-tab__pane{
      margin-top: 45px;
    }
    .van-tabs{
      .van-tabs__wrap{
         height:px2rem(120px);
      }
      .van-tabs__line{
        background-color: #ff00ff;
        height:px2rem(4px);
      }
      &.van-tabs--line{
        padding-top:px2rem(140px);
      }
      .van-tab{
        @include font-dpr(14px);
        color:#999999;
        background: #eee9e9;
        line-height: px2rem(120px);
      }
      .van-tab--active{
        color:#ff1493;
      }
    }
  }
</style>
