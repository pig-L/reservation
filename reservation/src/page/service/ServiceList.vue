<template>
  <div id="ServiceList">
      <header>
          <van-nav-bar
            :title=title
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
            :fixed="true"
        />
      </header>
      <nav>
          <ul>
              <li @click="change(1)" :class="{active:isDefault}">默认</li>
              <li @click="change(2)" :class="{active:isPrice}">价格<van-icon name="arrow-down" /></li>
              <li @click="change(3)" :class="{active:isGood}">下单量<van-icon name="arrow-up" /></li>
              <li @click="change(4),show=true" :class="{active:isFilter}">筛选
                  <img src="../../assets/index/filter.png" alt="" v-if="isFilter">
                  <img src="../../assets/index/filter_2.png" alt="" v-else>
              </li>
          </ul>
      </nav>
      <main>
          <service @click="$router.push({name: 'ServiceDetail'})" :worksData="itemData">
          </service>
      </main>
      <van-popup v-model="show" position="right">
          <div class="popTitle"><van-icon name="cross" @click="show=false"/>筛选</div>
          <div class="wrap_moneySearch">
              <div class="search_title">
                  价格区间
              </div>
            <van-radio-group v-model="result">
                <van-cell-group>
                    <van-cell :title=v.item clickable @click="searchMoney(v.index)" v-for="(v,i) in list" :key="i">
                    <van-radio :name=v.item />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
          </div>
          <div class="self_input">
              <div><span>最低价格</span><span>：</span><input type="text" v-model="lowPrice" @focus="result=null"></div>
              <div><span>最高价格</span><span>：</span><input type="text" v-model="highPrice" @focus="result=null"></div>
              <van-button type="primary" @click="chooseSelect" :disabled="lowPrice===null||highPrice===null">确认</van-button>
          </div>
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="new Date()"
            :formatter="formatter"
            @confirm="selectDate"
            @cancel="show = false"
          />
      </van-popup>
  </div>
</template>

