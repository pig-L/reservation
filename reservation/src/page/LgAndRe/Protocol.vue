<template>
  <div id="Protocol">
      <header><van-icon name="arrow-left" @click="colseHide"/>岭师捷约摄妆网协议</header>
      <main>
          <div class="title">本协议由您与岭师捷约摄妆网共同缔结，本协议具有合同效力。</div>
          <div class="item">
              <h4>一、协议内容及签署</h4>
              <p>1、任何人使用改网站均均受本协议约束。</p>
              <p>2、您应当在使用岭师捷约摄妆网服务之前认真阅读全部协议内容。无论您事实上是否在使用岭师捷约摄妆网之前认真阅读了本协议内容，只要您使用本网站服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容等理由，主张本协议无效，或要求撤销本协议。</p>
              <p>3、您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用岭师捷约摄妆网的服务。</p>
          </div>
          <div class="item">
              <h4>二、注册</h4>
              <p>1、注册者资格</p>
              <p class="tips">您确认，在您完成注册程序使用岭师捷约摄妆网服务时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且本网站有权注销（永久冻结）您的账户，并向您及您的监护人索偿。</p>
              <p>2、账户</p>
              <p class="tips">当您注册时，您设置的账号名不得侵犯或涉嫌侵犯他人合法权益。且您应对您的账户和密码的安全，以及对通过您的账户和密码实施的行为负责。</p>
              <p>3、用户</p>
              <p class="tips">在注册时，您应当按照法律法规要求，或注册页面的提示准确提供，并及时更新您的资料，以使之真实、及时，完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，本网站有权向您发出询问及要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部岭师捷约摄妆网服务。并且岭师捷约摄妆网对此不承担任何责任，您将承担因此产生的任何直接或间接支出。</p>
              <p class="tips warn">因岭师捷约摄妆网没有提供任何金钱交易渠道，所以用户和商家之间的金钱交易均由双方协商决定。如之间发生任何金钱交易问题，请双方之间交流解决，本网站一律不负责，恳请用户和商家交易时小心谨慎。</p>
          </div>
          <div class="item">
              <h4>三、网站服务</h4>
              <p>通过岭师捷约摄妆网提供的服务，用户可在本网站上发布交易信息、查询商品和服务信息、达成交易意向并进行私下交易、对其服务进行评价。</p>
          </div>
          <div class="item">
              <h4>四、服务使用规范</h4>
              <p>1、在使用岭师捷约摄妆网的服务过程中，您承诺遵守以下约定：</p>
              <p class="tips">1)在使用本网站服务过程中实施的所有行为均遵守国家法律、法规等规范性文件及岭师捷约摄妆网的各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保岭师捷约摄妆网免于因此产生任何损失。</p>
              <p class="tips">2)在与其他会员交易过程中，遵守诚实信用原则，不采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。</p>
              <p class="tips">3)不发布国家禁止销售的或限制销售的商品或服务信息（除非取得合法且足够的许可）不发布涉嫌侵犯他人知识产权或其它合法权益的商品或服务信息，不发布违背社会公共利益或公共道德或不适合在岭师捷约摄妆网上销售的商品或服务信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。</p>
              <p>2、如若违反以上的约定</p>
              <p>对于您涉嫌违反承诺的行为对任意第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保岭师捷约网免于因此产生损失或增加费用。</p>
          </div>
      </main>
  </div>
</template>

<script>
import {Icon} from 'vant'
export default {
  name: 'Protocol',
  components: {
    VanIcon: Icon
  },
  methods: {
    colseHide () {
      this.$emit('listenProtocol', false)
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
  #Protocol{
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
      .van-icon{
          left:3%;
          right:0;
          text-align: left;
          color:white;
          @include font-dpr(22px);
          top:px2rem(40px);
      }
    }
    main{
        padding:px2rem(40px);
        .title{
            @include font-dpr(16px);
        }
        h4{
           @include font-dpr(14px);
           color:#333;
           padding:px2rem(20px) 0;
        }
        p{
            padding-left:15px;
            color:#444;
            line-height: 20px;
            @include font-dpr(12px);
        }
        .warn{
            color:#fab803;
        }
        .tips{
            padding-left:30px;
        }
    }
  }
</style>
