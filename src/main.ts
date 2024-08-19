import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalStore } from './store';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import test from "@/websocket/test.vue";

// // 创建全局唯一的组件实例
// const globalComponentInstance = createApp(test);
//
// // 这是全局唯一的组件挂载点
// const globalContainer = document.createElement('div');
// globalContainer.style.display = 'none';
// document.body.appendChild(globalContainer);
//
// // 挂载到全局容器
// globalComponentInstance.mount(globalContainer);

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})

const app = createApp(App)

// 注册全局单例组件
// app.component('MySingletonComponent', test);

// app.config.globalProperties.$componentMounted = false;

app.config.globalProperties.$globalStore = globalStore;
app.use(router)
app.use(ElementPlus)
app.mount('#app')