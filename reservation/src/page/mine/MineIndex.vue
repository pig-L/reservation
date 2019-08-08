<template>
  <div id="MineIndex">
      <header>
          <div>我的</div>
          <div class="release" @click="$router.push({name: 'Login'})" v-if="isLogin">用户登录</div>
          <div class="release" @click="goRelease" v-else><van-icon name="share" />我要发布</div>
          <van-icon name="contact" @click="$router.push({name:'InfoMOdify'})" v-if="!isLogin"/>
          <div class="exit" @click="goExit" v-if="!isLogin"><img src="../../assets/index/exit.png" alt=""></div>
          <div class="wrap_info" v-if="!isLogin">
            <div class="wrap_proImg" >
              <img :src=proImg alt="">
              <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <div>{{userName}}</div>
          </div>
      </header>
      <div class="wrap_order">
          <van-cell-group>
            <van-cell title="我的评论" is-link value="查看全部" @click="goToComment"/>
            <van-cell title="我的订单" is-link value="查看全部" @click="goToOrder(1)"/>
            <div>
                <van-tabbar v-model="active">
                    <van-tabbar-item icon="records" @click="goToOrder(2)">待接单</van-tabbar-item>
                    <van-tabbar-item icon="sign" @click="goToOrder(3)">已接单</van-tabbar-item>
                    <van-tabbar-item icon="completed" @click="goToOrder(4)">已完成</van-tabbar-item>
                    <van-tabbar-item icon="tosend" @click="goToOrder(7)">待取消</van-tabbar-item>
                    <van-tabbar-item icon="info-o" @click="goToOrder(5)">已取消</van-tabbar-item>
                    <van-tabbar-item icon="close" @click="goToOrder(6)">未完成</van-tabbar-item>
                </van-tabbar>
            </div>
          </van-cell-group>
      </div>
      <div class="wrap_like">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="我的发布" name="1" v-if="merchatId">
                <div class="myRelease" v-for="(v,i) in myWorks" :key="i" @click="$router.push({name: 'ServiceDetail', params: {id: v.workId}})">
                    <div class="release_img">
                        <img :src=v.viewImg alt="">
                    </div>
                    <div class="release_content">
                        <div>
                            <div>{{v.workTitle}}</div>
                            <div @click="showComfirm(v.workId,i)" @click.stop><van-icon name="delete" /></div>
                            <div class="edit" @click.stop @click="$router.push({name:'EditWroks',params:{workId:v.workId}})"><img src="../../assets/index/edit.png" alt=""></div>
                        </div>
                        <div>
                            <div><span>价格：</span><span>￥{{v.price}}</span></div>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="我收藏的商家" name="2">
                <div class="MerchantItem" v-for="(v,i) in collectM" :key="i" @click="$router.push({name: 'MerchantIndex', params: {merchatId: v.merchatId}})">
                    <div class="wrap_img"><img :src=v.bgImg alt=""></div>
                    <div class="wrap_content">
                        <div><div class="name">{{v.userName}}</div><div @click="showMyMer(v.collmerId,i)" @click.stop><van-icon name="delete" /></div></div>
                        <div><div>地址：</div><div class="address">{{v.address}}</div></div>
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="我收藏的作品" name="3">
                <div class="myRelease" v-for="(v,i) in collectW" :key="i" @click="$router.push({name: 'ServiceDetail', params: {id: v.workId}})">
                    <div class="release_img">
                        <img :src=v.viewImg alt="">
                    </div>
                    <div class="release_content">
                        <div>
                            <div>{{v.workTitle}}</div>
                            <div @click="showMyconf(v.collworkId,i)" @click.stop><van-icon name="delete" /></div>
                        </div>
                        <div>
                            <div><span>价格：</span><span>￥{{v.price}}</span></div>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
          </van-collapse>
      </div>
      <van-popup position="right" v-model="show"><my-order @listenClose="closeOrder" :orderData="oData" ></my-order></van-popup>
  </div>
</template>

