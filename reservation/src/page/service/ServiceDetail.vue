<template>
  <div id="ServiceDetail">
      <div class="detail_head">
        <div class="wrap_img">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(v,i) in imgData" :key="i"><img :src=v.imgUrl alt=""></van-swipe-item>
            </van-swipe>
        </div>
        <div class="back" @click="$router.go(-1)"><img src="../../assets/index/back.png" alt=""></div>
        <div class="like" @click="checkLogin(2)">
            <img src="../../assets/index/like.png" alt="" v-if="like">
            <img src="../../assets/index/blike.png" alt="" v-else>
        </div>
        <div class="detail_title">{{workData.workTitle}}</div>
        <div class="detail_price">￥{{workData.price}}</div>
      </div>
      <div class="detail_info">
          <div class="info_item">
              <div class="info_type"><img src="../../assets/index/discount.png" alt=""><span>赠送服务：</span></div>
              <div class="info_content">{{workData.freeService|filterService}}</div>
          </div>
          <div class="info_item">
              <div class="info_type"><img src="../../assets/index/service.png" alt="">服务方式：</div>
              <div class="info_content">{{type}}</div>
          </div>
          <div class="info_item" v-if="type === '到店'">
              <div class="info_type"><img src="../../assets/index/spot.png" alt="">店铺地址：</div>
              <div class="info_content">{{workData.address}}</div>
          </div>
          <div class="info_item">
              <div class="info_type"><img src="../../assets/index/time.png" alt="">服务时间：</div>
              <div class="info_content"><div>{{workData.enableDate|dateFormat('yyyy-MM-dd hh:mm:ss')}}</div><div class="during">至</div><div>{{workData.enableEDate|dateFormat('yyyy-MM-dd hh:mm:ss')}}</div></div>
          </div>
          <div class="info_item">
              <div class="info_type"><img src="../../assets/index/time.png" alt="">服务时长：</div>
              <div class="info_content">{{workData.totalTime}}小时</div>
          </div>
          <div class="info_item">
              <div class="info_type"><img src="../../assets/index/iphone.png" alt="">联系方式：</div>
              <div class="info_content"><span>{{workData.connextWay}}</span></div>
          </div>
      </div>
      <div class="detail_comment">
          <div class="comment_head">
              <div class="comment_number">服务评价（{{number}}）</div>
              <div class="more_comment" @click="show = true">查看更多<van-icon name="arrow" /></div>
          </div>
          <div class="comment_sommary">
              <div>
                  <span>好评</span><span>（{{goodNum}}）</span>
              </div>
              <div>
                  <span>中评</span><span>（{{num}}）</span>
              </div>
              <div>
                  <span>差评</span><span>（{{badNum}}）</span>
              </div>
          </div>
      </div>
      <div class="service_detail">
          <div class="detail_set" v-if="itemData.length>0">
              <div class="set_head">套餐详情</div>
              <div class="item_set" v-for="(v,i) in itemData" :key="i">
                  <div class="set">套餐{{i+1}}</div>
                  <div class="set_content">{{v.itemContent}}</div>
              </div>
          </div>
          <div class="tip">下单需求：{{workData.request | filterService}}</div>
          <div class="detail_img">
              <div class="set_head">作品展示</div>
              <div class="pics" v-for="(v,i) in imgData" :key="i">
                  <img :src=v.imgUrl alt="">
              </div>
          </div>
      </div>
      <div class="detail_bottom">
          <div @click="$router.push({name: 'MerchantIndex',params:{merchatId: workData.merchatId}})">商家</div>
          <div @click="collect">收藏</div>
          <div @click="checkLogin(1)">立即预约</div>
      </div>
      <van-popup v-model="show" position="right"><comment-list @listenClose="closeShow" :sendWorkId="cId"></comment-list></van-popup>
      <van-popup class="postReservation" v-model="showReser" position="bottom">
        <reservation :info="workData" :item="itemData" :imgA="imgData" @listenReserve="closeReser" @openTime="chooseTime" :selectTime="selectDate"></reservation>
      </van-popup>
       <van-popup class="post_slectTime" v-model="isTime" position="bottom">
         <van-datetime-picker
          v-model="selectSDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="isTime=false"
          @confirm="comSelDate"
        />
      </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, Rate, Popup, Toast, DatetimePicker } from 'vant'
