<template>
  <div id="Works">
        <div class="item" @click="$router.push({name: 'ServiceDetail',params:{id:v.workId}})" v-for="(v,i) in worksData" :key="i">
            <div class="proInfo">
                <div class="wrap_proImg"><img :src=v.proImg alt=""></div>
                <div class="proName">{{v.userName}}</div>
                <div>职业：{{v.jobType}}</div>
            </div>
            <div class="wrap_item_img"><img :src="v.viewImg" alt=""></div>
            <div class="item_info">
                <div class="item_title">{{v.workTitle}}</div>
                <div class="item_price">￥{{v.price}}</div>
                <div class="item_detail">
                    <div class="item_type">服务方式:<span>{{v.serviceWay}}</span></div>
                    <div class="item_finish">下单量:<span>{{v.num}}</span></div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data () {
    return {
      worksData: []
    }
  },
  mounted: function () {
    this.$store.dispatch('selectWorksAct', {condition: 7})
      .then((res) => {
        if (res.data.success) {
          this.worksData = res.data.workInfo
        }
      }).catch(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="scss">
  @import '../../style/base.scss';
  #Works {
      background: #f1f1f1;
    .item{
        width:100%;
        padding: px2rem(50px) px2rem(30px) px2rem(20px);
        margin-bottom:px2rem(50px);
        box-sizing: border-box;
        background: white;
    }
    .proInfo{
        width:100%;
        display: flex;
        height:px2rem(150px);
        line-height: px2rem(150px);
        color:#636363;
        .wrap_proImg{
            height:px2rem(150px);
            margin-right:px2rem(20px);
            border-radius: 50px;
            overflow: hidden;
            width:px2rem(150px);
            &>img{
                height:100%;
                width:auto;
            }
        }
        .proName{
            flex-grow: 1;
        }
    }
    .wrap_item_img{
        width:100%;
        &>img{
            width:100%;
            height:auto;
        }
    }
    .item_info{
        color:#636363;
        .item_title{
            @include font-dpr(16px);
            padding:px2rem(20px) 0;
        }
    }
    .item_price{
        @include font-dpr(18px);
        color:#e65058;
    }
    .item_detail{
        padding-top:px2rem(20px);
        width:100%;
        display: flex;
        div{
            width:50%;
            box-sizing: border-box;
        }
        span{
            color:#fd0100
        }
        .item_finish{
            text-align: right;
            padding-right:20%;
        }
    }
  }
</style>
