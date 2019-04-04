import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(axios, VueAxios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
