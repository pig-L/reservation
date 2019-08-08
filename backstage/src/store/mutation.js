export default {
  set_userInfo (state, info) {
    state.userInfo = info
    sessionStorage.setItem('userInfo', JSON.stringify(info))
  },
  remove_userInfo (state) {
    state.userInfo = {}
    sessionStorage.clear()
  }
}
