import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Callback from './components/Callback'
import Playlist from './components/Playlist'
import User from './components/User'
import Search from './components/Search'
import Album from './components/Album'
import Artist from './components/Artist'

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
        },
        {
            path: '/playlist/:id',
            name: "Playlist",
            component: Playlist
        },
        {
            path: '/album/:id',
            name: "Album",
            component: Album
        },
        {
            path: '/artist/:id',
            name: "Artist",
            component: Artist
        },
        {
            path: '/user/:id',
            name: "User",
            component: User
        },
        {
            path: '/search/:str',
            name: "Search",
            component: Search
        }
    ]
})