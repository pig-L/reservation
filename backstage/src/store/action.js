import {
  adminLogin, addAdmin, editPassword, adminqueryWorks, querySingleWork, adminqueryUser, queryApply, dealApply,
  queryComplaint, dealComplaint, adminDeleteUser, adminDeleteWorks
} from '../service/requestData'

export default {
  adminLoginAct: function ({commit}, param) {
    return adminLogin(param)
  },
  // 记录用户信息
  setUserInfoAct: function (state, config) {
    state.commit('set_userInfo', config)
  },
  // 清除用户信息
  removeUserInfoAct: function (state, config) {
    state.commit('remove_userInfo')
  },
  addAdminAct: function ({commit}, param) {
    return addAdmin(param)
  },
  editPasswordAct: function ({commit}, param) {
    return editPassword(param)
  },
  adminqueryWorksAct: function ({commit}, param) {
    return adminqueryWorks(param)
  },
  querySingleWorkAct: function ({commit}, param) {
    return querySingleWork(param)
  },
  adminqueryUserAct: function ({commit}, param) {
    return adminqueryUser(param)
  },
  queryApplyAct: function ({commit}, param) {
    return queryApply(param)
  },
  dealApplyAct: function ({commit}, param) {
    return dealApply(param)
  },
  queryComplaintAct: function ({commit}, param) {
    return queryComplaint(param)
  },
  dealComplaintAct: function ({commit}, param) {
    return dealComplaint(param)
  },
  adminDeleteUserAct: function ({commit}, param) {
    return adminDeleteUser(param)
  },
  adminDeleteWorksAct: function ({commit}, param) {
    return adminDeleteWorks(param)
  }
}
