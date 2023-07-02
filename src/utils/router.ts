import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/player/:playerName', name: 'Player', component: Player, props: true },
    ]
})