<template>
    <div class="login">
        <div class="loginCon">
            <div class="loginHead">登录</div>
            <mu-text-field class="mobile" label="手机" labelFloat v-model="mobile" :errorText="mobileErrorText" /><br/>
            <mu-text-field class="password" type="password" label="密码" labelFloat fullWidth v-model="password" :errorText="passwordErrorText" /><br/>
            <mu-raised-button @click="login()" label="登录" class="loginBtn" primary fullWidth/>
            <router-link :to="{ path: 'register', query: { plan: 'private' }}" class="logToggle">
                <mu-flat-button label="注册" class="demo-flat-button" secondary/>
                <mu-flat-button label="找回密码" class="demo-flat-button" secondary/>
            </router-link>
        </div>
        <div></div>
    </div>
</template>
<script>
    import './login.sass'
    import {
        mapGetters
    } from 'vuex'
    export default {
        data () {
            return {
                mobile: '',
                password: ''
            }
        },
        computed: mapGetters({
            isLogin: 'isLogin',
            userToken: 'userToken',
            passwordErrorText: 'passwordErrorText',
            mobileErrorText: 'mobileErrorText'
        }),
        methods: {
            login: function () {
                var _this = this
                _this.$store.dispatch('tologin', {
                    mobile: _this.mobile,
                    password: _this.password
                })
            }
        }
    }
</script>