<script>
import { NavBar, Icon, Popup, RadioGroup, CellGroup, Cell, Radio, Button, DatetimePicker } from 'vant'
import Service from './Service.vue'
export default {
  name: 'ServiceList',
  data () {
    return {
      isPrice: false,
      isFilter: false,
      isDefault: true,
      isGood: false,
      show: false,
      list: [
        {item: '￥100以下', index: 1},
        {item: '￥101-￥200', index: 2},
        {item: '￥201-￥300', index: 3},
        {item: '￥301-￥400', index: 4},
        {item: '￥400以上', index: 5}
      ],
      result: null,
      lowPrice: null,
      highPrice: null,
      title: '',
      itemData: [],
      currentDate: null
    }
  },
  components: {
    VanNavBar: NavBar,
    VanIcon: Icon,
    VanPopup: Popup,
    VanRadioGroup: RadioGroup,
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanRadio: Radio,
    Service,
    VanButton: Button,
    VanDatetimePicker: DatetimePicker
  },
  methods: {
    searchMoney (data) {
      this.result = data
      this.lowPrice = null
      this.highPrice = null
      this.show = false
      if (this.result === 1) {
        this.selectWorks(4, 0, 100)
      } else if (this.result === 2) {
        this.selectWorks(4, 101, 200)
      } else if (this.result === 3) {
        this.selectWorks(4, 201, 300)
      } else if (this.result === 4) {
        this.selectWorks(4, 301, 400)
      } else {
        this.selectWorks(5, 401, null)
      }
    },
    change (num) {
      if (num === 1) {
        this.isPrice = false
        this.isDefault = true
        this.isGood = false
        this.isFilter = false
        this.selectWorks(1)
      } else if (num === 2) {
        this.isPrice = true
        this.isDefault = false
        this.isGood = false
        this.isFilter = false
        this.selectWorks(2)
      } else if (num === 3) {
        this.isPrice = false
        this.isDefault = false
        this.isGood = true
        this.isFilter = false
        this.selectWorks(3)
      } else {
        this.isPrice = false
        this.isDefault = false
        this.isGood = false
        this.isFilter = true
      }
    },
    selectWorks (kindof, low, up) {
      var condt
      if (typeof (this.$route.params.type) !== 'undefined' && this.$route.params.type !== null) {
        this.$store.dispatch('addworksTypeAct', this.$route.params.type)
      }
      this.title = sessionStorage.getItem('worksType')
      if (kindof === 4) {
        condt = {
          type: this.title,
          condition: kindof,
          lowp: low,
          highp: up
        }
      } else if (kindof === 5) {
        condt = {
          type: this.title,
          condition: kindof,
          price: low
        }
      } else if (kindof === 8) {
        condt = {
          type: this.title,
          condition: kindof,
          date: low
        }
      } else {
        condt = {
          type: this.title,
          condition: kindof
        }
      }
      this.$store.dispatch('selectWorksAct', condt)
        .then((res) => {
          if (res.data.success) {
            this.itemData = res.data.workInfo
          }
        }).catch(res => {
          console.log(res)
        })
    },
    chooseSelect () {
      this.selectWorks(4, this.lowPrice, this.highPrice)
      this.show = false
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    selectDate () {
      this.selectWorks(8, this.currentDate, null)
      this.show = false
    }
  },
  mounted: function () {
    this.selectWorks(1, null, null)
  }
}
</script>

<style lang="scss">
  @import '../../style/base.scss';
  #ServiceList {
      @include font-dpr(14px);
      background: #f5f5f5;
      margin-bottom:px2rem(270px);
      header{
        height:px2rem(120px);
      }
      .van-nav-bar{
        height:px2rem(120px);
        line-height: px2rem(120px);
        background:#ff69b4;
        color:white;
        .van-ellipsis{
            @include font-dpr(16px);
        }
        .van-nav-bar__text{
            color:white;
            @include font-dpr(14px);
        }
        .van-icon{
            @include font-dpr(20px);
            color:white;
        }
      }
    nav{
        width:100%;
        background: #e6e6e6;
        height:px2rem(120px);
        line-height: px2rem(120px);
        position:fixed;
        top:px2rem(120px);
        left:0;
        z-index: 2;
        ul{
            overflow: hidden;
            width:100%;
            li{
                width:25%;
                float:left;
                text-align: center;
                color:#d95587;
                img{
                    width:px2rem(45px);
                    height:px2rem(45px);
                }
                &.active{
                    background-color: #f8c2d2;
                    color:white;
                }
            }
        }
        .van-icon{
            padding-left:px2rem(10px);
        }
    }
    main{
      margin-top: px2rem(120px);
    }
    .van-popup{
        height:100%;
        width:65%;
        color:#636363;
        .popTitle{
            @include font-dpr(16px);
            height:px2rem(120px);
            line-height: px2rem(120px);
            border-bottom:1px solid #c1c1c1;
            text-align: center;
            position: relative;
            .van-icon{
                position:absolute;
                top:px2rem(40px);
                left:px2rem(30px);
                @include font-dpr(18px);
                color:#666666;
            }
        }
        .van-cell{
           @include font-dpr(14px);
           width:100%;
           height:px2rem(120px);
           box-sizing: border-box;
           border-bottom:1px solid #c1c1c1;
        }
        .van-radio__input{
           height:px2rem(120px);
           @include font-dpr(18px);
        }
        .wrap_moneySearch{
            width:100%;
            padding-left:px2rem(40px);
            .search_title{
                width:100%;
                height:px2rem(120px);
                line-height: px2rem(120px);
                box-sizing: border-box;
                border-bottom:1px solid #c1c1c1;
                @include font-dpr(14px);
            }
            .van-radio {
                padding-right:20%;
            }
        }
        .self_input{
            width:100%;
            padding:px2rem(50px) px2rem(40px) 0;
            div{
                display: flex;
                flex-direction: row;
                margin-bottom:px2rem(60px);
                span:first-child{
                    flex:3;
                    height:px2rem(80px);
                    line-height:px2rem(80px);
                    text-align: center;
                    background: #e5e5e5;
                    display: inline-block;
                }
                input{
                    flex:3;
                    border:none;
                    outline: none;
                }
            }
        }
        button{
          width:30%;
          height:px2rem(100px);
          line-height: px2rem(100px);
          @include font-dpr(14px);
          margin-top: px2rem(50px);
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
