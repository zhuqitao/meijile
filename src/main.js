// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import MuseUI from 'muse-ui'
import './config/index'
import iView from 'iview'
// 元素是否在可视区域插件
// import VueObserveVisibility from 'vue-observe-visibility'

// lazyload 插件
import VueLazyload from 'vue-lazyload'
// 自定义插件
// import vQuery from './unit/'

import 'muse-ui/dist/muse-ui.css'
import 'iview/dist/styles/iview.css'

// socket
import VueSocketio from 'vue-socket.io'
// google material 字体与图表文件

// import './static/css/plugin/material-design-icons/GoogleIcon.css'

Vue.use(MuseUI)
Vue.use(iView)
// socket
// Vue.use(VueSocketio, 'https://101.200.54.33:8081')
// Vue.use(VueObserveVisibility)
Vue.use(VueLazyload, {
    preLoad: 1,
    error: 'dist/error.png',
    loading: '../static/loading.gif',
    attempt: 1
  })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
