import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App).use(
    Vue3Toasity,
    {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 3000,
    }
).mount('#app')
