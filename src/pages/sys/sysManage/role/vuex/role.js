import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
// import { start } from 'repl'
// import { stat } from 'fs'
const state = {
    roleList: [],
    sysMenuList: [],
    checkedMenuIds: []
}
const actions = {
    getRoleList: function ({ commit }, state) {
        api.getRoleList(state).then(res => {
            if (res.success) {
                commit(type.GET_ROLE_LIST, res.body.data)
            }
        })
    },
    // 根据角色获取菜单权限
    getMenuByRole: ({commit}, roleId) => {
        api.getMenuByRole(roleId).then(res => {
            if (res.success) {
                commit(type.GET_MENU_BY_ROLE, res.body.SysMenuList)
            }
        })
    },
    // 更新选中菜单id列表
    checkChange: ({commit, state}, menuId) => {
        if (state.checkedMenuIds.includes(menuId)) {
            state.checkedMenuIds.splice(state.checkedMenuIds.findIndex(v => {
                return v === menuId
            }), 1)
        } else {
            state.checkedMenuIds.push(menuId)
        }
    },
    // 保存更新角色菜单权限
    updateRole: ({commit}, state) => {
        return api.updateRole(state)
    },
    addRoleClick: ({commit}, roleName) => {
        return api.addRoleClick(roleName)
    },
    editRoleClick: ({commit}, state) => {
        return api.editRoleClick(state)
    },
    removeRoleClick: ({commit}, state) => {
        return api.removeRoleClick(state)
    }
}
const getters = {
    roleList: (state) => {
        // if (state.stationList.content) {
        //     for (let [index, item] of state.stationList.content.entries()) {
        //         state.stationList.content[index].createTime = new Date(state.stationList.content[index].createTime).toLocaleString()
        //     }
        // }
        return state.roleList
    },
    sysMenuList: (state) => {
        return state.sysMenuList
    },
    checkedMenuIds: (state) => {
        return state.checkedMenuIds
    }
}
const mutations = {
    [type.GET_ROLE_LIST] (state, data) {
        state.roleList = data
    },
    [type.GET_MENU_BY_ROLE] (state, data) {
        let arr = []
        for (let [index, item] of data.entries()) {
            data[index].menuId += ''
            if (item.flag) {
                arr.push(item.menuId)
            }
            for (let [i, v] of item.subMenus.entries()) {
                data[index].subMenus[i].menuId += ''
                if (v.flag) {
                    arr.push(v.menuId)
                }
            }
        }
        state.sysMenuList = data
        state.checkedMenuIds = arr
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
