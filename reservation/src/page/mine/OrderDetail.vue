<template>
  <div id="OrderDetail">
    <header><van-icon name="arrow-left" @click="$router.push({name: 'MineIndex'})"/><span>订单详情</span></header>
    <div class="orderItem">
        <div class="wrap_all">
        <div class="wrap_ogImg"><img :src="orderData.viewImg" alt=""></div>
        <div class="content">
            <div class="title">
                <div>{{orderData.workTitle}}</div>
                <div><van-icon name="arrow" /></div>
            </div>
            <div>￥{{orderData.price}}</div>
        </div>
        </div>
    </div>
    <div class="detail">
        <div class="de_title">详情：</div>
        <div class="detail_item">
            <div class="dt_name">订单编号：</div>
            <div class="dt_content">{{orderData.reservaId}}</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">预约人：</div>
            <div class="dt_content">{{orderData.userName}}</div>
        </div>
         <div class="detail_item">
            <div class="dt_name">预约人手机号：</div>
            <div class="dt_content">{{orderData.phoneNum}}</div>
        </div>
        <div class="detail_item" v-if="!!orderData.itemId">
            <div class="dt_name">套餐选择：</div>
            <div class="dt_content">套餐二：120/人</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">服务方式：</div>
            <div class="dt_content">{{orderData.serviceWay}}</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">预约时间：</div>
            <div class="dt_content">{{reserveDate}}</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">服务时长：</div>
            <div class="dt_content">{{orderData.totalTime}}小时</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">预约人数：</div>
            <div class="dt_content">{{orderData.reserveNum}}</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">下单时间：</div>
            <div class="dt_content">{{orderTime}}</div>
        </div>
        <div class="detail_item">
            <div class="dt_name">订单状态：</div>
            <div :class='["dt_content",status=== 4 ? "red" : "yellow"]'>{{status | filterState}}</div>
        </div>
         <div class="detail_item" v-if="status === 1||status === 3">
            <div class="dt_name">接单时间：</div>
            <div class="dt_content">{{acceptTime}}</div>
        </div>
        <div class="detail_item" v-if="status === 1||status === 4">
            <div class="dt_name">距执行订单时间：</div>
            <div class="dt_content det">
                <countdown
                :currentTime="new Date().getTime()"
                :startTime="new Date().getTime()"
                :endTime="new Date(reserveDate).getTime()"
                :endText="'已到预约时间'"
                :dayTxt="'天'"
                :hourTxt="'小时'"
                :minutesTxt="'分钟'"
                :secondsTxt="'秒'"
                @listenTime="showTime"
                >
                </countdown>
            </div>
        </div>
        <div class="wr_cancel" v-if="status === 0 &&merchant==='商家'">
            <van-button type="primary" size="small" @click="acceptOrder">接受订单</van-button>
            <van-button type="danger" size="small" @click="rejectOrder">拒绝订单</van-button>
        </div>
        <div class="wr_cancel" v-else-if="status === 0 &&merchant==='用户'">
            <van-button type="danger" size="small" @click="UserRejectOrder" :disabled="disCancel">取消订单</van-button>
        </div>
         <div class="wr_cancel" v-if="status === 1 &&merchant==='商家'">
            <van-button type="danger" size="small" @click="rejectOrder" :disabled="disCancel">取消订单</van-button>
        </div>
        <div class="wr_cancel" v-if="status === 1 &&merchant==='用户'">
            <van-button type="primary" size="small" @click="finishOrder" :disabled="finish">订单完成</van-button>
            <van-button type="danger" size="small" @click="UserRejectOrder" :disabled="disCancel">取消订单</van-button>
        </div>
        <div class="wr_cancel" v-if="status === 22&&merchant==='商家'">
            <van-button type="primary" size="small" @click="acceptReject">接受取消</van-button>
            <van-button type="danger" size="small" @click="rejectReject">拒绝取消</van-button>
        </div>
        <div class="wr_cancel" v-if="status === 21&&merchant==='用户'">
            <van-button type="primary" size="small" @click="acceptReject">接受取消</van-button>
            <van-button type="danger" size="small" @click="rejectReject">拒绝取消</van-button>
        </div>
        <div class="wrap_button" v-if="status === 3&&merchant==='用户' ">
          <div @click="$router.push({name: 'CommentOrder',params:{rid: orderData.reservaId}})" v-if="!orderData.commentId">评价</div>
          <div @click="$router.push({name: 'Complaint',params:{rid: orderData.reservaId, wid: orderData.workId}})">投诉</div>
        </div>
    </div>
  </div>
