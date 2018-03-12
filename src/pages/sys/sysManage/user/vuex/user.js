import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
    userList: []
}
const actions = {
    getUserList: ({commit}, state) => {
        return api.getUserList(state).then(res => {
            if (res.success) {
                commit(type.GET_USER_LIST, res.body.data)
            }
        })
    },
    editUserRole: ({commit}, state) => {
        return api.editUserRole(state)
    }
}
const getters = {
    userList: (state) => {
        return state.userList
    }
}
const mutations = {
    [type.GET_USER_LIST] (state, data) {
        state.userList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