import CommentList from './CommentList.vue'
import Reservation from './Reservation.vue'
export default {
  name: 'ServiceDetail',
  data () {
    return {
      like: false,
      type: '',
      number: null,
      num: null,
      goodNum: null,
      badNum: null,
      show: false,
      itemData: [],
      imgData: [],
      showReser: false,
      workData: {},
      cId: '',
      isTime: false,
      selectDate: null,
      minDate: null,
      maxDate: null,
      selectSDate: null,
      userId: sessionStorage.getItem('userId')
    }
  },
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanIcon: Icon,
    VanRate: Rate,
    VanPopup: Popup,
    CommentList,
    Reservation,
    Toast,
    VanDatetimePicker: DatetimePicker
  },
  mounted: function () {
    if (this.$route.params.id) {
      sessionStorage.setItem('worksId', this.$route.params.id)
      this.cId = this.$route.params.id
    } else {
      this.cId = sessionStorage.getItem('worksId')
    }
    this.$store.dispatch('findWorkAct', {id: this.cId})
      .then((res) => {
        if (res.data.success) {
          this.workData = res.data.workInfo[0]
          this.type = this.workData.serviceWay
          if (new Date(this.workData.enableDate).getTime() < new Date().getTime()) {
            this.minDate = new Date()
          } else {
            this.minDate = new Date(this.workData.enableDate)
          }
          this.maxDate = new Date(this.workData.enableEDate)
        }
      }).catch(res => {
        console.log(res)
      })
    this.$store.dispatch('findWorkImgAct', {id: this.cId})
      .then((res) => {
        if (res.data.success) {
          this.imgData = res.data.workImgInfo
          for (let i = 0; i < this.imgData.length; i++) {
            this.imgData[i].imgUrl = this.imgData[i].imgUrl
          }
        }
      }).catch(res => {
        console.log(res)
      })
    this.$store.dispatch('findWorkItemAct', {id: this.cId})
      .then((res) => {
        if (res.data.success) {
          this.itemData = res.data.workItemInfo
        }
      }).catch(res => {
        console.log(res)
      })
    if (this.userId !== 'undefined' || this.userId !== null) {
      this.$store.dispatch('findCollectWAct', {type: 0, typeId: this.cId, userId: this.userId})
        .then((res) => {
          this.like = res.data.success
        }).catch(res => {
          console.log(res)
        })
    }
    this.$store.dispatch('queryCommentNumAct', {workId: this.cId})
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
          this.number = res.data.allComment[0].num
          this.goodNum = res.data.goodComment[0].num
          this.badNum = res.data.badComment[0].num
          this.num = this.number - this.goodNum - this.badNum
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
    closeShow (data) {
      this.show = data
    },
    closeReser (data) {
      this.showReser = data
    },
    turnLogin () {
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
    },
    goReserve () {
      this.$store.dispatch('checkMerchatAct', {
        workId: this.workData.workId,
        userId: this.userId
      })
        .then((res) => {
          if (res.data.result) {
            Toast.fail('不能预约自己的！！！（PS你还要脸不！）')
          } else {
            this.showReser = true
          }
        }).catch(res => {
          console.log(res)
        })
    },
    comSelDate () {
      this.$store.dispatch('checkReserTimeAct', {workId: this.cId})
        .then((res) => {
          if (res.data.success) {
            if (res.data.workTimes.length > 0) {
              var tt = new Date(this.selectSDate).getTime()
              var ss, se
              for (let i = 0; i < res.data.workTimes.length; i++) {
                ss = new Date(res.data.workTimes[i].reserveDate).getTime()
                se = new Date(res.data.workTimes[i].newDate).getTime()
                if (tt > ss && tt < se) {
                  Toast.fail('该时间已有人预约！')
                  return
                }
              }
              this.selectDate = this.getTime(this.selectSDate, 'yyyy-MM-dd hh:mm:ss')
              this.isTime = false
            } else {
              this.selectDate = this.getTime(this.selectSDate, 'yyyy-MM-dd hh:mm:ss')
              this.isTime = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
    },
    chooseTime (data) {
      this.isTime = data
    },
    getTime (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      return fmt
    },
    collectWork () {
      this.like = !this.like
      this.$store.dispatch('collectWorNotAct', {
        flag: this.like,
        type: 0,
        typeId: this.workData.workId,
        userId: this.userId
      })
        .then((res) => {
          if (res.data.success) {
            console.log('操作成功了')
          }
        }).catch(res => {
          console.log(res)
        })
    },
    checkLogin (flag) {
      this.$store.dispatch('getUserInfoAct')
        .then((res) => {
          if (res.data.userInfo === null) {
            this.turnLogin()
          } else {
            this.userId = res.data.userInfo.userId
            if (flag === 1) {
              this.goReserve()
            } else if (flag === 2) {
              this.collectWork()
            }
          }
        }).catch(res => {
          console.log(res)
        })
    },
    collect () {
      if (this.like) {
        Toast('已收藏')
      } else {
        this.collectWork()
      }
    }
  },
  filters: {
    dateFormat (data, fmt) {
      var date = new Date(data)
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      return fmt
    },
    filterService (data) {
      if (data === 'null' || typeof (data) === 'undefined') {
        return '无'
      } else {
        return data
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/base.scss';
  #ServiceDetail {
    width:100%;
    height:100%;
    background: #f5f5f5;
    .wrap_img{
      width:100%;
      overflow: hidden;
    }
    .van-swipe{
        width:100%;
        img{
          width:100%;
          height:px2rem(750px);
        }
    }
    .detail_head{
        position: relative;
        background: white;
        .back{
            position: absolute;
            top:10%;
            left:5%;
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
        .detail_title{
            @include font-dpr(16px);
            padding: px2rem(40px) px2rem(30px);
        }
        .detail_price{
            @include font-dpr(18px);
            padding-left:px2rem(30px);
            padding-bottom:px2rem(40px);
            color:#e65058;
        }
    }
    .detail_info{
        @include font-dpr(14px);
        padding:px2rem(40px) px2rem(30px) 0;
        margin-top:px2rem(30px);
        background: white;
        img{
            width:px2rem(54px);
            height:px2rem(54px);
            margin-right:px2rem(20px);
            vertical-align: top;
        }
        .info_item{
            padding-bottom:px2rem(40px);
            padding-top:px2rem(20px);
            display: flex;
            flex-wrap: nowrap;
            border-bottom:1px solid #e6e6e6;
        }
        .info_type{
            word-break:keep-all;           /* 不换行 */
            white-space:nowrap;
            padding-right:px2rem(20px);
        }
        .info_content{
            flex-grow: 1;
        }
    }
    .detail_comment{
        @include font-dpr(14px);
        background: white;
        margin-top:px2rem(30px);
        padding:px2rem(40px) px2rem(30px);
        .comment_head{
            display: flex;
        }
        .comment_number{
            flex-grow: 1;
        }
        .more_comment{
            color:#f92c1d;
        }
        .comment_sommary{
            padding-top:px2rem(20px);
            display: flex;
            flex-wrap:wrap;
            div{
                background: #ffeeee;
                padding:px2rem(30px);
                margin-right:px2rem(40px);
                border-radius: 30px;
                .van-rate{
                    flex-grow:1;
                }
            }
        }
    }
    .van-popup{
        width:100%;
        height:100%;
    }
    .postReservation{
        height:50%;
    }
    .service_detail{
        background: white;
        margin-top: px2rem(30px);
        padding:px2rem(40px) px2rem(30px);
        padding-bottom:px2rem(150px);
        .set_head{
            width:100%;
            height:px2rem(120px);
            line-height: px2rem(120px);
            @include font-dpr(18px);
            text-align: center;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                width:px2rem(120px);
                height:px2rem(10px);
                background: pink;
                top:px2rem(110px);
                left:50%;
                margin-left: -0.55rem;
            }
        }
        .item_set{
            display: flex;
            flex-wrap: nowrap;
            @include font-dpr(14px);
            padding:px2rem(20px) 0;
            color:#161616;
        }
        .set{
            word-break:keep-all;           /* 不换行 */
            white-space:nowrap;
            padding-right:px2rem(40px);
        }
        .set_content{
            flex-grow: 1;
        }
        .tip{
            padding-top:px2rem(20px);
            color:#f56925;
            @include font-dpr(14px);
        }
        .detail_img{
           .set_head{
               margin-bottom:px2rem(20px);
           }
        }
        .pics{
            width:100%;
            &>img{
                width:100%;
                height:auto;
            }
        }
    }
    .detail_bottom{
        @include font-dpr(16px);
        display: flex;
        flex-wrap: nowrap;
        height:px2rem(180px);
        line-height:px2rem(180px);
        position: fixed;
        z-index: 2;
        bottom:0;
        left:0;
        width:100%;
        background: #fefefe;
        border-top:0.04rem solid #eeeeee;
        &>div{
            padding:0 px2rem(60px);
            &:last-child{
                flex-grow: 1;
                background: #f8a1b2;
                text-align: center;
            }
        }
    }
    .during{
      padding-left:30%;
    }
    .post_slectTime{
        height: 45%;
    }
     .wrap_but{
          width:100%;
          height:px2rem(150px);
          position: fixed;
          bottom:0;
          right:0;
          @include font-dpr(16px);
          button{
              width:50%;
              height:100%;
              border:none;
              outline: none;
              float:left;
              &:first-child{
                  background: #f99c35;
                  color:snow;
              }
              &:last-child{
                  background:white;
                  border:1px solid #999999;
              }
          }
      }
      .van-picker__cancel,.van-picker__confirm,.van-picker-column{
        @include font-dpr(16px);
     }
      .van-picker__toolbar{
          height:px2rem(80px);
          line-height: px2rem(80px);
      }
      .van-picker__columns,.van-picker-column{
        height:px2rem(700px) !important;
        @include font-dpr(16px);
      }
  }
</style>
