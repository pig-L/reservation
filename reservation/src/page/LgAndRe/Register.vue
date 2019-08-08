<template>
  <div id="Register">
    <header><van-icon name="arrow-left" @click="$router.go(-1)"/><span>注册</span></header>
    <div class="content">
        <div class="input_item">
            <div class="status">手机号码:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入正确的11位手机号码" v-model="userphone" @focus="isphone=true,phoneTips='',isaClick=false" @blur="isPhone">
                <div>{{phoneTips}}</div>
                <van-icon name="clear" v-show="isphone" @click="userphone='',phoneTips='',isaClick=false"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">名称:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入名字或者昵称" v-model="userName" @focus="isName=true,nameTips=''" @blur="checkName">
                <div>{{nameTips}}</div>
                <van-icon name="clear" @click="userName=''" v-show="isName"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">密码:</div>
            <div class="wrap_input">
                <input type="password" placeholder="请输入6到18位数字和字符的密码" v-model="password" @focus="isPassword=true,passTips=''" @blur="isPass">
                <div>{{passTips}}</div>
                <van-icon name="clear" v-show="isPassword" @click="password='',passTips=''"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">确认密码:</div>
            <div class="wrap_input">
                <input type="password" placeholder="请重新输入密码" v-model="repassword" @focus="isComPassw = true" @blur="comfirmPass">
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
                    <van-radio name="学生">学生</van-radio>
                    <van-radio name="其他">其他</van-radio>
                </van-radio-group>
            </div>
        </div>
        <div class="input_item" v-if="radio === '学生'">
            <div class="status">学号:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入学号" v-model="identiNum" @focus="isNum=true,stuNumTips=''" @blur="checkstuNum">
                <div>{{stuNumTips}}</div>
                <van-icon name="clear" v-show="isNum" @click="identiNum='',stuNumTips=''"/>
            </div>
        </div>
        <div class="input_item" v-else>
            <div class="status">身份证:</div>
            <div class="wrap_input">
                <input type="text" placeholder="请输入身份证号码" v-model="identiNum" @focus="isStuNum=true,IdCartTips=''" @blur="isCardID(identiNum)">
                <div>{{IdCartTips}}</div>
                <van-icon name="clear" v-show="isStuNum" @click="identiNum='',IdCartTips=''"/>
            </div>
        </div>
        <div class="input_item">
            <div class="status">地址:</div>
            <div class="wrap_input">
                <input type="text" placeholder="如是学生则具体到宿舍门号" v-model="address" @focus="isAddress=true,addressTips = ''" @blur="checkAddress">
                <div>{{addressTips}}</div>
                <van-icon name="clear" @click="address=''" v-show="isAddress"/>
            </div>
        </div>
         <div class="agree"><input type="checkbox" v-model="checked"><span @click="show = true">同意岭师节约摄影装网平台的协议</span></div>
        <van-button :disabled="isaClick" @click="getRegister">注册</van-button>
    </div>
    <van-popup position="right" v-model="show"><protocol @listenProtocol="closeProtocol"></protocol></van-popup>
  </div>
</template>

