
import axios from 'axios'

axios.defaults.withCredentials = true

// http://127.0.0.1:3000
const basePath = '/'

const API = {
  adminLogin: `${basePath}users/admin/adminLogin`,
  addAdmin: `${basePath}users/admin/addAdmin`,
  editPassword: `${basePath}users/admin/editPassword`,
  adminqueryWorks: `${basePath}users/admin/adminqueryWorks`,
  querySingleWork: `${basePath}users/admin/querySingleWork`,
  adminqueryUser: `${basePath}users/admin/adminqueryUser`,
  queryApply: `${basePath}users/admin/queryApply`,
  dealApply: `${basePath}users/admin/dealApply`,
  queryComplaint: `${basePath}users/admin/queryComplaint`,
  dealComplaint: `${basePath}users/admin/dealComplaint`,
  adminDeleteUser: `${basePath}users/check/deleteUser`,
  adminDeleteWorks: `${basePath}users/release/deleteWorks`
}

export const adminLogin = (param = null) => {
  return axios.post(API.adminLogin, param)
}

export const addAdmin = (param = null) => {
  return axios.post(API.addAdmin, param)
}

export const editPassword = (param = null) => {
  return axios.post(API.editPassword, param)
}

export const adminqueryWorks = (param = null) => {
  return axios.post(API.adminqueryWorks, param)
}

export const querySingleWork = (param = null) => {
  return axios.post(API.querySingleWork, param)
}

export const adminqueryUser = (param = null) => {
  return axios.post(API.adminqueryUser, param)
}

export const queryApply = (param = null) => {
  return axios.get(API.queryApply, param)
}

export const dealApply = (param = null) => {
  return axios.post(API.dealApply, param)
}

export const queryComplaint = (param = null) => {
  return axios.get(API.queryComplaint, param)
}

export const dealComplaint = (param = null) => {
  return axios.post(API.dealComplaint, param)
}

export const adminDeleteUser = (param = null) => {
  return axios.post(API.adminDeleteUser, param)
}

export const adminDeleteWorks = (param = null) => {
  return axios.post(API.adminDeleteWorks, param)
}
