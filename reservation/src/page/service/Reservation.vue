<template>
  <div id="bottom_reservation">
      <div class="btrs_head">
          <div><img :src=imgA[0].imgUrl alt=""></div>
          <div class="cont">
              <div>{{info.workTitle}}</div>
              <div>￥{{info.price}}</div>
          </div>
      </div>
      <main>
        <div class="select_set" v-if="item.length>0">
          <div class="set_head">套餐选择：</div>
          <van-radio-group v-model="chooseSet">
            <van-cell-group>
                <van-cell :title=v.itemContent clickable @click="chooseSet = v.itemId" v-for="(v,i) in item" :key="i">
                <van-radio :name=v.itemId />
                </van-cell>
            </van-cell-group>
            </van-radio-group>
        </div>
        <div class="sel_item">
            <div>预约日期：</div>
            <div><input type="text" v-model="selectTime" class="selectTime" readonly @click="listenTime" placeholder="请选择预定时间"></div>
        </div>
        <div class="sel_item">
            <div class="sel_num">预约人数：</div>
            <div>
                <van-stepper v-model="reserNum" :max="info.limitNum"/>
            </div>
        </div>
      </main>
      <div class="wrap_but">
          <button @click="reserve">确定</button>
          <button @click="closeReverse">取消</button>
      </div>
  </div>
</template>

<script>
import {Cell, Radio, CellGroup, RadioGroup, Stepper, Popup, Toast} from 'vant'
export default {
  props: {
    info: {
      type: Object
    },
    item: {
      type: Array
    },
    imgA: {
      type: Array
    },
    selectTime: {
      type: String
    }
  },
  name: 'Reservation',
  components: {
    VanCell: Cell,
    VanRadio: Radio,
    VanCellGroup: CellGroup,
    VanRadioGroup: RadioGroup,
    VanStepper: Stepper,
    VanPopup: Popup,
    Toast
  },
  data () {
    return {
      chooseSet: '',
      reserNum: 1
    }
  },
  methods: {
    getNumTime (time, n) {
      var tg = time.split(':')
      if (n === 1) {
        return parseInt(tg[0])
      } else if (n === 2) {
        return parseInt(tg[1])
      }
    },
    closeReverse () {
      this.$emit('listenReserve', false)
    },
    reserve () {
      var tag
      if (this.item.length > 0) {
        tag = {
          itemId: this.chooseSet,
          reserveTime: this.selectTime,
          reserveNum: this.reserNum,
          userId: sessionStorage.getItem('userId'),
          workId: this.info.workId,
          merchatId: this.info.merchatId,
          totalTime: this.info.totalTime
        }
      } else {
        tag = {
          reserveTime: this.selectTime,
          reserveNum: this.reserNum,
          userId: sessionStorage.getItem('userId'),
          workId: this.info.workId,
          merchatId: this.info.merchatId,
          totalTime: this.info.totalTime
        }
      }
      this.$store.dispatch('playReserveAct', tag)
        .then((res) => {
          if (res.data.success) {
            this.$router.push({name: 'reserveSucess', params: { reserveId: res.data.info.reserveId, workId: res.data.info.workId }})
          } else {
            Toast.fail('预约失败')
          }
        }).catch(res => {
          console.log(res)
        })
    },
    listenTime () {
      if (new Date(this.info.enableEDate).getTime() < new Date().getTime()) {
        Toast.fail('抱歉！可预约的时间已过！已不能预约')
      } else {
        this.$emit('openTime', true)
      }
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #bottom_reservation{
      width:100%;
      height:100%;
      main{
          height:calc( 100% - 3.61111rem );
          overflow: scroll;
      }
      .btrs_head{
          display: flex;
          flex-direction: row;
          padding:px2rem(20px);
          box-sizing: border-box;
          width:100%;
          & img{
              width:px2rem(300px);
              height:px2rem(200px);
          }
          .cont{
              padding-left:px2rem(20px);
              @include font-dpr(16px);
              &>div:last-child{
                  color:#e16823;
                  padding-top:px2rem(10px);
              }
          }
      }
      .select_set{
          padding:px2rem(20px);
      }
      .set_head{
        @include font-dpr(14px);
        padding-bottom:px2rem(30px);
      }
      .van-cell__title{
        @include font-dpr(12px);
        color:#333333;
        line-height: px2rem(48px);
        flex:3;
      }
      .van-radio__input{
          @include font-dpr(18px);
      }
      .sel_item{
          padding:px2rem(60px) px2rem(20px);
          width:100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          @include font-dpr(14px);
          input{
              border-radius: 0.5rem;
              text-align: center;
              padding:px2rem(10px) 0;
              border:none;
              outline:none;
              background: #d4d4d4;
          }
          .van-stepper{
            .van-stepper__input {
               @include font-dpr(14px);
            }
            button{
                width:px2rem(100px);
                height:px2rem(80px);
            }
            input{
                background: white;
            }
          }
      }
        .sel_num{
          padding-top:0.2rem;
        }
  }
</style>
