<template>
  <div id="Info">
    <header><van-icon name="arrow-left" @click="$router.go(-1)"/><span>个人信息修改</span></header>
    <div class="content">
        <div class="input_item">
            <div class="status">名称:</div>
            <div class="wrap_input">
                <input type="text" v-model="userName" @focus="isName=true,nameTips=''" v-on:input="checkName">
                <div>{{nameTips}}</div>
                <van-icon name="clear" @click="userName=''" v-show="isName"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">新密码:</div>
            <div class="wrap_input">
                <input type="password" v-model="password" @focus="isPassword=true,passTips=''" v-on:input="isPass">
                <div>{{passTips}}</div>
                <van-icon name="clear" v-show="isPassword" @click="password='',passTips=''"/>
            </div>
        </div>
        <div class="input_item" v-if="isShowPass">
            <div class="status">确认密码:</div>
            <div class="wrap_input">
                <input type="password" placeholder="请重新输入密码" v-model="repassword" @focus="isComPassw = true,repassTips=''" v-on:input="comfirmPass">
                <div>{{repassTips}}</div>
                <van-icon name="clear" v-show="isComPassw" @click="repassword='',repassTips=''"/>
            </div>
        </div>
         <div class="input_item">
            <div class="status">性别：</div>
            <div>
                <van-radio-group v-model="sex">
                    <van-radio name="女">女</van-radio>
                    <van-radio name="男">男</van-radio>
                </van-radio-group>
            </div>
        </div>
         <div class="input_item">
            <div class="status">职位：</div>
            <div>
                <van-radio-group v-model="radio">
                    <van-radio name="学生" @click="IdCartTips='',comfirmPass ()">学生</van-radio>
                    <van-radio name="其他" @click="stuNumTips='',isCardID(identiNum)">其他</van-radio>
                </van-radio-group>
            </div>
        </div>
        <div class="input_item" v-if="radio === '学生'">
            <div class="status">学号:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入学号" v-model="identiNum" @focus="isNum=true,stuNumTips=''" v-on:input="checkstuNum">
                <div>{{stuNumTips}}</div>
                <van-icon name="clear" v-show="isNum" @click="identiNum='',stuNumTips=''"/>
            </div>
        </div>
        <div class="input_item" v-else>
            <div class="status">身份证:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入身份证号码" v-model="identiNum" @focus="isStuNum=true,IdCartTips=''" v-on:input="isCardID(identiNum)">
                <div>{{IdCartTips}}</div>
                <van-icon name="clear" v-show="isStuNum" @click="identiNum='',IdCartTips=''"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">地址:</div>
            <div class="wrap_input">
                <input type="text" v-model="address" @focus="isAddress=true,addressTips = ''" v-on:input="checkAddress">
                <div>{{addressTips}}</div>
                <van-icon name="clear" @click="address=''" v-show="isAddress"/>
            </div>
        </div>
        <div class="wrap_button">
          <van-button :disabled="isaClick" @click="goEdit" type="info">修改</van-button>
          <van-button @click="$router.go(-1)">取消</van-button>
        </div>
    </div>
    <div class="wrap_bg" v-if="merchatId!=null">
      <div class="bg_tips">设置店铺背景图片</div>
      <div class="bg">
        <img :src=bgimg alt="">
      </div>
      <div class="wrap_upload">
        <van-uploader :after-read="onRead">
          <van-icon name="photograph" />
        </van-uploader>
        <van-button :disabled="isaClick" @click="goUpload" type="info">确定上传</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Radio, RadioGroup, Toast, Popup, Dialog, Button, Uploader } from 'vant'
