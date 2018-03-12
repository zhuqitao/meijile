/**
 * Create by zechun.chen on 2016/12/22
 */

import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import sysIndex from '../pages/sys/sysIndex/vuex/sysIndex'
import login from '../pages/login/vuex/login'
import register from '../pages/register/vuex/register'
// 站点管理
import station from '../pages/sys/stationManage/station/vuex/station'
// import station from '../pages/sysManage/'
// 系统管理
import log from '../pages/sys/sysManage/log/vuex/log' // 日志管理
import role from '../pages/sys/sysManage/role/vuex/role' // 角色管理
import user from '../pages/sys/sysManage/user/vuex/user' // 用户管理
import menu from '../pages/sys/sysManage/menu/vuex/menu' // 菜单管理
import mubanManage from '../pages/sys/sysManage/mubanManage/vuex/mubanManage' // 模板管理
import sign from '../pages/sys/sysManage/sign/vuex/sign' // 模板标志管理
// 用户首页  模板列表
import mould from '../pages/mould/vuex/mould'
// import mubanManage from ''
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    sysIndex,
    base,
    login,
    register,
    station,
    log,
    role,
    user,
    menu,
    mubanManage,
    sign,
    mould
  }
})

export default store
