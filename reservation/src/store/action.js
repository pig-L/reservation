import {
  getUsers, adLogin, register, finduser, uploadImg, uploadContent, releaseWorks, getUserInfo,
  joinUs, rlupLoadImg, uploadItemset, findWork, findWorkImg, findWorkItem, selectWorks, playReserve,
  selectReserve, checkMerchat, uploadProImg, updateUserInfo, queryMerchat, dealExit, collectWorNot,
  findCollectW, queryMerchatInfo, updateOrderType, queryComment, queryCollect, deleteCollect, deleteWorks,
  updateWorks, deleteWorkImg, upLoadSingleImg, queryCommentNum, queryWorkComment, checkReserTime, uploadComplaint
} from '../service/requestData'

export default {
  getUsersAct: function ({commit}, param) {
    return getUsers(param)
  },
  getUserInfoAct: function ({commit}, param) {
    return getUserInfo(param)
  },
  adLoginAct: function ({commit}, param) {
    return adLogin(param)
  },
  registerAct: function ({commit}, param) {
    return register(param)
  },
  finduserAct: function ({commit}, param) {
    return finduser(param)
  },
  uploadImgAct: function ({commit}, param) {
    return uploadImg(param)
  },
  uploadContentAct: function ({commit}, param) {
    return uploadContent(param)
  },
  releaseWorksAct: function ({commit}, param) {
    return releaseWorks(param)
  },
  // 记录服务类型
  addworksTypeAct: function (state, config) {
    state.commit('set_worksType', config)
  },
  // 记录用户的id类型
  adduserIdAct: function (state, config) {
    state.commit('set_userId', config)
  },
  // 记录商家的id类型
  addmerchatIdAct: function (state, config) {
    state.commit('set_merchatId', config)
  },
  // 记录商家的id类型
  setOrderInfoAct: function (state, config) {
    state.commit('set_orderInfo', config)
  },
  // 退出登录删除信息
  removeuserIdAct: function (state, config) {
    state.commit('Remove_userId', config)
  },
  joinUsAct: function ({commit}, param) {
    return joinUs(param)
  },
  rlupLoadImgAct: function ({commit}, param) {
    return rlupLoadImg(param)
  },
  uploadItemsetAct: function ({commit}, param) {
    return uploadItemset(param)
  },
  findWorkAct: function ({commit}, param) {
    return findWork(param)
  },
  findWorkImgAct: function ({commit}, param) {
    return findWorkImg(param)
  },
  findWorkItemAct: function ({commit}, param) {
    return findWorkItem(param)
  },
  selectWorksAct: function ({commit}, param) {
    return selectWorks(param)
  },
  playReserveAct: function ({commit}, param) {
    return playReserve(param)
  },
  selectReserveAct: function ({commit}, param) {
    return selectReserve(param)
  },
  checkMerchatAct: function ({commit}, param) {
    return checkMerchat(param)
  },
  uploadProImgAct: function ({commit}, param) {
    return uploadProImg(param)
  },
  updateUserInfoAct: function ({commit}, param) {
    return updateUserInfo(param)
  },
  queryMerchatAct: function ({commit}, param) {
    return queryMerchat(param)
  },
  dealExitAct: function ({commit}, param) {
    return dealExit(param)
  },
  collectWorNotAct: function ({commit}, param) {
    return collectWorNot(param)
  },
  findCollectWAct: function ({commit}, param) {
    return findCollectW(param)
  },
  queryMerchatInfoAct: function ({commit}, param) {
    return queryMerchatInfo(param)
  },
  updateOrderTypeAct: function ({commit}, param) {
    return updateOrderType(param)
  },
  queryCommentAct: function ({commit}, param) {
    return queryComment(param)
  },
  queryCollectAct: function ({commit}, param) {
    return queryCollect(param)
  },
  deleteCollectAct: function ({commit}, param) {
    return deleteCollect(param)
  },
  deleteWorksAct: function ({commit}, param) {
    return deleteWorks(param)
  },
  updateWorksAct: function ({commit}, param) {
    return updateWorks(param)
  },
  deleteWorkImgAct: function ({commit}, param) {
    return deleteWorkImg(param)
  },
  upLoadSingleImgAct: function ({commit}, param) {
    return upLoadSingleImg(param)
  },
  queryCommentNumAct: function ({commit}, param) {
    return queryCommentNum(param)
  },
  queryWorkCommentAct: function ({commit}, param) {
    return queryWorkComment(param)
  },
  checkReserTimeAct: function ({commit}, param) {
    return checkReserTime(param)
  },
  uploadComplaintAct: function ({commit}, param) {
    return uploadComplaint(param)
  }
}
