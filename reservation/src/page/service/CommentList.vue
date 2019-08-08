<template>
  <div id="CommentList">
      <div class="comment_head"><van-icon name="arrow-left" @click="closeLay"/>评价</div>
      <van-tabs  @click="searchComment">
        <van-tab title="全部">
          <div class="comment_item" v-for="(v,i) in commentData" :key="i">
            <div class="item_head">
                <div class="wrap_img">
                    <img :src=v.proImg alt="">
                </div>
                <div class="name">{{v.userName}}</div>
                <div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div>
            </div>
            <div class="item_content">
                {{v.content}}
            </div>
            <div class="pics" v-if="v.imgData">
                <ul>
                  <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                  </li>
                </ul>
            </div>
          </div>
        </van-tab>
        <van-tab title="好评">
          <div class="comment_item" v-for="(v,i) in commentData" :key="i">
            <div class="item_head">
                <div class="wrap_img">
                    <img :src=v.proImg alt="">
                </div>
                <div class="name">{{v.userName}}</div>
                <div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div>
            </div>
            <div class="item_content">
                {{v.content}}
            </div>
            <div class="pics" v-if="v.imgData">
                <ul>
                  <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                  </li>
                </ul>
            </div>
          </div>
        </van-tab>
        <van-tab title="中评">
         <div class="comment_item" v-for="(v,i) in commentData" :key="i">
            <div class="item_head">
                <div class="wrap_img">
                    <img :src=v.proImg alt="">
                </div>
                <div class="name">{{v.userName}}</div>
                <div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div>
            </div>
            <div class="item_content">
                {{v.content}}
            </div>
            <div class="pics" v-if="v.imgData">
                <ul>
                  <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                  </li>
                </ul>
            </div>
          </div>
        </van-tab>
        <van-tab title="差评">
         <div class="comment_item" v-for="(v,i) in commentData" :key="i">
            <div class="item_head">
                <div class="wrap_img">
                    <img :src=v.proImg alt="">
                </div>
                <div class="name">{{v.userName}}</div>
                <div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div>
            </div>
            <div class="item_content">
                {{v.content}}
            </div>
            <div class="pics" v-if="v.imgData">
                <ul>
                  <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                  </li>
                </ul>
            </div>
          </div>
        </van-tab>
        <van-tab title="有图">
          <div class="comment_item" v-for="(v,i) in commentData" :key="i">
            <div class="item_head">
                <div class="wrap_img">
                    <img :src=v.proImg alt="">
                </div>
                <div class="name">{{v.userName}}</div>
                <div>{{v.commentDate | getDuring('yyyy-MM-dd')}}</div>
            </div>
            <div class="item_content">
                {{v.content}}
            </div>
            <div class="pics" v-if="v.imgData">
                <ul>
                  <li v-for="(vv,ii) in  filterImg(v.imgData)" :key=ii>
                      <img :src=vv alt="" @click="vieImg(filterImg(v.imgData),ii)">
                  </li>
                </ul>
            </div>
          </div>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import {Icon, Tabs, Tab, ImagePreview} from 'vant'
export default {
  props: {
    sendWorkId: {
      type: String
    }
  },
  name: 'CommentList',
  components: {
    VanIcon: Icon,
    VanTabs: Tabs,
    VanTab: Tab
  },
  data () {
    return {
      commentData: []
    }
  },
  mounted: function () {
    this.searchComment(0)
  },
  methods: {
    closeLay () {
      this.$emit('listenClose', false)
    },
    vieImg (imgData, index) {
      ImagePreview({
        images: imgData,
        startPosition: index
      })
    },
    filterImg (data) {
      return data.split(',')
    },
    searchComment (index) {
      console.log(index)
      this.$store.dispatch('queryWorkCommentAct', {type: index, workId: this.sendWorkId})
        .then((res) => {
          if (res.data.success) {
            this.commentData = res.data.commentData
          }
        }).catch(res => {
          console.log(res)
        })
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
  #CommentList {
    width:100%;
    height:100%;
    .comment_head{
        @include font-dpr(18px);
        width:100%;
        height:px2rem(120px);
        line-height: px2rem(120px);
        text-align: center;
        color:#717171;
        position:relative;
        background: #ffeeee;
        .van-icon{
           position:absolute;
           left:px2rem(30px);
           top:px2rem(20px);
           @include font-dpr(30px);
        }
    }
   .van-tabs{
      .van-tabs__wrap{
         height:px2rem(120px);
      }
      .van-tabs__line{
        background-color: #ff4444;
        height:px2rem(4px);
      }
      &.van-tabs--line{
        padding-top:px2rem(140px);
      }
      .van-tab{
        @include font-dpr(14px);
        color:black;
        line-height: px2rem(120px);
        height:px2rem(120px);
      }
      .van-tab--active{
          color:#ff4444;
      }
   }
    .comment_item{
        width:100%;
        padding:px2rem(50px) px2rem(30px);
        box-sizing: border-box;
        .item_head{
            width:100%;
            line-height: px2rem(120px);
            display: flex;
            color:#9e9e9e;
        }
        .wrap_img{
            width:px2rem(120px);
            height:px2rem(120px);
            margin-right:px2rem(20px);
            border-radius: 50px;
            overflow: hidden;
            &>img{
                width:auto;
                height:100%;
            }
        }
        .name{
            flex-grow: 1;
        }
        .item_content{
            padding:px2rem(20px) 0;
            @include font-dpr(16px);
        }
        .pics{
            width:100%;
            ul{
                width:100%;
                overflow: hidden;
                li{
                    float:left;
                    width:25%;
                    padding-right:px2rem(20px);
                    box-sizing: border-box;
                    &>img{
                        width:100%;
                        height:auto;
                    }
                }
            }
        }
    }
  }
</style>