</template>

<script>
import { Icon, Button, Dialog } from 'vant'
import Countdown from '../../components/countdown.vue'
export default {
  name: 'OrderDetail',
  components: {
    VanIcon: Icon,
    Countdown,
    VanButton: Button,
    Dialog
  },
  data () {
    return {
      merchant: '',
      rsTime: null,
      disCancel: false,
      finish: true,
      orderData: {},
      reserveDate: null,
      orderTime: null,
      status: null,
      acceptTime: null,
      reservaId: '',
      workId: ''
    }
  },
  mounted: function () {
    if (this.$route.params.rid) {
      this.reservaId = this.$route.params.rid
      this.workId = this.$route.params.wid
      this.$store.dispatch('setOrderInfoAct', {rid: this.reservaId, wid: this.workId})
    } else {
      this.reservaId = sessionStorage.getItem('reservaId')
      this.workId = sessionStorage.getItem('workId')
    }
    this.$store.dispatch('selectReserveAct', {
      type: 0,
      rid: this.reservaId,
      wid: this.workId })
      .then((res) => {
        if (res.data.success) {
          this.orderData = res.data.orderInfo[0]
          this.status = this.orderData.orderType
          this.reserveDate = this.getDuring(new Date(this.orderData.reserveDate), 'yyyy-MM-dd hh:mm')
          this.orderTime = this.getDuring(new Date(this.orderData.orderTime), 'yyyy-MM-dd hh:mm:ss')
          this.acceptTime = this.getDuring(new Date(this.orderData.acceptTime), 'yyyy-MM-dd hh:mm:ss')
          if (sessionStorage.getItem('userId') === this.orderData.userId) {
            this.merchant = '用户'
          } else {
            this.merchant = '商家'
          }
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    showTime (data) {
      this.rsTime = data
      if (!this.rsTime.show) {
        this.finish = false
        this.disCancel = true
      }
    },
    dealOrder (tp) {
      this.$store.dispatch('updateOrderTypeAct', {
        type: tp,
        reserveId: this.orderData.reservaId })
        .then((res) => {
          if (res.data.success) {
            this.status = tp
            if (this.status === 1) {
              this.acceptTime = res.data.time
            }
          }
        }).catch(res => {
          console.log(res)
        })
    },
    acceptOrder () {
      Dialog.confirm({
        title: '提示',
        message: '确定要接受这个订单吗'
      }).then(() => {
        this.dealOrder(1)
      }).catch(() => {
        // on cancel
      })
    },
    rejectOrder () {
      Dialog.confirm({
        title: '提示',
        message: '确定要拒绝这个订单吗'
      }).then(() => {
        if (this.status === 1) {
          this.dealOrder(21)
        } else {
          this.dealOrder(2)
        }
      }).catch(() => {
        // on cancel
      })
    },
    UserRejectOrder () {
      Dialog.confirm({
        title: '提示',
        message: '确定要取消这个预约订单吗'
      }).then(() => {
        if (this.status === 1) {
          this.dealOrder(22)
        } else {
          this.dealOrder(2)
        }
      }).catch(() => {
        // on cancel
      })
    },
    finishOrder () {
      Dialog.confirm({
        title: '提示',
        message: '订单确定完成了吗'
      }).then(() => {
        this.dealOrder(3)
      }).catch(() => {
        // on cancel
      })
    },
    acceptReject () {
      Dialog.confirm({
        title: '提示',
        message: '确定接受取消订单吗'
      }).then(() => {
        this.dealOrder(2)
      }).catch(() => {
        // on cancel
      })
    },
    rejectReject () {
      Dialog.confirm({
        title: '提示',
        message: '确定拒绝取消订单吗'
      }).then(() => {
        this.dealOrder(1)
      }).catch(() => {
        // on cancel
      })
    },
    getDuring (date, fmt) {
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
    }
  },
  watch: {
    // 'rsTime.seconds': function () {
    //   console.log(this.rsTime)
    //   if (this.rsTime.day === 1 && this.rsTime.hour === '00' && this.rsTime.minutes === '00' && this.rsTime.seconds === '00') {
    //     this.disCancel = false
    //   } else if (this.rsTime.day === 0) {
    //     this.disCancel = true
    //   }
    //   if (this.rsTime.day === 0 && this.rsTime.hour === '00' && this.rsTime.minutes === '00' && this.rsTime.seconds === '00') {
    //     this.finish = false
    //     this.disCancel = true
    //   }
    // }
    rsTime: {
      handler (newValue, oldValue) {
        // if (this.rsTime.day === 1 && this.rsTime.hour === '00' && this.rsTime.minutes === '00' && this.rsTime.seconds === '00') {
        //   this.disCancel = false
        // } else if (this.rsTime.day === 0) {
        //   this.disCancel = true
        // }
        if (this.rsTime.day === 0 && this.rsTime.hour === '00' && this.rsTime.minutes === '00' && this.rsTime.seconds === '00') {
          this.finish = false
          this.disCancel = true
        }
      },
      deep: true
    }
  },
  filters: {
    filterState (data) {
      if (data === 0) {
        return '待接单'
      } else if (data === 1) {
        return '已接单'
      } else if (data === 2) {
        return '已取消'
      } else if (data === 3) {
        return '已完成'
      } else if (data === 4) {
        return '未完成'
      } else if (data === 21 || data === 22) {
        return '待取消'
      }
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
 @import '../../style/dailog.scss';
  #OrderDetail{
    background: #f4f3f5;
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 2;
    header{
          width:100%;
          height:px2rem(120px);
          background: #ff69b4;
          line-height: px2rem(120px);
          text-align: center;
          color:white;
          @include font-dpr(20px);
          position:fixed;
          z-index: 2;
          .van-icon{
              @include font-dpr(24px);
              position: absolute;
              top:px2rem(30px);
              left:3%;
          }
    }
    .orderItem{
        width:100%;
        background: white;
        box-sizing: border-box;
        margin:px2rem(140px) 0 px2rem(20px) 0;
        padding:px2rem(20px) px2rem(30px);
        color:#464547;
    }
    .wrap_all{
        display:flex;
        flex-direction: row;
    }
    .wrap_ogImg{
        width:px2rem(250px);
        &>img{
            width:100%;
            height:auto;
        }
    }
    .content{
        flex:1;
        padding-left:px2rem(20px);
        @include font-dpr(14px);
        &>div:last-child{
            color:#f99c35;
            padding-top:px2rem(10px);
        }
        .title{
            display:flex;
            flex-direction: row;
            &>div:first-child{
                flex:1;
            }
        }
    }
    .detail{
      width:100%;
      background: white;
      box-sizing: border-box;
      margin:px2rem(20px) 0;
      padding:px2rem(20px) px2rem(30px) px2rem(180px) px2rem(30px);
      color:#464547;
      .de_title{
          @include font-dpr(16px);
          height:px2rem(100px);
          line-height: px2rem(100px);
          padding-left:px2rem(20px);
          &::before{
              content: '';
              position: absolute;
              left: px2rem(20px);
              width:px2rem(10px);
              height:px2rem(100px);
              background: pink;
          }
      }
      .detail_item{
          display:flex;
          flex-direction: row;
          padding:px2rem(50px)  0 px2rem(50px) px2rem(20px);
          @include font-dpr(14px);
          .dt_name{
              flex:1;
          }
          .dt_content{
              flex:2;
          }
          .det{
              color:#e4350b;
          }
      }
      .wr_cancel{
          text-align: center;
      }
      .van-button--small {
          height:px2rem(100px);
          min-width: px2rem(120px);
          padding: 0 px2rem(20px);
          @include font-dpr(14px);
          margin:px2rem(50px);
      }
    }
    .yellow{
      color:yellow;
    }
    .red{
      color:red;
    }
    .wrap_button{
        text-align: center;
        margin-top:px2rem(40px);
        div{
            display: inline-block;
            width:px2rem(150px);
            height:px2rem(60px);
            text-align: center;
            line-height: px2rem(60px);
            border:0.05rem solid #f15b6c;
            border-radius:1rem;
            &:first-child{
                margin-right:px2rem(30px);
            }
        }
    }
  }
</style>
