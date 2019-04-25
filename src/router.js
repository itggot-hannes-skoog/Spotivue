import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue';
import Callback from './components/Callback'
import Playlist from '@/views/Playlist'
import User from '@/views/User'
import Search from '@/views/Search'
import Album from '@/views/Album'
import Artist from '@/views/Artist'

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