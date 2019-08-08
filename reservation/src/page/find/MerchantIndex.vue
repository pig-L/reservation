<template>
  <div id="MerchantIndex">
      <header><van-icon @click="$router.go(-1)" name="arrow-left"/>{{merchatData.userName}}的店铺</header>
      <div class="merchant_info">
        <div class="wrap_bg"><img :src=merchatData.bgImg alt=""></div>
        <div class="like" @click="collectMerchat">
            <img src="../../assets/index/like.png" alt="" v-if="like">
            <img src="../../assets/index/blike.png" alt="" v-else>
        </div>
        <div class="wrap_info">
          <div class="round_img"><img :src=proImg alt=""></div>
          <div>{{merchatData.userName}}</div>
        </div>
      </div>
      <div class="address_info">
          <div>店铺地址：</div>
          <div>{{merchatData.address}}</div>
      </div>
      <div class="detail">
        <ul>
          <li>服务</li>
          <li>订单数</li>
          <li>{{worksData.length}}</li>
          <li>{{orderNum}}</li>
        </ul>
      </div>
      <div class="wrap_service">
        <div class="service_item" v-for="(v,i) in worksData" :key="i" @click="$router.push({name: 'ServiceDetail',params:{id: v.workId}})">
          <div class="item_head"><span>*</span><span>服务：</span><span>{{v.workTitle}}</span></div>
          <div class="wrap_img"><img :src=v.viewImg alt=""></div>
        </div>
      </div>
  </div>
</template>

<script>
import { Icon, Toast } from 'vant'
export default {
  name: 'MerchantIndex',
  data () {
    return {
      like: false,
      merchatData: {},
      orderNum: null,
      worksData: [],
      mid: null,
      userId: null,
      proImg: ''
    }
  },
  components: {
    VanIcon: Icon,
    Toast
  },
  mounted: function () {
    if (this.$route.params.merchatId) {
      sessionStorage.setItem('merchatId', this.$route.params.merchatId)
      this.mid = this.$route.params.merchatId
    } else {
      this.mid = sessionStorage.getItem('merchatId')
    }
    this.$store.dispatch('queryMerchatInfoAct', {merchatId: this.mid})
      .then((res) => {
        this.merchatData = res.data.merchatInfo[0]
        this.proImg = this.merchatData.proImg
        this.orderNum = res.data.reservaData[0].num
        this.worksData = res.data.worksData
      }).catch(res => {
        console.log(res)
      })
    this.$store.dispatch('getUserInfoAct')
      .then((res) => {
        if (res.data.userInfo) {
          this.userId = res.data.userInfo.userId
          this.$store.dispatch('findCollectWAct', {type: 1, typeId: this.mid, userId: this.userId})
            .then((res) => {
              this.like = res.data.success
            }).catch(res => {
              console.log(res)
            })
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    collectMerchat () {
      if (!this.userId) {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          mask: true,
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '请先登录'
        })

        let second = 3
        const timer = setInterval(() => {
          second--
          if (second) {
            toast.message = `现转到登录...`
          } else {
            clearInterval(timer)
            Toast.clear()
            this.$router.push({name: 'Login'})
          }
        }, 1000)
      } else {
        this.like = !this.like
        this.$store.dispatch('collectWorNotAct', {
          flag: this.like,
          type: 1,
          typeId: this.mid,
          userId: this.userId
        })
          .then((res) => {
            if (res.data.success) {
              console.log('操作成功了')
            }
          }).catch(res => {
            console.log(res)
          })
      }
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #MerchantIndex{
    width:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 2;
    background: #f4f4f4;
    padding-bottom:px2rem(60px);
    header{
        width:100%;
        position:fixed;
        top:0;
        left:0;
        z-index: 1;
        height:px2rem(130px);
        background: #ff69b4;
        @include font-dpr(18px);
        text-align: center;
        line-height: px2rem(130px);
        color:white;
        .van-icon-arrow-left{
          position:absolute;
          @include font-dpr(24px);
          top:px2rem(30px);
          left:px2rem(30px);
        }
    }
    .merchant_info{
      margin-top:px2rem(130px);
      position:relative;
      background: white;
    }
    .like{
            position: absolute;
            top:10%;
            right:5%;
            width:px2rem(70px);
            height:px2rem(70px);
            text-align: center;
            line-height: px2rem(70px);
            border-radius: 50%;
            background: rgba(0,0,0,0.6);
            &>img{
                width:90%;
                height:auto;
                padding-top:px2rem(5px);
            }
        }
    .wrap_bg{
      width:100%;
      height:px2rem(650px);
      &>img{
        width:100%;
        height:auto;
      }
    }
    .wrap_info{
      position:absolute;
      left:0;
      bottom:-25%;
      padding-left:px2rem(30px);
      div{
        display: inline-block;
        vertical-align: top;
        @include font-dpr(16px);
        line-height: px2rem(250px);
        color:#464547;
      }
      .round_img{
        width:px2rem(250px);
        height:px2rem(250px);
        border-radius: 2rem;
        overflow: hidden;
        &>img{
          width:100%;
          height:100%;
        }
      }
    }
    .address_info{
      width:100%;
      display: flex;
      flex-flow: row;
      background: white;
      color:#464547;
      padding:px2rem(200px) px2rem(30px) px2rem(30px);
      box-sizing: border-box;
      @include font-dpr(14px);
      div:last-child{
        flex:1;
      }
    }
    .detail{
      margin-top:px2rem(30px);
      width:100%;
      background: white;
      ul{
        width:100%;
        overflow: hidden;
        li{
          width: calc( 100% / 2 );
          text-align: center;
          height:px2rem(100px);
          line-height: px2rem(100px);
          float:left;
          color:#464547;
          @include font-dpr(14px);
          &:nth-child(3),&:nth-child(4){
            color:#ff69b4;
          }
        }
      }
    }
    .wrap_service{
      background: white;
      margin-top:px2rem(30px);
    }
    .wrap_img{
      width:100%;
      height:px2rem(650px);
      &>img{
        width:100%;
        height:100%;
      }
    }
    .service_item{
      padding:px2rem(30px);
      width:100%;
      box-sizing: border-box;
      @include font-dpr(14px);
      .item_head{
        color:#464547;
        padding-bottom:px2rem(20px);
        span{
          padding-right:px2rem(20px);
        }
        span:first-child{
          color:#ff69b4;
        }
      }
    }
  }
</style>
