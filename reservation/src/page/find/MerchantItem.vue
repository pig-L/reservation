<template>
  <div id="MerchantItem">
      <div class="item" v-for="(v,i) in showData" :key="i" @click="$router.push({name: 'MerchantIndex',params:{merchatId: v.merchatId}})">
        <div class="wrap_img"><img :src=v.proImg alt=""></div>
        <div class="wrap_content">
            <div class="name">{{v.userName}}</div>
            <div class="address"><div>地址：</div><div class="realAddress">{{v.address}}</div></div>
            <div class="product">
                <div><span>订单数：</span><span>{{v.num}}</span></div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {} from 'vant'
export default {
  props: {
    showData: Array
  },
  name: 'MerchantItem'
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #MerchantItem{
    .item{
        width:100%;
        display:flex;
        flex-flow:row;
        padding:px2rem(40px) px2rem(20px);
        box-sizing: border-box;
        border-top:0.05rem solid #eeeeee;
    }
    .wrap_img{
        width:30%;
        margin-right:px2rem(50px);
        &>img{
            width:100%;
            height:auto;
        }
    }
    .wrap_content{
        flex:1;
        &>div:first-child{
            color:#434343;
            @include font-dpr(14px);
        }
    }
    .address{
        display: flex;
        color:#9b9b9b;
        padding-top:px2rem(20px);
        @include font-dpr(12px);
        flex-wrap: nowrap;
        div:first-child{
            word-break:keep-all;           /* 不换行 */
            white-space:nowrap;
        }
        .realAddress{
            flex-grow: 1;
        }
    }
    .product{
        display: flex;
        padding-top:px2rem(40px);
        flex-wrap:nowrap;
        &>div{
            width:50%;
            @include font-dpr(12px);
            color:#9b9b9b;
        }
    }
  }
</style>
