import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'

// 项目入口
const App = () => import('../App.vue')
// 登录和注册
const Login = () => import('../pages/login/login.vue')
const Register = () => import('../pages/register/register.vue')
// 后台管理入口
const sysIndex = () => import('../pages/sys/sysIndex/sysIndex.vue')
// 系统管理
const Role = () => import('../pages/sys/sysManage/role/role.vue')
const Menu = () => import('../pages/sys/sysManage/menu/menu.vue')
const User = () => import('../pages/sys/sysManage/user/user.vue')
const Log = () => import('../pages/sys/sysManage/log/log.vue')

// 站点管理
const Station = () => import('../pages/sys/stationManage/station/station.vue')
const Muban = () => import('../pages/sys/stationManage/mubanManage/mubanManage.vue')
const Sign = () => import('../pages/sys/stationManage/sign/sign.vue')
// const addStation = () => import(/* webpackChunkName: Station */ '../pages/station/addStation/addStation')

// 首页入口
const Mould = () => import('../pages/mould/mould.vue')
// 个人模板管理
// const Official = () => import('../components/modules/official/official.vue')
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: App,
            redirect: '/mould',
            children: [
                {
                    path: 'mould',
                    component: Mould,
                    children: [
                        {
                            path: 'login',
                            component: Login
                        },
                        {
                            path: 'register',
                            component: Register
                        }
                    ]
                },
                {
                    path: 'sysIndex',
                    component: sysIndex,
                    meta: {
                        mainUrl: 'user'
                    },
                    children: [
                        // 系统管理
                        {
                            path: 'user', // 用户管理
                            name: 'user',
                            component: User,
                            meta: {
                                mainUrl: 'user',
                                auth: true
                            }
                        },
                        {
                            path: 'role', // 角色管理
                            name: 'role',
                            component: Role,
                            meta: {
                                mainUrl: 'user',
                                auth: true
                            }
                        },
                        {
                            path: 'menu', // 菜单管理
                            name: 'menu',
                            component: Menu,
                            meta: {
                                mainUrl: 'user',
                                auth: true
                            }
                        },
                        {
                            path: 'log', // 系统日志
                            name: 'log',
                            component: Log,
                            meta: {
                                mainUrl: 'user',
                                auth: true
                            }
                        },
                        // 站点管理
                        {
                            path: 'station', // 站点管理
                            name: 'station',
                            component: Station,
                            meta: {
                                mainUrl: 'station',
                                auth: true
                            }
                        },
                        {
                            path: 'template', // 模板管理
                            name: 'template',
                            component: Muban,
                            meta: {
                                mainUrl: 'station',
                                auth: true
                            }
                        },
                        {
                            path: 'sign', // 内容标志管理
                            name: 'sign',
                            component: Sign,
                            meta: {
                                mainUrl: 'station',
                                auth: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
})
router.beforeEach((to, from, next) => {
    router.app.$options.store.dispatch('loading', true)
    if (to.path.includes('sysIndex') && from.path === '/') {
        next()
    } else {
        if (to.matched.some(m => m.meta.auth)) {
            console.log('auth')
            if (store.getters.isLogin) {
                console.log('isLogin')
                next()
            } else {
                console.log('notLogin')
                next('/')
            }
        } else {
            next()
        }
    }
})
router.afterEach((to, from) => {
    router.app.$options.store.dispatch('loading', false)
})
export default router
