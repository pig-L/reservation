<template>
  <div id="Index">
    <header>
      <van-search placeholder="请输入搜索关键词" background="#fd879f" @focus="show=true"/>
    </header>
    <div class="wrap_img">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="../../assets/index/bygp.jpg" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/index/byhy.jpg" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/index/grxz.jpg" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/index/hz.jpg" alt=""></van-swipe-item>
      </van-swipe>
    </div>
    <nav>
      <ul>
        <li @click="$router.push({name: 'ServiceList',params:{type:'毕业大合照'}})"><div><img src="../../assets/index/nav_1.png" alt=""></div><p>毕业大合照</p></li>
        <li @click="$router.push({name: 'ServiceList',params:{type:'毕业跟拍'}})"><div><img src="../../assets/index/nav_2.png" alt=""></div><p>毕业跟拍</p></li>
        <li @click="$router.push({name: 'ServiceList',params:{type:'个人写真'}})"><div><img src="../../assets/index/nav_3.png" alt=""></div><p>个人写真</p></li>
        <li @click="$router.push({name: 'ServiceList',params:{type:'化妆'}})"><div><img src="../../assets/index/nav_4.png" alt=""></div><p>化妆</p></li>
        <li @click="$router.push({name: 'ServiceList',params:{type:'服装出租'}})"><div><img src="../../assets/index/nav_5.png" alt=""></div><p>服装出租</p></li>
        <li @click="$router.push({name: 'ServiceList',params:{type:'造型'}})"><div><img src="../../assets/index/nav_6.png" alt=""></div><p>造型</p></li>
      </ul>
    </nav>
    <main>
      <div class="tips">本平台使用前须知：</div>
      <div class="tip_img">
        <img src="../../assets/index/pro_1.jpg" alt="">
        <img src="../../assets/index/pro_2.jpg" alt="">
        <img src="../../assets/index/pro_3.jpg" alt="">
        <img src="../../assets/index/pro_4.jpg" alt="">
      </div>
    </main>
    <van-popup v-model="show"><search-service @closeSearch="goClose"></search-service></van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Popup } from 'vant'
import SearchService from './Search.vue'
export default {
  name: 'Index',
  data () {
    return {
      show: false
    }
  },
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanSearch: Search,
    SearchService,
    VanPopup: Popup
  },
  methods: {
    goClose (data) {
      this.show = data
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="scss">
  @import '../../style/base.scss';
  #Index {
    width:100%;
    height:100%;
    @include font-dpr(14px);
    header{
      width:100%;
      height:px2rem(120px);
      background:#ff69b4;
      overflow: hidden;
      position:fixed;
      top:0;
      left:0;
      z-index:2;
      .van-search{
        margin-top:px2rem(20px);
      }
      .van-search,.van-cell,.van-field__body{
        height:px2rem(80px);
        line-height: px2rem(80px);
        @include font-dpr(14px);
      }
      .van-icon{
        @include font-dpr(16px);
        line-height: px2rem(80px);
      }
    }
    .wrap_img{
      width:100%;
      overflow: hidden;
      margin-top:px2rem(120px);
    }
    .van-swipe{
        width:100%;
        img{
          width:100%;
          height:auto;
        }
    }
    nav{
      width:100%;
      ul{
        width:100%;
        overflow: hidden;
        li{
          float:left;
          width: calc( 100% / 3 );
          height:px2rem(200px);
          text-align: center;
          div{
            display:inline-block;
            width:px2rem(120px);
            height:px2rem(120px);
            background: #fd879f;
            @include font-dpr(14px);
            border-radius: 30px;
            img{
              width:100%;
              height:auto;
            }
          }
        }
      }
    }
    main{
      width:100%;
      padding:px2rem(40px);
      box-sizing: border-box;
      .tips{
        color:red;
        @include font-dpr(18px);
        margin:px2rem(40px) 0;
      }
      .tip_img{
        img{
          width:100%;
          height:auto;
        }
      }
    }
    .van-popup{
      width:100%;
      height:100%;
    }
  }
</style>
