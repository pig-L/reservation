<template>
  <div id="MyOrder">
      <header><van-icon name="arrow-left" @click="colseHide"/><span>我的订单</span></header>
      <div class="orderItem" v-for="(v,i) in orderData" :key = "i">
          <div class="wrap_all" @click="$router.push({name: 'OrderDetail',params:{rid: v.reservaId, wid: v.workId}})">
            <div class="wrap_ogImg"><img :src=v.viewImg alt=""></div>
            <div class="content">
                <div class="info_head">
                    <div class="name">{{v.workTitle}}</div>
                    <div class="status">{{v.orderType | filterType}}</div>
                </div>
                <div class="info_detail">
                    <div class="time"><span>预约时间：</span>{{v.reserveDate | filterTime('yyyy-MM-dd hh:mm:ss')}}</div>
                    <div class="price">￥{{v.price}}</div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  props: {
    orderData: {
      type: Array
    }
  },
  name: 'MyOrder',
  data () {
    return {
    }
  },
  components: {
    VanIcon: Icon
  },
  methods: {
    colseHide () {
      this.$emit('listenClose', false)
    }
  },
  filters: {
    filterType (data) {
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
      }
    },
    filterTime (data, fmt) {
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
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #MyOrder{
      background: #f4f3f5;
      header{
          width:100%;
          height:px2rem(120px);
          background: #ff69b4;
          line-height: px2rem(120px);
          text-align: center;
          color:white;
          @include font-dpr(20px);
          position:relative;
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
          margin:px2rem(20px) 0;
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
          .info_head,.info_detail{
              display:flex;
              flex-direction: row;
              padding-bottom:px2rem(30px);
              padding-left:px2rem(20px);
              @include font-dpr(14px);
          }
          .name,.time{
              flex:1;
          }
          .price{
            color:#f73101;
          }
          .status{
            color:#f7bb43;
          }
      }
  }
</style>
