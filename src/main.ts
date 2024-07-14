import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalStore } from './store';
const app = createApp(App)
app.config.globalProperties.$globalStore = globalStore;
app.use(router)
app.mount('#app')