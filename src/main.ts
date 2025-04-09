import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
import store from './store'

app.use(store)

app.use(router)

app.mount('#app')
