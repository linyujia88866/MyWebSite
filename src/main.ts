import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalStore } from './store';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})

const app = createApp(App)
app.config.globalProperties.$globalStore = globalStore;
app.use(router)
app.use(ElementPlus)
app.mount('#app')