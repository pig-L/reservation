<template>
  <div id="Release">
      <header><van-icon name="arrow-left" @click="$router.go(-1)"/><span>发布服务</span></header>
      <main>
        <div class="put_item">
          <div class="put_text specfic">服务标题：</div>
          <div class="put_content"><input type="text" v-model="title"></div>
        </div>
        <div class="put_item">
          <div class="put_text">赠送服务：</div>
          <div class="put_content"><textarea v-model="service"></textarea></div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">价格：</div>
          <div class="put_content"><input type="text" v-model="price"></div>
        </div>
        <div class="put_item">
          <div class="put_text">套餐：</div>
          <div class="put_content">
            <input type="text" class="specil" v-for="(v,i) in inputNum" :key="i">
          </div>
          <div class="add_input" @click="showspc">+</div>
        </div>
        <div class="put_item">
          <div class="put_text">下单要求：</div>
          <div class="put_content"><input type="text" v-model="request"></div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">服务类型：</div>
          <div class="put_content">
            <van-radio-group v-model="inp_type">
                <van-radio name="化妆">化妆</van-radio>
                <van-radio name="毕业大合照">毕业大合照</van-radio>
                <van-radio name="毕业跟拍">毕业跟拍</van-radio>
                <van-radio name="个人写真">个人写真</van-radio>
                <van-radio name="服装出租">服装出租</van-radio>
                <van-radio name="造型">造型</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="put_item">
          <div class="put_text select specfic">服务方式：</div>
          <div class="put_content">
            <van-radio-group v-model="inp_way">
                <van-radio name="到店">到店</van-radio>
                <van-radio name="上门" checked>上门</van-radio>
                <van-radio name="现场">现场</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">可预约时间：</div>
          <div class="put_content">
            <div><input type="text" v-model="startDate" class="selectTime" readonly @click="isSD=true" placeholder="请设置可预约的最早时间"></div>
            <div class="spf"><span>至</span></div>
            <div><input type="text" v-model="endDate" class="selectTime" readonly @click="isED=true" placeholder="请设置可预约的最晚时间"></div>
          </div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">服务时长：</div>
          <div class="put_content">
            <div class="wrap_stepper">
                <van-stepper v-model="totalTime" :step="0.5" :min="0.5"/>
                <span class="st_tips">小时</span>
            </div>
          </div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">最多预约人数：</div>
          <div class="put_content">
            <div class="wrap_stepper">
                <van-stepper v-model="limitNum"/>
            </div>
          </div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">联系方式：</div>
          <div class="put_content"><input type="text" v-model="connectWay"></div>
        </div>
        <div class="put_item">
          <div class="put_text specfic">作品图片：</div>
          <div class="put_content upimg">
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
        </div>
        <div class="put_item wr_but">
          <van-button @click="publish" :disabled="title===''||price===null||startDate===null||endDate===null||connectWay===''||imgShowArr.length===0">发布</van-button>
          <van-button @click="$router.go(-1)">取消</van-button>
        </div>
      </main>
      <van-popup v-model="isSD" position="bottom">
         <van-datetime-picker
          v-model="selectSDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @cancel="isSD=false"
          @confirm="confirmSelect"
        />
      </van-popup>
      <van-popup v-model="isED" position="bottom">
        <van-datetime-picker
          v-model="selectEDate"
          type="datetime"
          :min-date="minEDate"
          :formatter="formatter"
          @cancel="isED=false"
          @confirm="confSelectEnd"
        />
      </van-popup>
  </div>
</template>

