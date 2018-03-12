<template>
    <div class="mould">

        <mu-toast v-if="toast" :message="message" @close="toast = false"/>
        <!-- 登录弹窗 -->
        <mu-popup popupClass="login-popup" position="top" :overlay="true" :open="loginSwitch" @close="loginSwitch = false">
            <!-- 登录 -->
            <div v-show="loginOrRegister==='login'">
                <mu-text-field class="mobile" label="手机" labelFloat fullWidth v-model="mobile" :errorText="mobileErrorText" /><br/>
                <mu-text-field class="password" type="password" label="密码" labelFloat fullWidth v-model="password" :errorText="passwordErrorText" /><br/>
                <mu-raised-button @click="login" label="登录" class="loginBtn" primary fullWidth/>
                <router-link :to="{ path: 'register', query: { plan: 'private' }}" class="logToggle"></router-link>
                <div class="margin-right">
                    <mu-flat-button label="注册" class="demo-flat-button" secondary @click="toRegister"/>
                    <mu-flat-button label="找回密码" class="demo-flat-button" secondary/>
                </div>
            </div>
            <!-- 注册 -->
            <div v-show="loginOrRegister==='register'">
                <mu-text-field  label="用户名" labelFloat fullWidth v-model="registerUserName" /><br/>
                <mu-text-field  label="手机" labelFloat fullWidth v-model="mobile" /><br/>
                <mu-text-field type="password" label="密码" labelFloat fullWidth v-model="password" /><br/>
                <mu-raised-button @click="register()" label="注册" labelClass="loginBtn" class="demo-raised-button" fullWidth primary/>
                <div class="margin-right">
                    <mu-flat-button label="登录" class="demo-flat-button" @click="toLogin" secondary/>
                </div>
            </div>
        </mu-popup>

        <!-- 新建站点弹窗 -->
        <mu-dialog :open="station.open" title="新建站点" @close="station.open = false">
            <mu-text-field  label="新建站点名字" labelFloat fullWidth v-model="station.name" /><br/>
            <mu-text-field  label="站点链接" labelFloat v-model="station.prefix" />
            <span>.meijile.xin</span>
            <mu-flat-button slot="actions" @click="station.open = false"  label="取消"/>
            <mu-raised-button v-if="!station.success" slot="actions" primary @click="useMouldClick" label="新建站点"/>
            <mu-raised-button v-if="station.success" slot="actions" secondary @click="toEdit" label="编辑站点"/>
        </mu-dialog>
        <!-- 新建站点成功弹窗 -->
        <!-- <mu-dialog :open="station.open" title="新建站点" @close="station.open = false">
            成功创建站点
            <mu-flat-button slot="actions" @click="station.open = false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="toEditMuban" label="确定"/>
        </mu-dialog> -->
        

        <div class="head">
            <div class="logo">
                <div>One Step 建站</div>
                <img src="/static/logo.png">
            </div>
            <div class="btn-group">
                <mu-raised-button  v-if="!isLogin" class="login-info" label="登录" @click="openLogin" primary/>
                <mu-flat-button  v-else class="login-info" :label="userName" primary/>
                <mu-raised-button v-show="isLogin" class="mould-manage" to="/sysIndex/station" label="管理" target="_blank" primary/>
            </div>
        </div>
        <div class="scroll">
            <div class="scroll-item">
                <img src="http://bk.image.styleweb.com.cn/2016/04/24/e4e8e1e7619aea9d38158892b44ed816.png">
            </div>
        </div>
        <div class="type">
            <mu-tabs :value="activeTab" class="type-bar" @change="handleTabChange">
                <mu-tab value="tab" title="所有网站" />
                <mu-tab value="tab1" title="个人网站" />
                <mu-tab value="tab2" title="企业网站" />
                <mu-tab value="tab3" title="销售网站" />
            </mu-tabs>
        </div>
        <div class="content">
            <div class="mould-item" v-for="item in mouldList.content" :key="item.id">
                <mu-card>
                    <mu-card-media>
                        <img v-lazy="item.pic1Str" @mouseover="imgOver" @mouseout="imgOut"/>
                    </mu-card-media>
                    <mu-card-title :title="item.title" />
                    <mu-card-text>
                        {{item.info}}
                    </mu-card-text>
                    <mu-card-actions>
                        <mu-raised-button label="预览模板" :href="item.linkUrlstr" target="_blank" />
                        <mu-raised-button label="使用此模板" primary @click="useMould(item)" />
                    </mu-card-actions>
                </mu-card>
            </div>
        </div>
    </div>
