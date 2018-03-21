import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
    userName: localStorage.getItem('currentUser_name'),
    userToken: '',
    mobileErrorText: '',
    passwordErrorText: ''
}
const actions = {
    tologin: function ({ commit }, data) {
        console.log('login')
        if (data.mobile === '') {
            commit('SET_MOBILEERRORTEXT', { msg: '手机号不能为空' })
            commit('SET_PASSWORDERRORTEXT', { msg: '' })
        } else if (data.password === '') {
            commit('SET_PASSWORDERRORTEXT', { msg: '密码不能为空' })
            commit('SET_MOBILEERRORTEXT', { msg: '' })
        } else {
            // api.toLogin(data, function (res) {
            //     if (res.success) {
            //         commit(type.SET_TOKEN_NAME, { 'userName': res.body.data.userName, 'userToken': res.body.data.token })
            //         router.push('/')
            //     } else {
            //         commit('SET_MOBILEERRORTEXT', { msg: '' })
            //         commit('SET_PASSWORDERRORTEXT', { msg: res.msg })
            //     }
            // })
            // return api.tologin(data).then(res => {
            //     if (res.success) {
            //         commit(type.SET_TOKEN_NAME, { 'userName': res.body.data.userName, 'userToken': res.body.data.token })
            //     } else {
            //         commit('SET_MOBILEERRORTEXT', { msg: '' })
            //         commit('SET_PASSWORDERRORTEXT', { msg: res.msg })
            //     }
            // })
            return new Promise((resolve, reject) => {
                api.tologin(data).then(res => {
                    if (res.success) {
                        commit(type.SET_TOKEN_NAME, { 'userName': res.body.data.userName, 'userToken': res.body.data.token })
                        commit(type.SET_ISLOGIN, true)
                    } else {
                        commit('SET_MOBILEERRORTEXT', { msg: '' })
                        commit('SET_PASSWORDERRORTEXT', { msg: res.msg })
                    }
                    resolve(res)
                })
            })
        }
    },
    getLoginInfoFromLocal: function ({commit, state}) {
        state.userName = localStorage.getItem('currentUser_name')
    }
}
const getters = {
    userName: (state) => state.userName,
    userToken: (state) => state.userToken,
    mobileErrorText: () => state.mobileErrorText,
    passwordErrorText: () => state.passwordErrorText
}
const mutations = {
    [type.SET_TOKEN_NAME] (state, { userName, userToken }) {
        localStorage.setItem('currentUser_name', userName)
        localStorage.setItem('currentUser_token', userToken)
        state.userName = userName
        state.userToken = userToken
    },
    [type.SET_MOBILEERRORTEXT]: (state, { msg }) => {
        state.mobileErrorText = msg
        console.log(state.mobileErrorText)
    },
    [type.SET_PASSWORDERRORTEXT]: (state, { msg }) => {
        state.passwordErrorText = msg
        console.log(state.passwordErrorText)
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
