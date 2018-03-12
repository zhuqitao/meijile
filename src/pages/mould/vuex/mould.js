import api from '@/vuex/api'
import * as type from '@/vuex/type'
const state = {
    mouldList: []
}
const actions = {
    getMouldList: function ({ commit }, data) {
        api.getMouldList(data).then(res => {
            if (res.success) {
                commit(type.GET_MOULD_LIST, res.body.data)
            }
        })
    },
    useMouldClick: ({commit}, data) => {
        return api.useMouldClick(data)
    }
}
const getters = {
    mouldList: (state) => {
        return state.mouldList
    }
}
const mutations = {
    [type.GET_MOULD_LIST] (state, data) {
        state.mouldList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
