import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Callback from './components/Callback'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/callback',
            name: "Callback",
            component: Callback
        }
    ]
})