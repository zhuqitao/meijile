import * as type from '../type'
import api from '@/vuex/api'
const state = {
  isMobile: false,
  isLogin: false
}
const actions = {
  setIsMobile: function ({commit}, data) {
    commit(type.BASE_IS_MOBILE, data)
  },
  checkToken: function ({commit}) {
    api.checkToken().then(res => {
      commit(type.SET_ISLOGIN, res.success)
    })
  }
}
const getters = {
  isMobile: (state) => state.isMobile,
  isLogin: (state) => state.isLogin
}
const mutations = {
  [type.BASE_IS_MOBILE] (state, res) {
    state.isMobile = res
  },
  [type.SET_ISLOGIN]: (state, bool) => {
      console.log('isLogin：', bool)
    state.isLogin = bool
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
