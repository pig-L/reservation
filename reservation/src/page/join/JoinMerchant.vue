<template>
  <div id="JoinMerchant">
      <header>信息认证</header>
      <div class="warnTips">
          <div><span class="warning">！</span><span>请在认证开始仔细阅读以下内容：</span></div>
          <div class="tip_content">请务必提供您本人真实身份证进行认证，认证身份信息不得修改！</div>
          <div class="tip_content">认证之后请勿将您的店铺转让给他人，否则一切后果将由您承担！</div>
      </div>
      <div class="certification">
          <div class="title">
              请按照提示填写本人真实的资料
          </div>
          <div class="item">
              <div class="item_name">姓名：</div>
              <div class="item_content"><input type="text" v-model="name"></div>
          </div>
          <div class="item">
              <div class="item_name">身份证号码：</div>
              <div class="item_content"><input type="text" v-model="indentityNum"></div>
          </div>
          <div class="item">
              <div class="item_name add_tip">
                  <div>手持身份证正面照片：</div>
                  <div class="tips">注：证件文字信息必须清晰</div>
              </div>
              <div class="item_ct_img">
                  <img src="../../assets/index/prove.png" alt="">
                  <img :src="imgDate.content" alt="" class="put_img">
                  <div class="add_img">
                      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg">
                        <van-icon name="photograph" />
                      </van-uploader>
                  </div>
              </div>
          </div>
          <div class="item">
              <div class="item_name add_tip">
                  <div>手持身份证反面照片：</div>
                  <div class="tips">注：证件文字信息必须清晰</div>
              </div>
              <div class="item_ct_img">
                  <img src="../../assets/index/prove.png" alt="">
                  <img :src="imgDate_2.content" alt="" class="put_img">
                  <div class="add_img">
                      <van-uploader :after-read="onReadBack" accept="image/gif, image/jpeg, image/png, image/jpg">
                        <van-icon name="photograph" />
                      </van-uploader>
                  </div>
              </div>
          </div>
          <div class="item" v-if="status==='学生'">
              <div class="item_name add_tip">
                  <div>手持校园卡正面照片：</div>
              </div>
              <div class="item_ct_img">
                  <img :src="imgDate_3.content" alt="" class="put_img">
                  <div class="add_img">
                      <van-uploader :after-read="onReadStu" accept="image/gif, image/jpeg, image/png, image/jpg">
                        <van-icon name="photograph" />
                      </van-uploader>
                  </div>
              </div>
          </div>
           <div class="item" v-else>
              <div class="item_name add_tip">
                  <div>请上传营业执照或资格证书：</div>
              </div>
              <div class="item_ct_img">
                  <img :src="imgDate_3.content" alt="" class="put_img">
                  <div class="add_img">
                      <van-uploader :after-read="onReadChert" accept="image/gif, image/jpeg, image/png, image/jpg">
                        <van-icon name="photograph" />
                      </van-uploader>
                  </div>
              </div>
          </div>
          <div class="item">
              <div class="item_name add_tip">
                  <div>请上传设备照片:</div>
              </div>
              <div class="item_ct_img">
                  <img :src="imgDate_4.content" alt="" class="put_img">
                  <div class="add_img">
                      <van-uploader :after-read="onReadDevice" accept="image/gif, image/jpeg, image/png, image/jpg">
                        <van-icon name="photograph" />
                      </van-uploader>
                  </div>
              </div>
          </div>
      </div>
      <div class="wrap_but">
          <van-button @click="apply" :disabled="name===''||indentityNum===''||imgDate.content===null||imgDate_2.content===null||imgDate_3.content===null||imgDate_4.content===null">提交</van-button>
      </div>
  </div>
</template>

