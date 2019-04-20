import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faStepForward, faStepBackward, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle, faStepForward, faStepBackward, faPauseCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import SpotifyWebApi from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

Vue.use(VueSpotify, SpotifyWebApi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')