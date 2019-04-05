import Vue from 'vue'
import App from './App.vue'
import router from './router'

import SpotifyWebApi from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

Vue.use(VueSpotify, SpotifyWebApi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')