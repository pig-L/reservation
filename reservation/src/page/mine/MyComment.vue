<template>
  <div id="MyComment">
      <header><van-icon name="arrow-left" @click="$router.go(-1)"/><span>我的评论</span></header>
      <main>
          <div class="item" v-for="(v,i) in commentData" :key="i">
              <div class="itemHead">
                <div class="proInfo">
                    <div class="wrap_proImg"><img :src=v.proImg alt=""></div>
                    <div class="proName">{{v.userName}}</div>
                </div>
              </div>
              <div class="itemContent">
                <div class="itemInfo"><div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div><div><span>套餐：</span><span>{{workData[i].workTitle}}</span></div></div>
                <div class="ontime">服务{{v.ontime}}</div>
                <div class="content">
                  {{v.content}}
                </div>
                <div v-if="v.imgData">
                  <ul>
                    <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                    </li>
                  </ul>
                </div>
              </div>
              <div class="itemLink" @click="$router.push({name: '',params:{'workId': workData[i].workId}})">
                <div class="linkImg"><img :src=workData[i].viewImg alt=""></div>
                <div class="linkContent">
                  <div class="title">{{workData[i].workTitle}}</div>
                  <div class="price">￥{{workData[i].price}}</div>
                </div>
              </div>
          </div>
      </main>
  </div>
</template>

<script>
import { Icon, ImagePreview, Loading } from 'vant'
export default {
  name: 'MyComment',
  data () {
    return {
      commentData: [],
      workData: []
    }
  },
  components: {
    VanIcon: Icon,
    VanLoading: Loading
  },
  created () {
    this.$store.dispatch('queryCommentAct', {
      userId: this.$route.params.userId
    })
      .then((res) => {
        if (res.data.success) {
          this.commentData = res.data.commentData
          this.workData = res.data.workData
        }
      }).catch(res => {
        console.log(res)
      })
  },
  mounted: function () {
  },
  methods: {
    vieImg (imgData, index) {
      ImagePreview({
        images: imgData,
        startPosition: index
      })
    },
    filterImg (data) {
      return data.split(',')
    }
  },
  filters: {
    getDuring (data, fmt) {
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
    filterItem (data) {
      if (data === null) {
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
  #MyComment{
      width:100%;
      height: 100%;
      background: #f1f1f1;
      position: absolute;
      left:0;
      top:0;
      z-index: 2;
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
      .item{
        width:100%;
        padding: px2rem(50px) px2rem(30px) px2rem(20px);
        margin-bottom:px2rem(50px);
        box-sizing: border-box;
        background: white;
        ul{
          width:100%;
          overflow: hidden;
          li{
            float:left;
            width:50%;
            img{
              width:100%;
              height:px2rem(450px);
            }
          }
        }
      }
    .proInfo{
        width:100%;
        display: flex;
        height:px2rem(140px);
        line-height: px2rem(140px);
        color:#636363;
        .wrap_proImg{
            height:px2rem(140px);
            margin-right:px2rem(20px);
            border-radius: 50px;
            overflow: hidden;
            &>img{
                height:100%;
                width:auto;
            }
        }
        .proName{
            flex-grow: 1;
        }
    }
    .itemInfo{
      @include font-dpr(12px);
      color:#aaaaaa;
      padding:px2rem(15px);
      display: flex;
      flex-direction: row;
      width:100%;
      box-sizing: border-box;
      &>div:last-child{
        flex:1;
        padding-left:px2rem(30px);
        display: flex;
        flex-direction: row;
        span:last-child{
          flex:1;
        }
      }
    }
    .ontime{
      @include font-dpr(14px);
      color:#ffac38;
      padding-bottom:px2rem(5px);
    }
    .content{
      color:#323232;
      @include font-dpr(14px);
      text-align: justify;
      line-height: 24px;
      letter-spacing: 1px;
    }
    .itemLink{
      display: flex;
      flex-direction: row;
      padding:px2rem(50px) 0;
    }
    .linkImg{
      width:px2rem(300px);
      height:px2rem(250px);
      img{
        width:100%;
        height:100%;
      }
    }
    .linkContent{
      padding-left:px2rem(30px);
      flex:1;
      color:#323232;
      @include font-dpr(14px);
      .title{
        margin-top:px2rem(20px);
        margin-bottom:px2rem(20px);
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        overflow: hidden;
      }
    }
  }
</style>
