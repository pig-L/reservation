<template>
  <div id="Merchant">
      <header>
          <input type="text" placeholder="店铺搜索,按回车或搜索" v-model="search_text" @focus="isClose=false" @blur="isClose=true" v-on:keyup.enter="selectMerchat">
          <van-icon :class="{show:isClose}" name="cross" @click="search_text = ''"/>
      </header>
      <nav>
        <ul>
          <li @click="isPhoto=true,isMakeup=false,isModel=false,isRent=false,selectMerchat()" :class="{active:isPhoto}">摄影</li>
          <li @click="isPhoto=false,isMakeup=true,isModel=false,isRent=false,selectMerchat()" :class="{active:isMakeup}">化妆</li>
          <li @click="isPhoto=false,isMakeup=false,isModel=true,isRent=false,selectMerchat()" :class="{active:isModel}">造型</li>
          <li @click="isPhoto=false,isMakeup=false,isModel=false,isRent=true,selectMerchat()" :class="{active:isRent}">服装出租</li>
        </ul>
      </nav>
      <div class="photo_type" v-if="isPhoto">
          <ul>
              <li><div @click="isPho_big=true,isPho_help=false,isPho_sigle=false,selectMerchat()" :class="{act:isPho_big}">毕业合照</div></li>
              <li><div @click="isPho_big=false,isPho_help=true,isPho_sigle=false,selectMerchat()" :class="{act:isPho_help}">毕业跟拍</div></li>
              <li><div @click="isPho_big=false,isPho_help=false,isPho_sigle=true,selectMerchat()" :class="{act:isPho_sigle}">个人写真</div></li>
          </ul>
      </div>
      <merchant-item  :showData="merchatData"></merchant-item>
  </div>
</template>

<script>
import { Icon } from 'vant'
import MerchantItem from './MerchantItem.vue'
export default {
  name: 'Merchant',
  components: {
    VanIcon: Icon,
    MerchantItem
  },
  data () {
    return {
      isPhoto: true,
      isMakeup: false,
      isModel: false,
      isRent: false,
      search_text: '',
      isClose: true,
      isPho_big: true,
      isPho_sigle: false,
      isPho_help: false,
      merchatData: []
    }
  },
  mounted: function () {
    this.selectMerchat()
  },
  methods: {
    selectMerchat () {
      var type
      if (this.isPhoto) {
        if (this.isPho_big) {
          type = '毕业大合照'
        } else if (this.isPho_help) {
          type = '毕业跟拍'
        } else if (this.isPho_sigle) {
          type = '个人写真'
        }
      } else if (this.isMakeup) {
        type = '化妆'
      } else if (this.isModel) {
        type = '造型'
      } else if (this.isRent) {
        type = '服装出租'
      }
      this.$store.dispatch('queryMerchatAct', {name: this.search_text, type: type})
        .then((res) => {
          if (res.data.success) {
            this.merchatData = res.data.data
          }
        }).catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #Merchant{
    width:100%;
    header{
        width:100%;
        height:px2rem(150px);
        text-align: center;
        line-height: px2rem(150px);
        position:relative;
        input{
            width:80%;
            height:px2rem(100px);
            box-sizing: border-box;
            border:px2rem(5px) solid #ffa07a;
            border-radius: 1rem;
            padding-left:px2rem(30px);
            padding-right:px2rem(100px);
            @include font-dpr(14px);
            &::-webkit-input-placeholder{
                @include font-dpr(14px);
            }
            &:-moz-placeholder{
                @include font-dpr(14px);
            }
            &::-moz-placeholder{
                @include font-dpr(14px);
            }
            &:-ms-input-placeholder {
                @include font-dpr(14px);
            }
        }
        .van-icon-cross{
            position: absolute;
            top:px2rem(50px);
            left:82%;
            background: #87ceeb;
            @include font-dpr(14px);
        }
        .show{
            display: none;
        }
    }
    nav{
        ul{
            width:100%;
            overflow: hidden;
            height:px2rem(120px);
            li{
                width:25%;
                height:px2rem(120px);
                line-height: px2rem(120px);
                text-align: center;
                float:left;
                @include font-dpr(14px);
                background: #fffafa;
                color:#ff69b4;
                &.active{
                    background: #ffc0cb;
                    color:white;
                }
            }
        }
    }
    .photo_type{
        width:100%;
        height:px2rem(150px);
        ul{
            width:100%;
            height:px2rem(150px);
            overflow: hidden;
            li{
                width:calc( 100% / 3 );
                float:left;
                height:px2rem(150px);
                line-height:px2rem(150px);
                text-align: center;
                &>div{
                    display: inline-block;
                    width:60%;
                    height:px2rem(90px);
                    line-height: px2rem(90px)-0.16rem;
                    box-sizing: border-box;
                    text-align: center;
                    @include font-dpr(14px);
                    border: 0.08rem solid #ffa07a;
                    border-radius: 1rem;
                    color:#ff8c69;
                }
                .act{
                    background:#ffa07a;
                    color:white;
                }
            }
        }
    }
  }
</style>