<script>
import { Cell, CellGroup, Collapse, CollapseItem, Tabbar, TabbarItem, Icon, Popup, Dialog, Toast, Uploader } from 'vant'
import MyOrder from './MyOrder.vue'
export default {
  name: 'MineIndex',
  data () {
    return {
      activeNames: ['4'],
      active: 4,
      show: false,
      isLogin: false,
      userId: '',
      proImg: null,
      userName: null,
      merchatId: null,
      orderSql: {
        type: null,
        tid: null
      },
      oData: [],
      myWorks: [],
      collectM: [],
      collectW: []
    }
  },
  components: {
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanCollapse: Collapse,
    VanCollapseItem: CollapseItem,
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    VanIcon: Icon,
    VanPopup: Popup,
    MyOrder,
    Dialog,
    Toast,
    VanUploader: Uploader
  },
  mounted: function () {
    this.goCheckLogin()
  },
  methods: {
    closeOrder (data) {
      this.show = data
    },
    showComfirm (id, i) {
      Dialog.confirm({
        title: '提示',
        message: '确定要删除该服务吗'
      }).then(() => {
        this.$store.dispatch('deleteWorksAct', {workId: id})
          .then((res) => {
            if (res.data.success) {
              this.myWorks.splice(i, 1)
            } else {
              Toast.fail(res.data.message)
            }
          }).catch(res => {
            console.log(res)
          })
      }).catch(() => {
        // on cancel
      })
    },
    showMyconf (id, i) {
      Dialog.confirm({
        title: '提示',
        message: '确定要删除该收藏作品吗'
      }).then(() => {
        this.$store.dispatch('deleteCollectAct', {type: 0, collectId: id})
          .then((res) => {
            if (res.data.success) {
              this.collectW.splice(i, 1)
            }
          }).catch(res => {
            console.log(res)
          })
      }).catch(() => {
        // on cancel
      })
    },
    showMyMer (id, i) {
      Dialog.confirm({
        title: '提示',
        message: '确定要删除该收藏商家吗'
      }).then(() => {
        this.$store.dispatch('deleteCollectAct', {type: 1, collectId: id})
          .then((res) => {
            if (res.data.success) {
              this.collectM.splice(i, 1)
            }
          }).catch(res => {
            console.log(res)
          })
      }).catch(() => {
        // on cancel
      })
    },
    goRelease () {
      if (!this.merchatId) {
        Toast.fail('请先成为商家')
      } else {
        this.$router.push({name: 'Release', params: {id: this.merchatId}})
      }
    },
    onRead (file) {
      this.proImg = file.content
      var formData = new FormData()
      formData.append('images', file.file)
      formData.append('type', 0)
      formData.append('id', sessionStorage.getItem('userId'))
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
    },
    goCheckLogin () {
      this.$store.dispatch('getUserInfoAct')
        .then((res) => {
          if (res.data.userInfo === null) {
            this.isLogin = true
          } else {
            this.userId = res.data.userInfo.userId
            this.proImg = res.data.userInfo.proImg
            this.userName = res.data.userInfo.userName
            this.$store.dispatch('getUsersAct', {userId: this.userId})
              .then((res) => {
                if (res.data.success) {
                  this.merchatId = res.data.merchatInfo.merchatId
                  this.$store.dispatch('addmerchatIdAct', this.merchatId)
                  if (this.merchatId) {
                    this.$store.dispatch('queryCollectAct', {type: 1, userId: this.userId, merchatId: this.merchatId})
                      .then((res) => {
                        if (res.data.success) {
                          this.myWorks = res.data.workInfo
                          this.collectM = res.data.collectM
                          this.collectW = res.data.collectW
                        }
                      }).catch(res => {
                        console.log(res)
                      })
                  } else {
                    this.$store.dispatch('queryCollectAct', {type: 0, userId: this.userId})
                      .then((res) => {
                        if (res.data.success) {
                          this.collectM = res.data.collectM
                          this.collectW = res.data.collectW
                        }
                      }).catch(res => {
                        console.log(res)
                      })
                  }
                }
              }).catch(res => {
                console.log(res)
              })
          }
        }).catch(res => {
          this.isLogin = true
        })
    },
    goExit () {
      this.$store.dispatch('dealExitAct')
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('removeuserIdAct')
            this.myWorks = []
            this.collectM = []
            this.collectW = []
            this.merchatId = ''
            this.goCheckLogin()
          }
        }).catch(res => {
          console.log(res)
        })
    },
    goToOrder (type) {
      if (this.merchatId) {
        this.orderSql.tid = this.merchatId
        this.orderSql.type = '2' + type
        this.show = true
      } else if (this.userId) {
        this.orderSql.tid = this.userId
        this.orderSql.type = '1' + type
        this.show = true
      }
    },
    goToComment () {
      if (!this.isLogin) {
        this.$router.push({name: 'MyComment', params: {'userId': this.userId}})
      }
    }
  },
  watch: {
    orderSql: {// 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.$store.dispatch('selectReserveAct', {
          type: this.orderSql.type,
          tid: this.orderSql.tid,
          uid: this.userId
        })
          .then((res) => {
            if (res.data.success) {
              this.oData = res.data.orderInfo
            }
          }).catch(res => {
            console.log(res)
          })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
 @import '../../style/base.scss';
 @import '../../style/dailog.scss';
  #MineIndex{
      width:100%;
      background: #f4f3f5;
      margin-bottom:px2rem(180px);
      header{
          background: #ff69b4;
          color:white;
          @include font-dpr(20px);
          width:100%;
          height:px2rem(400px);
          text-align: center;
          position:relative;
          .release{
              position:absolute;
              top:px2rem(150px);
              left:5%;
              @include font-dpr(16px);
              width:px2rem(300px);
              height:px2rem(80px);
              line-height: px2rem(80px);
              background:rgba(0,0,0,0.3);
              border-radius: 1rem;
              .van-icon{
                  margin-right:px2rem(15px);
              }
          }
          .van-icon-contact{
              position:absolute;
              @include font-dpr(20px);
              top:px2rem(50px);
              right:5%;
          }
          .exit{
            position:absolute;
            right:2%;
            bottom:px2rem(30px);
            img{
              width:px2rem(110px);
              height:auto;
            }
          }
          .wrap_info{
            margin-top:px2rem(30px);
            display: inline-block;
            @include font-dpr(14px);
            text-align: center;
          }
          .wrap_proImg{
            width:px2rem(180px);
            height:px2rem(180px);
            margin-right:px2rem(20px);
            border-radius: 1rem;
            overflow: hidden;
            position:relative;
            display: inline-block;
            &>img{
                height:100%;
                width:auto;
            }
            .van-uploader{
              position:absolute;
              top:0;
              left:0;
              width:px2rem(180px);
              height:px2rem(180px);
            }
            .van-icon-photograph::before{
              color:transparent;
            }
          }
      }
      .wrap_order{
          background: white;
          margin-top:px2rem(20px);
          @include font-dpr(14px);
          .van-cell{
              @include font-dpr(14px);
              height:px2rem(120px);
              line-height: px2rem(120px);
              border-bottom:0.02rem solid #eeeeee;
              padding: 0 px2rem(30px);
          }
          .van-cell__right-icon{
              @include font-dpr(20px);
             height:px2rem(120px);
              line-height: px2rem(120px);
          }
          .van-tabbar--fixed{
              position:relative;
              height:px2rem(180px);
              padding:px2rem(10px) 0;
          }
          .van-tabbar-item{
              @include font-dpr(14px);
              color:black;
              .van-icon{
                  @include font-dpr(28px);
                  font-weight: bolder;
                  color:#ff69b4;
                  padding-bottom:px2rem(20px);
              }
              .van-info{
                  @include font-dpr(12px);
                  height:px2rem(44px);
                  line-height: px2rem(44px);
              }
          }
      }
      .wrap_like{
          margin-top:px2rem(20px);
          padding: 0 px2rem(30px);
          width:100%;
          box-sizing: border-box;
          background: white;
          .van-collapse-item{
              width:100%;
              .van-cell{
                  @include font-dpr(14px);
                  padding:0;
              }
          }
          .van-cell__title{
              height:px2rem(120px);
              line-height:px2rem(120px);
              color:black;
              @include font-dpr(14px);
          }
          .van-cell__right-icon{
             height:px2rem(120px);
              line-height:px2rem(120px);
             @include font-dpr(20px);
          }
          .myRelease{
              display: flex;
              flex-direction: row;
              border-bottom:0.02rem solid #eeeeee;
              padding-bottom:px2rem(20px);
              color:#666666;
              .release_img{
                  width:px2rem(300px);
                  height:px2rem(250px);
                  img{
                      width:100%;
                      height:100%;
                  }
              }
              .release_content{
                  flex:1;
                  padding:0 px2rem(30px);
                   @include font-dpr(14px);
                  &>div{
                      display: flex;
                      flex-direction: row;
                      &:nth-child(1){
                          padding-bottom:px2rem(100px);
                      }
                     div:nth-of-type(1){
                         flex:1;
                     }
                  }
                  .van-icon{
                      color:#c80000;
                  }
              }
              .edit{
                  margin-left:px2rem(30px);
                  width:px2rem(50px);
                  height:px2rem(50px);
                  &>img{
                      width:100%;
                      height:100%;
                  }
              }
          }
      }
      .MerchantItem{
        width:100%;
        display:flex;
        flex-direction: row;
        padding:px2rem(40px) px2rem(20px);
        box-sizing: border-box;
        border-top:0.05rem solid #eeeeee;
        .van-icon{
                      color:#c80000;
                  }
        .wrap_img{
            width:px2rem(300px);
            height:px2rem(250px);
            &>img{
                width:100%;
                height:100%;
            }
        }
        .wrap_content{
            padding-left:px2rem(30px);
            flex:1;
            @include font-dpr(14px);
            color:#666666;
            &>div{
                display: flex;
                flex-direction: row;
                padding:px2rem(20px) 0;
                .name,.address,.order{
                    flex:1;
                }
            }
            .address{
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-wrap: break-word;
              overflow: hidden;
            }
        }
      }
      .van-popup{
          width:100%;
          height:100%;
      }
  }
</style>