import md5 from 'js-md5'
export default {
  name: 'InfoMOdify',
  data () {
    return {
      password: '',
      userName: null,
      repassword: '',
      identiNum: null,
      address: null,
      radio: '学生',
      phoneTips: '',
      isName: false,
      nameTips: '',
      passTips: '',
      isPassword: false,
      isComPassw: false,
      repassTips: '',
      isNum: false,
      stuNumTips: '',
      IdCartTips: '',
      isStuNum: false,
      isAddress: false,
      addressTips: '',
      sex: '女',
      show: false,
      isShowPass: false,
      upimg: null,
      bgimg: null,
      merchatId: null,
      userId: null
    }
  },
  components: {
    VanIcon: Icon,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    Toast,
    VanPopup: Popup,
    Dialog,
    VanButton: Button,
    VanUploader: Uploader
  },
  methods: {
    checkName () {
      if (this.userName === '') {
        this.nameTips = '请输入名字或者昵称'
      } else {
        this.nameTips = ''
      }
      this.isName = false
    },
    isPass () {
      this.isPassword = false
      var tag = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (!tag.test(this.password)) {
        this.passTips = '请输入6到18位数字和字符组合的密码'
      } else {
        this.passTips = ''
      }
    },
    comfirmPass () {
      this.isComPassw = false
      this.repassTips = ''
      if (this.password !== this.repassword) {
        this.repassTips = '前后密码不一致'
      } else {
        this.repassTips = ''
      }
    },
    checkstuNum () {
      this.isNum = false
      this.stuNumTips = ''
      var tag = /^[0-9]{10}$/
      if (!tag.test(this.identiNum)) {
        this.stuNumTips = '请输入正确的学号'
      } else {
        this.stuNumTips = ''
      }
    },
    isCardID (param) {
      this.isStuNum = false
      this.IdCartTips = ''
      var cityAreaId = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}
      if (!/^\d{17}(\d|x)$/i.test(param)) {
        this.IdCartTips = '你输入的身份证长度或格式错误'
      } else if (cityAreaId[parseInt(param.substr(0, 2))] == null) {
        this.IdCartTips = '你的身份证地区非法'
      } else {
        var re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
        var arrSplit = param.match(re)
        var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
        var bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
        if (!bGoodDay) {
          this.IdCartTips = '身份证上的出生日期不符合日历日期'
        } else {
          var iSum = 0
          var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          var validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
          for (var i = 0; i < param.length - 1; i++) {
            iSum += param.charAt(i) * weight[i]
          }
          var mode = iSum % 11
          if (param.charAt(param.length - 1) !== validate[mode]) {
            this.IdCartTips = '你输入的身份证号校验不通过'
          } else {
            this.IdCartTips = ''
          }
        }
      }
    },
    checkAddress () {
      this.isAddress = false
      if (this.address === '') {
        this.addressTips = '请输入地址'
      } else {
        this.addressTips = ''
      }
    },
    goEdit () {
      var tag
      if (this.userName === '') {
        this.nameTips = '请输入名称或者昵称'
      } else if (this.identiNum === '') {
        this.stuNumTips = '请输入'
      } else if (this.stuNumTips !== '') {
        this.stuNumTips = '请输入正确的学号'
      } else if (this.IdCartTips !== '') {
        this.IdCartTips = '请输入正确的身份证号码'
      } else if (this.address === '') {
        this.addressTips = '请输入地址'
      } else if (!this.password) {
        tag = {
          tag: 0,
          name: this.userName,
          sex: this.sex,
          jobType: this.radio,
          identityNum: this.identiNum,
          address: this.address,
          userId: this.userId
        }
        this.$store.dispatch('updateUserInfoAct', tag)
          .then((res) => {
            if (res.data.success === true) {
              Toast.success('修改成功')
            } else {
              Toast.fail('修改失败')
            }
          }).catch(res => {
            console.log(res)
          })
      } else {
        if (this.repassword === '') {
          this.repassTips = '请重新输入密码'
        } else {
          var passw = md5(this.password)
          tag = {
            tag: 1,
            name: this.userName,
            password: passw,
            sex: this.sex,
            jobType: this.radio,
            identityNum: this.identiNum,
            address: this.address,
            userId: this.userId
          }
          this.$store.dispatch('updateUserInfoAct', tag)
            .then((res) => {
              if (res.data.success === true) {
                Toast.success('修改成功')
              } else {
                Toast.fail('修改失败')
              }
            }).catch(res => {
              console.log(res)
            })
        }
      }
    },
    onRead (file) {
      this.upimg = file
      this.bgimg = this.upimg.content
    },
    goUpload () {
      var formData = new FormData()
      formData.append('images', this.upimg.file)
      formData.append('type', 1)
      formData.append('id', this.merchatId)
      this.$store.dispatch('uploadProImgAct', formData)
        .then((res) => {
          if (res.data.success) {
            Toast.success('上传成功')
          } else {
            Toast.fail('上传失败')
          }
        }).catch(res => {
          console.log(res)
        })
    }
  },
  mounted: function () {
    this.$store.dispatch('getUserInfoAct')
      .then((res) => {
        console.log(res.data)
        this.userName = res.data.userInfo.userName
        this.sex = res.data.userInfo.sex
        this.radio = res.data.userInfo.jobType
        this.identiNum = res.data.userInfo.identityNum
        this.address = res.data.userInfo.address
        this.userId = res.data.userInfo.userId
        this.$store.dispatch('getUsersAct', {userId: res.data.userInfo.userId})
          .then((res) => {
            if (res.data.success) {
              this.bgimg = res.data.merchatInfo.bgImg
              this.merchatId = res.data.merchatInfo.merchatId
            }
          }).catch(res => {
            console.log(res)
          })
      }).catch(res => {
        console.log(res)
      })
  },
  computed: {
    isaClick: function () {
      if (this.nameTips === '' && this.passTips === '' && this.repassTips === '' && this.stuNumTips === '' && this.IdCartTips === '' && this.addressTips === '') {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    password () {
      this.isShowPass = true
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  @import '../../style/dailog.scss';
  #Info{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    z-index: 3;
    header{
      width:100%;
      height:px2rem(120px);
      position: fixed;
      z-index: 2;
      top:0;
      left:0;
      background: #fe6699;
      @include font-dpr(18px);
      color:white;
      line-height: px2rem(120px);
      text-align: center;
      .van-icon{
          left:3%;
          position: absolute;
          color:white;
          @include font-dpr(20px);
          top:px2rem(30px);
      }
    }
    .content{
        margin-top:px2rem(120px);
        padding:px2rem(10px) px2rem(30px) px2rem(50px);
        text-align: center;
        .input_item{
            @include font-dpr(14px);
            display: flex;
            flex-direction: row;
            height:px2rem(180px);
            color: #323233;
            input{
                border:none;
                @include font-dpr(14px);
                height:70%;
                width:100%;
            }
            .wrap_input{
                flex:1;
                position: relative;
                padding-right:px2rem(60px);
                div{
                    height:30%;
                    @include font-dpr(12px);
                    color:#ff4444;
                    text-align: left;
                }
            }
            .van-icon-checked{
                color:#1989fa;
            }
            .van-radio__input{
                height:px2rem(70px);
                width:px2rem(60px);
            }
            .van-icon{
                top:0;
                right:0;
            }
            .van-icon-clear{
              position:absolute;
              top:px2rem(40px);
            }
            .van-radio{
                display: inline-block;
            }
            .van-radio__input{
                @include font-dpr(18px);
            }
            .van-radio__label{
                height:px2rem(150px);
                line-height: px2rem(150px);
            }
        }
        .status{
            position:relative;
            padding-left:px2rem(40px);
            text-align: left;
            width:px2rem(220px);
            line-height: px2rem(140px);
        }
        button{
          margin-top:px2rem(100px);
          margin-right:px2rem(30px);
        }
    }
    button{
        padding:px2rem(20px) px2rem(60px);
        background: #00A2E9;
        outline: none;
        border:none;
        @include font-dpr(14px);
        color:white;
    }
    .van-button {
      height:auto;
      line-height: normal;
    }
    .wrap_bg{
      padding:px2rem(40px) px2rem(40px) px2rem(100px) px2rem(40px);
      background: white;
      .bg{
        width:100%;
        height:px2rem(650px);
        overflow: hidden;
        &>img{
          width:100%;
          height:auto;
        }
      }
      .bg_tips{
        color:#173d7e;
        @include font-dpr(16px);
        padding:px2rem(40px) 0;
      }
      .van-icon-photograph::before{
        @include font-dpr(24px);
      }
    }
    .wrap_upload{
      text-align: center;
      margin-top: px2rem(60px);
      button{
        margin-left: px2rem(60px);
      }
    }
  }
</style>
