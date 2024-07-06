import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import Home2 from "@/components/Home2.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home2
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
