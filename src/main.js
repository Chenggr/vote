// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import vConfig from './index'
// import watermark from 'vue-watermark-directive'
import '../node_modules/mint-ui/lib/style.min.css' // mint-ui
import 'swiper/dist/css/swiper.css'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css' // 本地css

import 'jquery'
import 'styles/reset.css'
// import 'styles/border.css'

import './assets/styles/semantic.min.css'

import 'lib-flexible'

// eslint-disable-next-line
// import vConsole from 'vconsole'

import globalVar from './common/global_var.js'
import cal from './common/calculation.js'

import { DEBUG } from './config/config.js'

Vue.use(mandMobile)

Vue.prototype.DEBUG = DEBUG
Vue.prototype.GLOBAL = globalVar
Vue.prototype.cal = cal

FastClick.attach(document.body)

Vue.use(vConfig)
Vue.use(VueRouter)

Vue.config.productionTip = false
// Vue.use(watermark, DEFAULT_CONFIG)

// 自定义指令页面title实时更新
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

// document.addEventListener('deviceready', function () {
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
// })
