import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faStepForward, faStepBackward, faPauseCircle, faMobileAlt, faRandom, faSyncAlt, faBars, faTimes, faVolumeUp, faVolumeOff, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle, faStepForward, faStepBackward, faPauseCircle, faMobileAlt, faRandom, faSyncAlt, faBars, faTimes, faVolumeUp, faVolumeOff, faClock, faEllipsisV)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

Vue.use(VueSpotify, new Spotify())

import VueSession from 'vue-session'

Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')