<script>
import { Icon, DatetimePicker, Radio, RadioGroup, Popup, Uploader, Button, Toast, Stepper } from 'vant'
export default {
  name: 'Release',
  components: {
    VanIcon: Icon,
    VanDatetimePicker: DatetimePicker,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    VanPopup: Popup,
    VanUploader: Uploader,
    VanButton: Button,
    Toast,
    VanStepper: Stepper
  },
  data () {
    return {
      minDate: new Date(),
      currentDate: new Date(),
      minEDate: new Date(),
      maxDate: new Date('2020-10-1'),
      inputNum: new Array(1),
      num: 1,
      inp_type: '化妆',
      inp_way: '到店',
      startDate: null,
      endDate: null,
      isSD: false,
      isED: false,
      selectSDate: '',
      selectEDate: '',
      imgShowArr: [],
      service: null,
      price: null,
      request: null,
      title: '',
      connectWay: '',
      totalTime: 0.5,
      limitNum: 1
    }
  },
  methods: {
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
    showspc () {
      this.num = this.num + 1
      this.inputNum = new Array(this.num)
    },
    confirmSelect () {
      this.minEDate = this.selectSDate
      this.startDate = this.getTime(this.selectSDate, 'yyyy-MM-dd hh:mm:ss')
      this.isSD = false
    },
    confSelectEnd () {
      this.maxDate = this.selectEDate
      this.endDate = this.getTime(this.selectEDate, 'yyyy-MM-dd hh:mm:ss')
      this.isED = false
    },
    getTime (date, fmt) {
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
    onRead (file) {
      this.imgShowArr.push(file)
    },
    removeImg (index) {
      this.imgShowArr.splice(index, 1)
    },
    publish () {
      var formData = new FormData()
      for (let i = 0; i < this.imgShowArr.length; i++) {
        formData.append('images', this.imgShowArr[i].file)
      }
      formData.append('title', this.title)
      formData.append('service', this.service)
      formData.append('price', this.price)
      formData.append('request', this.request)
      formData.append('type', this.inp_type)
      formData.append('way', this.inp_way)
      formData.append('sDate', this.startDate)
      formData.append('eDate', this.endDate)
      formData.append('connextWay', this.connectWay)
      formData.append('merchatId', this.$route.params.id)
      formData.append('totalTime', this.totalTime)
      formData.append('limitNum', this.limitNum)
      var tags = document.getElementsByClassName('specil')
      var str = tags[0].value.replace(/(^\s*)|(\s*$)/g, '')// 去除空格;
      if (str !== null && str !== undefined && str !== '') {
        var it = []
        for (let i = 0; i < tags.length; i++) {
          it.push(tags[i].value)
        }
        formData.append('item', it)
      }
      this.$store.dispatch('releaseWorksAct', formData)
        .then((res) => {
          if (res.data.success) {
            this.$router.push({name: 'Success', params: {rid: res.data.rid}})
          } else {
            Toast.fail('上传失败')
          }
        }).catch(res => {
          console.log(res)
        })
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
  #Release{
    position:absolute;
    z-index: 3;
    background: white;
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
    .van-picker__cancel,.van-picker__confirm,.van-picker-column{
      @include font-dpr(16px);
    }
    main{
      width:100%;
      padding:px2rem(20px);
      box-sizing: border-box;
      .put_item{
        width:100%;
        padding:px2rem(20px) px2rem(30px);
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
      }
      .wr_but{
        text-align: center;
      }
      .put_text{
        width:30%;
        line-height: px2rem(120px);
        @include font-dpr(14px);
      }
      .select{
        line-height: px2rem(44px);
      }
      .put_content{
        flex:1;
        input{
          width:100%;
          border:none;
          outline: none;
          border-bottom:0.01rem solid #cccccc;
          box-sizing: border-box;
          @include font-dpr(14px);
          padding:px2rem(20px);
        }
        .specil{
          border:0.01rem solid #cccccc;
          width:95%;
          margin-bottom:px2rem(30px);
        }
        .spf{
          text-align: center;
        }
        .selectTime{
          border:none;
          background: #c3e5ff;
          border-radius: 1rem;
          text-align: center;
          color:#333333;
        }
        textarea{
          width:100%;
          height:px2rem(200px);
          @include font-dpr(14px);
          padding:px2rem(10px);
          box-sizing: border-box;
          border:0.01rem solid #999999;
        }
      }
      .upimg{
        border:0.03rem dashed #cccccc;
        padding:px2rem(30px);
        height:px2rem(900px);
      }
      .add_input{
        @include font-dpr(24px);
        font-weight: bold;
        color:#5f6368;
      }
      .van-radio__input{
        height:px2rem(70px);
        width:px2rem(60px);
        @include font-dpr(18px);
      }
      .van-radio__label{
        @include font-dpr(14px);
      }
      .van-radio{
        display: inline-block;
      }
      button{
        height:px2rem(100px);
        line-height: px2rem(100px);
        margin-left:px2rem(200px);
        border:none;
        outline:none;
        @include font-dpr(14px);
        &:first-child{
          background: #1d82fe;
          color:white;
        }
        &:last-child{
          border:1px solid #ccc;
        }
      }
      .specfic{
        position: relative;
        &::before{
          content: '*';
          position: absolute;
          left: -30px;
          color: #f44;
          @include font-dpr(14px);
        }
      }
    }
    .van-picker__columns,.van-picker-column{
      height:px2rem(700px) !important;
    }
    .van-picker__toolbar{
      height:px2rem(80px);
      line-height: px2rem(80px);
    }
    .wr_cm_img{
          height:px2rem(600px);
          width:100%;
          ul{
              width:100%;
              overflow: hidden;
              li{
                  width:50%;
                  height:px2rem(300px);
                  float:left;
                  position: relative;
                 &>img{
                    width:100%;
                    height:px2rem(300px);
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
    .wrap_stepper{
      display:flex;
      flex-direction: row;
      .van-stepper{
        flex:3;
        button{
          margin: 0;
          background:none;
          border:1px solid #ccc;
        }
        input{
          width:40%;
          border:none;
          line-height: px2rem(100px);
          height:px2rem(100px);
        }
      }
      .st_tips{
        flex:2;
        line-height: px2rem(100px);
        @include font-dpr(14px);
      }
    }
  }
</style>
