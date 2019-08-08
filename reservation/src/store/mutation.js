export default {
  set_worksType (state, info) {
    state.worksType = info
    sessionStorage.setItem('worksType', info)
  },
  set_userId (state, userId) {
    state.userId = userId
    sessionStorage.setItem('userId', userId)
  },
  set_merchatId (state, merchatId) {
    state.merchatId = merchatId
    sessionStorage.setItem('merchatId', merchatId)
  },
  set_orderInfo (state, info) {
    state.reservaId = info.rid
    state.workId = info.wid
    sessionStorage.setItem('reservaId', info.rid)
    sessionStorage.setItem('workId', info.wid)
  },
  Remove_userId (state) {
    state.userId = ''
    state.merchatId = ''
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('merchatId')
    state.reservaId = ''
    state.workId = ''
    sessionStorage.removeItem('reservaId')
    sessionStorage.removeItem('workId')
  }
}
