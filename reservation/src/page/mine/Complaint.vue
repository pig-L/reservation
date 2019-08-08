<template>
  <div id="Complaint">
      <header><van-icon name="arrow-left" @click="$router.go(-1)"/><span>投诉</span></header>
      <main>
          <div class="cp_tips">请填写投诉理由和上传相关的图片证据：</div>
          <div class="wrap_comment">
            <textarea v-model="comContent"></textarea>
            <div class="wr_cm_img">
                <ul>
                    <li v-for="(v,i) in imgShowArr" :key="i"><img alt="" :src="v.content"><van-icon name="clear" @click="removeImg(i)"/></li>
                </ul>
            </div>
            <div class="upLoad" v-show="isAddImg">
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg" multiple>
                    <van-icon name="photograph" />
                </van-uploader>
                <p>添加图片</p>
            </div>
          </div>
          <van-button  @click="complaint" :disabled="iscick">提交</van-button>
      </main>
  </div>
</template>

<script>
import { Icon, Uploader, Button, Toast } from 'vant'
export default {
  name: 'Complaint',
  data () {
    return {
      imgShowArr: [],
      comContent: '',
      iscick: false
    }
  },
  components: {
    VanIcon: Icon,
    VanUploader: Uploader,
    VanButton: Button,
    Toast
  },
  methods: {
    onRead (file) {
      this.imgShowArr.push(file)
    //   this.formData.append('images', file.file)
    },
    complaint () {
      var formData = new FormData()
      for (let i = 0; i < this.imgShowArr.length; i++) {
        formData.append('images', this.imgShowArr[i].file)
      }
      formData.append('content', this.comContent)
      formData.append('reservaId', this.$route.params.rid)
      formData.append('workId', this.$route.params.wid)
      formData.append('userId', sessionStorage.getItem('userId'))
      this.$store.dispatch('uploadComplaintAct', formData)
        .then((res) => {
          if (res.data.success) {
            Toast.success('提交成功')
            this.iscick = true
          } else {
            Toast.fail('提交失败')
            this.imgShowArr = []
            this.comContent = ''
          }
        }).catch(res => {
          console.log(res)
        })
    },
    removeImg (index) {
      this.imgShowArr.splice(index, 1)
    }
  },
  computed: {
    isAddImg () {
      if (this.imgShowArr.length > 4) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #Complaint{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    z-index: 2;
    background: white;
    padding-bottom:px2rem(190px);
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
      main{
          padding:px2rem(30px);
          button{
              margin-top:px2rem(60px);
              padding:0 px2rem(60px);
              border:none;
              outline: none;
              background: #ffc20e;
              color:white;
              @include font-dpr(16px);
          }
      }
      .wrap_comment{
          width:100%;
          height:px2rem(1000px);
          box-sizing: border-box;
          border:0.03rem solid #eeeeee;
          padding:px2rem(20px);
          background:white;
          textarea{
              width:100%;
              height:px2rem(450px);
              border:none;
              outline: none;
              letter-spacing: 2px;
              line-height: px2rem(60px);
              @include font-dpr(14px);
          }
      }
      .upLoad{
          margin-top:px2rem(30px);
          width:px2rem(200px);
          height:px2rem(200px);
          border:0.03rem dashed #999999;
          @include font-dpr(14px);
          text-align: center;
          color:#5f6368;
          .van-icon{
              @include font-dpr(24px);
              color:#5f6368;
              margin-top:px2rem(40px);
          }
      }
      .wr_cm_img{
          height:px2rem(250px);
          width:100%;
          ul{
              width:100%;
              overflow: hidden;
              li{
                  width:25%;
                  height:px2rem(250px);
                  float:left;
                  position: relative;
                 &>img{
                    width:100%;
                    height:px2rem(250px);
                }
                .van-icon-clear{
                    position:absolute;
                    @include font-dpr(16px);
                    color:#999999;
                    top:px2rem(20px);
                    right:px2rem(20px);
                }
              }
          }
      }
      .cp_tips{
        @include font-dpr(18px);
        padding:px2rem(40px) 0;
      }
  }
</style>
