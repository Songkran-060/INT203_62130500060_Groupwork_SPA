import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseCard from './components/BaseCard.vue'
import './assets/tailwind.css'

const app = createApp(App)
app.component('base-card', BaseCard)
app.use(router).mount('#app')