<script>
import { Icon, Uploader, Button, Toast } from 'vant'
export default {
  name: 'JoinMerchant',
  data () {
    return {
      imgDate: {file: null, content: null},
      imgDate_2: {file: null, content: null},
      status: '',
      imgDate_3: {file: null, content: null},
      imgDate_4: {file: null, content: null},
      name: '',
      indentityNum: '',
      userId: ''
    }
  },
  components: {
    VanIcon: Icon,
    VanUploader: Uploader,
    VanButton: Button,
    Toast
  },
  mounted: function () {
    this.$store.dispatch('getUserInfoAct')
      .then((res) => {
        if (res.data.userInfo === null) {
          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            mask: true,
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '请先登录'
          })

          let second = 3
          const timer = setInterval(() => {
            second--
            if (second) {
              toast.message = `现转到登录...`
            } else {
              clearInterval(timer)
              Toast.clear()
              this.$router.push({name: 'Login'})
            }
          }, 1000)
        } else {
          this.userId = res.data.userInfo.userId
          this.status = res.data.userInfo.jobType
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    onRead (file) {
      this.imgDate = file
    },
    onReadBack (file) {
      this.imgDate_2 = file
    },
    onReadStu (file) {
      this.imgDate_3 = file
    },
    onReadChert (file) {
      this.imgDate_3 = file
    },
    onReadDevice (file) {
      this.imgDate_4 = file
    },
    apply () {
      var formData = new FormData()
      formData.append('images', this.imgDate.file)
      formData.append('images', this.imgDate_2.file)
      formData.append('images', this.imgDate_3.file)
      formData.append('images', this.imgDate_4.file)
      formData.append('name', this.name)
      formData.append('identityNum', this.indentityNum)
      formData.append('userId', this.userId)
      this.$store.dispatch('joinUsAct', formData)
        .then((res) => {
          if (res.data.success) {
            Toast.success(res.data.message)
            this.name = ''
            this.indentityNum = ''
            this.imgDate.content = null
            this.imgDate_2.content = null
            this.imgDate_3.content = null
            this.imgDate_4.content = null
          } else {
            Toast.fail(res.data.message)
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
  #JoinMerchant{
      margin-bottom:px2rem(180px);
    header{
        width:100%;
        height:px2rem(120px);
        background: #ff69b4;
        line-height: px2rem(120px);
        text-align: center;
        color:white;
        @include font-dpr(20px);
    }
    .warnTips{
        padding:px2rem(40px) px2rem(30px);
        color:#272822;
        @include font-dpr(14px);
        .tip_content{
            padding-left:px2rem(50px);
            padding-top:px2rem(20px);
        }
        .warning{
            @include font-dpr(18px);
            color:#ae321c;
            font-weight: bolder;
        }
    }
    .certification{
        padding:px2rem(30px);
        color:#272822;
        @include font-dpr(14px);
        .item{
            display: flex;
            flex-direction: row;
            padding:px2rem(30px) 0;
            .tips{
                color: #f44;
                @include font-dpr(12px);
                text-align: left;
            }
        }
        .item_name{
            @include font-dpr(14px);
            flex:2;
            position:relative;
            padding-left:px2rem(20px);
            &::before{
                content: '*';
                position: absolute;
                left: 0;
                color: #f44;
                @include font-dpr(14px);
            }
            &.spc::before{
                color:white;
            }
        }
        .item_content{
            flex:3;
            input{
                padding:px2rem(10px) 0 px2rem(10px) px2rem(10px);
                width:100%;
                box-sizing: border-box;
                border:1px solid #a9a9a9;
            }
        }
        .item_ct_img{
            flex:3;
            display: flex;
            flex-wrap:wrap;
            img{
                width:px2rem(200px);
                height:px2rem(200px);
            }
            .put_img{
                width:40%;
                margin-left:px2rem(30px);
            }
            .add_img{
                line-height:px2rem(200px);
                margin-left:px2rem(30px);
                @include font-dpr(20px);
                color:#999999;
            }
        }
    }
    .wrap_but{
        text-align: center;
        padding-bottom:px2rem(80px);
        button{
            color:white;
            background-color: #f9af02;
            padding: 0 px2rem(80px);
        }
    }
  }
</style>