</template>
<script>
    import "./mould.sass"
    import {mapGetters} from 'vuex'
    import login from '@/pages/login/login.vue'
    const querystring = require('querystring')
    export default {
        data () {
            return {
                activeTab: "tab",
                toast: false, // message 信息提示开关
                message: '', // message 信息提示内容
                loginSwitch: false,
                loginOrRegister: 'login',
                // userNameLocal: '',
                registerUserName: '',
                mobile: '',
                password: '',
                station: {
                    templateId: '', // 模板id
                    open: false, // 弹窗开关
                    name: "", // 站点名字
                    prefix: "", // 站点前缀
                    success: false // 站点创建成功与否
                }
            }
        },
        computed: {
            ...mapGetters({
                mouldList: 'mouldList',
                isLogin: 'isLogin',
                userName: 'userName',
                passwordErrorText: 'passwordErrorText',
                mobileErrorText: 'mobileErrorText'
            })
        },
        created: function () {
            this.getMouldList({
                page: 0,
                size: 10
            })
            // this.userName = localStorage.getItem('currentUser_name')
        },
        methods: {
            openLogin () {
                this.loginSwitch = true
                this.loginOrRegister = 'login'
            },
            toLogin () {
                this.loginOrRegister = 'login'
            },
            login: function () {
                var _this = this
                _this.$store.dispatch('tologin', {
                    mobile: _this.mobile,
                    password: _this.password
                }).then(res => {
                    _this.loginSwitch = false
                    _this.toast = true
                    _this.message = res.msg
                    setTimeout(() => {
                        _this.toast = false
                    }, 2000)
                    if (res.success) {
                    }
                })
            },
            toRegister () {
                this.loginOrRegister = 'register'
            },
            register () {
                var _this = this
                this.$store.dispatch('register', {
                    mobile: this.mobile,
                    password: this.password,
                    username: this.registerUserName
                }).then(res => {
                    //  _this.loginSwitch = false
                    _this.toast = true
                    _this.message = res.msg
                    if (res.success) {
                        this.loginOrRegister = 'login'
                        setTimeout(() => {
                            _this.toast = false
                        }, 2000)
                        _this.message = res.msg
                    }
                })
            },
            getMouldList (state) {
                this.$store.dispatch('getMouldList', state)
            },
            // 选择模板类型
            handleTabChange (val) {
                this.activeTab = val
                this.getMouldList({
                    page: this.mouldList.number,
                    size: 10,
                    type: val.slice(3, 4)
                })
            },
            // 点击使用此模板
            useMould (item) {
                this.station.success = false
                this.station.templateId = item.id
                if (this.isLogin) {
                    this.station.open = true
                } else {
                    this.toast = true
                    this.message = '请先登录'
                    setTimeout(() => {
                        this.toast = false
                    }, 1000)
                }
            },
            // 输入站点名字完毕 点击确定
            useMouldClick () {
                let token = localStorage.getItem('currentUser_token')
                this.$store.dispatch('useMouldClick', {
                    name: this.station.name,
                    prefix: this.station.prefix,
                    templateId: this.station.templateId
                }).then(res => {
                    this.toast = true
                    this.message = res.msg
                    setTimeout(() => {
                        this.toast = false
                    }, 1000)
                    if (res.success) {
                        this.station.success = true
                    }
                })
            },
            // 点击进去编辑站点（模板编辑） 页面
            toEdit () {
                this.station.open = false
                let token = localStorage.getItem('currentUser_token')
                window.open('http://' + this.station.prefix + '.meijile.xin/editStation?token=' + token)
            },
            // 鼠标悬置在图片上
            imgOver (e) {
                var imgHeight = e.target.height
                var conHeight = e.target.parentNode.offsetHeight
                var scrollHeight = imgHeight - conHeight
                e.target.style.transform = `translateY(-${scrollHeight}px)`
                e.target.style.transition = '5s linear'
            },
            // 鼠标离开图片上
            imgOut (e) {
                e.target.style.transform = `translateY(0px)`
            }
        },
        components: {
            login: login
        }
    }
</script>
