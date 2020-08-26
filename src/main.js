import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

import toast from './components/common/toast/index.js'

Vue.config.productionTip = false

//在原型上添加事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//图片懒加载,还可传入options
//使用时，将图片的:src=''更改为v-lazy=''
Vue.use(VueLazyLoad)

//解决移动端延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
