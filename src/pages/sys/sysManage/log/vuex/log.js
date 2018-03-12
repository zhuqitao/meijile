import api from '@/vuex/api'
import * as type from '@/vuex/type'

const state = {
    logList: [],
    IPSource: []
}
const getters = {
    logList: (state) => {
        if (state.logList.content) {
            for (let [index, item] of state.logList.content.entries()) {
                state.logList.content[index].createDate = new Date(state.logList.content[index].createDate).toLocaleString()
            }
        }
        return state.logList
    },
    IPSource: (state) => {
        return state.IPSource
    }
}
const actions = {
    getLogList: ({commit}, data) => {
        api.getLogList(data.page, data.size, (res) => {
            commit(type.GET_LOG_LIST, res.body.data)
        })
    },
    queryLog: ({commit}, state) => {
        return api.queryLog(state).then(res => {
            commit(type.GET_LOG_LIST, res.body.data)
        })
    },
    getIPSource: ({commit}) => {
        return api.getIPSource().then(res => {
            commit(type.GET_IP_SOURCE, res.body.data)
        })
    }
}
const mutations = {
    [type.GET_LOG_LIST] (state, data) {
        state.logList = data
    },
    [type.GET_IP_SOURCE] (state, data) {
        state.IPSource = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
