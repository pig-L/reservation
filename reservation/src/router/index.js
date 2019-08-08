import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/Index.vue'
import ServiceList from '@/page/service/ServiceList.vue'
import ServiceDetail from '@/page/service/ServiceDetail.vue'
import reserveSucess from '@/page/service/reserveSucess.vue'
import Find from '@/page/find/Find.vue'
import MerchantIndex from '@/page/find/MerchantIndex.vue'
import Login from '@/page/LgAndRe/Login.vue'
import Register from '@/page/LgAndRe/Register.vue'
import MineIndex from '@/page/mine/MineIndex.vue'
import OrderDetail from '@/page/mine/OrderDetail.vue'
import InfoMOdify from '@/page/mine/InfoMOdify.vue'
import CommentOrder from '@/page/mine/Comment.vue'
import commentSucess from '@/page/mine/commentSucess.vue'
import EditWroks from '@/page/mine/EditWorks.vue'
import MyComment from '@/page/mine/MyComment.vue'
import Complaint from '@/page/mine/Complaint.vue'
import Release from '@/page/publish/Release.vue'
import Success from '@/page/publish/Success.vue'
import JoinMerchant from '@/page/join/JoinMerchant.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ServiceList',
      name: 'ServiceList',
      component: ServiceList
    },
    {
      path: '/ServiceDetail',
      name: 'ServiceDetail',
      component: ServiceDetail
    },
    {
      path: '/Find',
      name: 'Find',
      component: Find
    },
    {
      path: '/MerchantIndex',
      name: 'MerchantIndex',
      component: MerchantIndex
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/MineIndex',
      name: 'MineIndex',
      component: MineIndex
    },
    {
      path: '/Release',
      name: 'Release',
      component: Release
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/JoinMerchant',
      name: 'JoinMerchant',
      component: JoinMerchant
    },
    {
      path: '/Success',
      name: 'Success',
      component: Success
    },
    {
      path: '/reserveSucess',
      name: 'reserveSucess',
      component: reserveSucess
    },
    {
      path: '/InfoMOdify',
      name: 'InfoMOdify',
      component: InfoMOdify
    },
    {
      path: '/CommentOrder',
      name: 'CommentOrder',
      component: CommentOrder
    },
    {
      path: '/commentSucess',
      name: 'commentSucess',
      component: commentSucess
    },
    {
      path: '/MyComment',
      name: 'MyComment',
      component: MyComment
    },
    {
      path: '/EditWroks',
      name: 'EditWroks',
      component: EditWroks
    },
    {
      path: '/Complaint',
      name: 'Complaint',
      component: Complaint
    }
  ]
})
