<template>
  <div id="Login">
    <header>登录</header>
    <main>
      <div class="wrap_inp1">
        <input v-model="inputPhone" type="text" placeholder="请输入手机号" @focus="input1=true,isphone=false" @blur="input1=false,isPhone()">
        <van-icon name="clear"  v-show="input1" @click="inputPhone='',isphone=false"/>
      </div>
      <div class="tips" :class="{active:isphone}">请输入正确的11位手机号码</div>
      <div class="wrap_inp2">
        <input v-model="inputPass" type="password" placeholder="请输入密码" @focus="input2=true,ispass=false" @blur="input2=false,isPass()">
        <van-icon name="clear" v-show="input2" @click="inputPass='',ispass=false"/>
      </div>
      <div class="tips" :class="{active:ispass}">请输入6-18位密码</div>
      <div class="wrap_button"><van-button type="default" @click="getLogin" :disabled="isclick">登录</van-button></div>
      <div class="Register" @click="$router.push({name: 'Register'})" v-if="!isclick">立马注册</div>
    </main>
  </div>
</template>

<script>
import { Icon, Button, Notify, Toast } from 'vant'
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      input1: false,
      input2: false,
      inputPhone: '',
      inputPass: '',
      isphone: false,
      ispass: false,
      isclick: false
    }
  },
  components: {
    VanIcon: Icon,
    VanButton: Button
  },
  mounted: function () {
    this.$store.dispatch('getUserInfoAct')
      .then((res) => {
        if (res.data.userInfo) {
          this.isclick = true
          Notify({
            message: '您已登录！！！',
            duration: 1000,
            background: '#fa7167'
          })
        }
      }).catch(res => {
        console.log(res)
      })
  },
  methods: {
    isPhone () {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.inputPhone)) {
        this.isphone = true
      } else {
        this.isphone = false
      }
    },
    isPass () {
      var tag = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if (!tag.test(this.inputPass)) {
        this.ispass = true
      } else {
        this.ispass = false
      }
    },
    getLogin () {
      var passwd = md5(this.inputPass)
      this.$store.dispatch('adLoginAct', {iphone: this.inputPhone, password: passwd})
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('adduserIdAct', res.data.info.userId)
            Toast.loading({
              duration: 1000,
              message: '登录中'
            })
            this.input1 = ''
            this.input2 = ''
            this.isclick = true
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          } else {
            Toast(res.data.message)
            this.input1 = ''
            this.input2 = ''
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
  #Login{
    width:100%;
    height:100%;
    header{
      width:100%;
      height:px2rem(150px);
      background: #fe6699;
      @include font-dpr(20px);
      color:white;
      line-height: px2rem(150px);
      text-align: center;
    }
    main{
      width:100%;
      text-align: center;
      margin-top:10%;
      div{
        display: inline-block;
        width:80%;
        height:px2rem(120px);
        text-align: left;
      }
    }
    .wrap_inp1,.wrap_inp2{
      position:relative;
      padding-right:px2rem(60px);;
    }
    input{
      border:none;
      outline: none;
      border-bottom:0.02rem solid #999999;
      width:100%;
      height:100%;
      @include font-dpr(16px);
    }
    .van-icon{
      position:absolute;
      right:px2rem(0px);
      top:px2rem(30px);
      color:#999999;
      @include font-dpr(18px);
    }
    .wrap_button{
      margin-top:px2rem(60px);
      .van-button{
        width:100%;
        height:100%;
        background: #fe6699;
        color:snow;
        @include font-dpr(16px);
      }
    }
    .tips{
      color:white;
      margin-top:px2rem(20px);
      @include font-dpr(12px);
    }
    .active{
      color:#fe0000;
    }
    .Register{
        padding:px2rem(30px) 0;
        @include font-dpr(14px);
        color:#fb8622;
        margin-top:px2rem(100px);
    }
  }
</style>
