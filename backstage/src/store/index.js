import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'
import mutations from './mutation.js'

Vue.use(Vuex)

const state = {
  userInfo: {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
