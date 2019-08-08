
import axios from 'axios'

axios.defaults.withCredentials = true

// http://127.0.0.1:3000
const basePath = '/'

const API = {
  getUsers: `${basePath}users/check/checkUser`,
  adLogin: `${basePath}login`,
  dealExit: `${basePath}exit`,
  getUserInfo: `${basePath}getUserInfo`,
  register: `${basePath}users/register`,
  finduser: `${basePath}users/register/finduser`,
  uploadProImg: `${basePath}users/register/uploadProImg`,
  uploadImg: `${basePath}users/comment/uploadImg`,
  uploadContent: `${basePath}users/comment/uploadContent`,
  releaseWorks: `${basePath}users/release/upLoadWorks`,
  rlupLoadImg: `${basePath}users/release/upLoadImg`,
  uploadItemset: `${basePath}users/release/uploadItemset`,
  findWork: `${basePath}users/release/findWork`,
  findWorkImg: `${basePath}users/release/findWorkImg`,
  findWorkItem: `${basePath}users/release/findWorkItem`,
  selectWorks: `${basePath}users/release/selectWorks`,
  deleteWorks: `${basePath}users/release/deleteWorks`,
  updateWorks: `${basePath}users/release/updateWorks`,
  deleteWorkImg: `${basePath}users/release/deleteWorkImg`,
  upLoadSingleImg: `${basePath}users/release/upLoadSingleImg`,
  joinUs: `${basePath}users/check/joinUs`,
  playReserve: `${basePath}users/reserve/playReserve`,
  selectReserve: `${basePath}users/reserve/selectReserve`,
  updateOrderType: `${basePath}users/reserve/updateOrderType`,
  checkReserTime: `${basePath}users/reserve/checkReserTime`,
  uploadComplaint: `${basePath}users/reserve/uploadComplaint`,
  queryComment: `${basePath}users/comment/queryComment`,
  queryCommentNum: `${basePath}users/comment/queryCommentNum`,
  queryWorkComment: `${basePath}users/comment/queryWorkComment`,
  checkMerchat: `${basePath}users/check/checkMerchat`,
  updateUserInfo: `${basePath}users/check/updateUserInfo`,
  queryMerchat: `${basePath}users/marchat/queryMerchat`,
  collectWorNot: `${basePath}users/collect/collectWorNot`,
  findCollectW: `${basePath}users/collect/findCollectW`,
  queryCollect: `${basePath}users/collect/queryCollect`,
  deleteCollect: `${basePath}users/collect/deleteCollect`,
  queryMerchatInfo: `${basePath}users/marchat/queryMerchatInfo`
}

export const getUsers = (param = null) => {
  return axios.post(API.getUsers, param)
}

export const getUserInfo = (param = null) => {
  return axios.get(API.getUserInfo, param)
}

export const dealExit = (param = null) => {
  return axios.get(API.dealExit, param)
}

export const adLogin = (param = null) => {
  return axios.post(API.adLogin, param)
}

export const register = (param = null) => {
  return axios.post(API.register, param)
}

export const finduser = (param = null) => {
  return axios.post(API.finduser, param)
}

export const uploadImg = (param = null) => {
  return axios.post(API.uploadImg, param)
}

export const uploadContent = (param = null) => {
  return axios.post(API.uploadContent, param)
}

export const releaseWorks = (param = null) => {
  return axios.post(API.releaseWorks, param)
}

export const joinUs = (param = null) => {
  return axios.post(API.joinUs, param)
}

export const rlupLoadImg = (param = null) => {
  return axios.post(API.rlupLoadImg, param)
}

export const uploadItemset = (param = null) => {
  return axios.post(API.uploadItemset, param)
}

export const findWork = (param = null) => {
  return axios.post(API.findWork, param)
}

export const findWorkImg = (param = null) => {
  return axios.post(API.findWorkImg, param)
}

export const findWorkItem = (param = null) => {
  return axios.post(API.findWorkItem, param)
}

export const selectWorks = (param = null) => {
  return axios.post(API.selectWorks, param)
}

export const playReserve = (param = null) => {
  return axios.post(API.playReserve, param)
}

export const selectReserve = (param = null) => {
  return axios.post(API.selectReserve, param)
}

export const checkMerchat = (param = null) => {
  return axios.post(API.checkMerchat, param)
}

export const uploadProImg = (param = null) => {
  return axios.post(API.uploadProImg, param)
}

export const updateUserInfo = (param = null) => {
  return axios.post(API.updateUserInfo, param)
}

export const queryMerchat = (param = null) => {
  return axios.post(API.queryMerchat, param)
}

export const collectWorNot = (param = null) => {
  return axios.post(API.collectWorNot, param)
}

export const findCollectW = (param = null) => {
  return axios.post(API.findCollectW, param)
}

export const queryMerchatInfo = (param = null) => {
  return axios.post(API.queryMerchatInfo, param)
}

export const updateOrderType = (param = null) => {
  return axios.post(API.updateOrderType, param)
}

export const queryComment = (param = null) => {
  return axios.post(API.queryComment, param)
}

export const queryCollect = (param = null) => {
  return axios.post(API.queryCollect, param)
}

export const deleteCollect = (param = null) => {
  return axios.post(API.deleteCollect, param)
}

export const deleteWorks = (param = null) => {
  return axios.post(API.deleteWorks, param)
}

export const updateWorks = (param = null) => {
  return axios.post(API.updateWorks, param)
}

export const deleteWorkImg = (param = null) => {
  return axios.post(API.deleteWorkImg, param)
}

export const upLoadSingleImg = (param = null) => {
  return axios.post(API.upLoadSingleImg, param)
}

export const queryCommentNum = (param = null) => {
  return axios.post(API.queryCommentNum, param)
}

export const queryWorkComment = (param = null) => {
  return axios.post(API.queryWorkComment, param)
}

export const checkReserTime = (param = null) => {
  return axios.post(API.checkReserTime, param)
}

export const uploadComplaint = (param = null) => {
  return axios.post(API.uploadComplaint, param)
}
