import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Player from '../views/Player.vue'

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'WynnStats'
        }
    },
    { 
        path: '/player/:playerName',
        name: 'Player',
        component: Player,
        props: true,
        meta: {
            // title with player name
            title: 'Player statistics'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        const playerName = to.params.playerName || '' // Get the playerName from route parameters
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if(to.name === 'Player') {
            document.title = `${playerName} | ${to.meta.title}`
            favicon.href = `https://cravatar.eu/avatar/${playerName}`
            return next()
        }
        document.title = to.meta.title as string;
        favicon.href = 'https://cravatar.eu/avatar/steve'
    }
    next()
});

export default router