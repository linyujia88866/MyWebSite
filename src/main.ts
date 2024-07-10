import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ElForm } from "element-plus";
createApp(App).use(router).use(ElForm).mount('#app')