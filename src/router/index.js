import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import HomePage from "@/components/HomePage.vue";
import NoteBook from "@/components/NoteBook.vue";
import Memorandum from "@/components/Memorandum.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/notebook',
    name: 'notebook',
    component: NoteBook
  },
  {
    path: '/memory',
    name: 'memory',
    component: Memorandum
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
