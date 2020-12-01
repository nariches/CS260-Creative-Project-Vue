import Vue from 'vue'
import App from './App.vue'
import router from './router'
import musicLibrary from './music-data.js'

let data = {
  library: musicLibrary
}

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

//Vue.config.productionTip = false