<script>
import { Icon, Radio, RadioGroup, Toast, Popup, Dialog, Button } from 'vant'
import md5 from 'js-md5'
import Protocol from './Protocol.vue'
export default {
  name: 'Register',
  data () {
    return {
      userphone: null,
      password: '',
      userName: '',
      repassword: '',
      identiNum: '',
      address: '',
      radio: '学生',
      checked: true,
      phoneTips: '',
      isphone: false,
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
      isaClick: false
    }
  },
  components: {
    VanIcon: Icon,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    Toast,
    Protocol,
    VanPopup: Popup,
    Dialog,
    VanButton: Button
  },
  methods: {
    isPhone () {
      this.isphone = false
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.userphone)) {
        this.phoneTips = '输入的手机号格式错误'
      } else {
        this.$store.dispatch('finduserAct', {phoneNum: this.userphone})
          .then((res) => {
            if (res.data.success) {
              this.phoneTips = '该手机号已经注册'
              this.isaClick = true
            } else {
              this.phoneTips = ''
            }
          }).catch(res => {
            console.log(res)
          })
      }
    },
    checkName () {
      if (this.userName === '') {
        this.nameTips = '请输入名字或者昵称'
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
      }
    },
    getRegister () {
      if (this.userphone === '') {
        this.phoneTips = '请输入手机号码'
      } else if (this.phoneTips !== '') {
        this.isPhone()
      } else if (this.userName === '') {
        this.nameTips = '请输入名称或者昵称'
      } else if (this.password === '') {
        this.passTips = '请输入6到18位数字和字符组成的密码'
      } else if (this.password !== '' && this.passTips !== '') {
        this.passTips = '请输入6到18位数字和字符组合的密码'
      } else if (this.repassword === '') {
        this.repassTips = '请重新输入密码'
      } else if (this.repassword !== '' && this.repassTips !== '') {
        this.repassTips = '前后密码不一致'
      } else if (this.identiNum === '') {
        this.stuNumTips = '请输入'
      } else if (this.stuNumTips !== '') {
        this.stuNumTips = '请输入正确的学号'
      } else if (this.IdCartTips !== '') {
        this.IdCartTips = '请输入正确的身份证号码'
      } else if (this.address === '') {
        this.addressTips = '请输入地址'
      } else if (this.checked === true) {
        var passw = md5(this.password)
        var tt
        if (this.checked === true) {
          tt = 1
        } else {
          tt = 0
        }
        this.$store.dispatch('registerAct', {
          phoneNum: this.userphone,
          name: this.userName,
          password: passw,
          sex: this.sex,
          jobType: this.radio,
          identityNum: this.identiNum,
          address: this.address,
          agreement: tt})
          .then((res) => {
            if (res.data.success === true) {
              Toast({message: '注册成功', duration: 1000})
              setTimeout(() => { this.$router.go(-1) }, 1000)
            } else {
              Toast('注册失败')
            }
          }).catch(res => {
            console.log(res)
          })
      }
    },
    closeProtocol (data) {
      this.show = data
    }
  },
  mounted: function () {
    Dialog.alert({
      title: '注册前须知',
      message: '因岭师捷约摄妆网没有提供任何金钱交易渠道，所以用户和商家之间的金钱交易均由双方协商决定。如之间发生任何金钱交易问题，请双方之间交流解决，本网站一律不负责，恳请用户和商家交易时小心谨慎。'
    }).then(() => {
      // on close
    })
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  @import '../../style/dailog.scss';
  #Register{
    width:100%;
    position:absolute;
    top:0;
    left:0;
    z-index: 3;
    background-color: white;
    header{
      width:100%;
      height:px2rem(150px);
      background: #fe6699;
      @include font-dpr(20px);
      color:white;
      line-height: px2rem(150px);
      text-align: center;
      position: relative;
      .van-icon{
          left:3%;
          position: absolute;
          color:white;
          @include font-dpr(22px);
          top:px2rem(40px);
      }
    }
    .content{
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
            &::before {
            content: '*';
            position: absolute;
            left: 7px;
            font-size: 14px;
            color: #f44;
            @include font-dpr(14px);
            }
        }
        .agree{
             @include font-dpr(12px);
             color:#333333;
             line-height: px2rem(80px);
             height:px2rem(80px);
             text-align: left;
             padding-left:px2rem(50px);
             input[type="checkbox"]{
                 height:px2rem(40px);
                width:px2rem(40px);
                margin-right:px2rem(10px);
                display: inline-block;
                vertical-align: middle;
             }
        }
        button{
            width:60%;
            margin-top:px2rem(100px);
            background: #fab803;
            outline: none;
            border:none;
            @include font-dpr(16px);
            color:snow;
        }
    }
    .van-popup{
        width:100%;
        height:100%;
    }
  }
</style>
