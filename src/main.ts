import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入ui 库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 
// 引入ui icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
   
app.use(ElementPlus)
app.use(store)

app.use(router)

app.mount('#app')
