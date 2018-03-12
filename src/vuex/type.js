// base
export const BASE_IS_MOBILE = 'BASE_IS_MOBILE'

// login
export const TO_LOGIN = 'TO_LOGIN' // 登录操作
export const SET_TOKEN_NAME = 'SET_TOKEN_NAME' // 设置token

// register
export const GET_SMSCODE = 'GET_SMSCODE' // 获取验证码
export const REGISTER = 'REGISTER'
export const SET_MOBILEERRORTEXT = 'SET_MOBILEERRORTEXT' // 设置手机号码输入有误
export const SET_PASSWORDERRORTEXT = 'SET_PASSWORDERRORTEXT' // 设置密码输入有误

// home
export const HOME_GET_BANNER_LIST = 'HOME_GET_BANNER_LIST' // 获取banner
export const GET_MAIN_MENU = 'GET_MAIN_MENU' // 获取主菜单
export const GET_CHILD_MENU = 'GET_CHILD_MENU' // 获取子菜单
export const CHANGE_LOADING = 'CHANGE_LOADING' // 修改loading加载动画状态

/** ********************系统管理******************************/
// 日志管理
export const GET_LOG_LIST = 'GET_LOG_LIST' // 获取系统日志
export const GET_IP_SOURCE = 'GET_IP_SOURCE' // 获取IP数据源
// 菜单管理
export const GET_ALL_MAIN_MENU_LIST = 'GET_ALL_MAIN_MENU_LIST' // 菜单管理  获取所有主菜单
export const GET_ALL_CHILD_MENU_LIST = 'GET_ALL_CHILD_MENU_LIST' // 菜单管理  根据父菜单id获取所有子菜单
export const EDIT_TABLE_DATA = 'EDIT_TABLE_DATA' // 菜单管理 修改表格数据 点击展开一行关闭其他的行
// 角色管理
export const GET_ROLE_LIST = 'GET_ROLE_LIST' // 获取系统角色
export const GET_MENU_BY_ROLE = 'GET_MENU_BY_ROLE' // 根据角色获取权限菜单
// 用户管理
export const GET_USER_LIST = 'GET_USER_LIST' // 获取用户列表
// 模板管理
export const GET_MUBAN_LIST = 'GET_MUBAN_LIST' // 获取模板列表
// 内容标志管理
export const GET_SIGN_LIST = 'GET_SIGN_LIST' // 获取内容标志列表

/** *********************站点管理****************/
// 站点管理
export const GET_STATIONLIST = 'GET_STATIONLIST' // 获取站点列表

/** **********************用户首页 **************/
export const GET_MOULD_LIST = 'GET_MOULD_LIST' // 获取模板信息
