import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Admin from '@/components/admin/Admin'
import AdminIndex from '@/components/admin/AdminIndex'
import AddAdmin from '@/components/admin/AddAdmin'
import EditPassword from '@/components/admin/EditPassword'
import Apply from '@/components/apply/Apply'
import Complaint from '@/components/complaint/Complaint'
import UserManage from '@/components/user/UserManage'
import ServiceManage from '@/components/service/ServiceManage'
import ServiceDetail from '@/components/service/ServiceDetail'
import ServiceIndex from '@/components/service/ServiceIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Login'}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      redirect: {name: 'Apply'},
      children: [
        {
          path: '/Apply',
          name: 'Apply',
          component: Apply
        },
        {
          path: '/Complaint',
          name: 'Complaint',
          component: Complaint
        },
        {
          path: '/UserManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/ServiceIndex',
          component: ServiceIndex,
          redirect: {name: 'ServiceManage'},
          children: [
            {
              path: 'ServiceManage',
              name: 'ServiceManage',
              component: ServiceManage
            },
            {
              path: 'ServiceDetail',
              name: 'ServiceDetail',
              component: ServiceDetail
            }
          ]
        },
        {
          path: '/AdminIndex',
          component: AdminIndex,
          redirect: {name: 'Admin'},
          children: [
            {
              path: 'Admin',
              name: 'Admin',
              component: Admin
            },
            {
              path: 'AddAdmin',
              name: 'AddAdmin',
              component: AddAdmin
            }
          ]
        },
        {
          path: '/EditPassword',
          name: 'EditPassword',
          component: EditPassword
        }
      ]
    }
  ]
})
