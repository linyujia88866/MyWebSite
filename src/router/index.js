import {createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login.vue";
import HomePage from "@/components/HomePage.vue";
import NoteBook from "@/components/NoteBook.vue";
import Memorandum from "@/components/Memorandum.vue";
import MemoryCards from "@/components/MemoryCards.vue";
import Message from "@/components/Message.vue";
import Setting from "@/components/Setting.vue";

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
  },
  {
    path: '/memoryCards',
    name: 'memoryCards',
    component: MemoryCards
  },
  {
    path: '/message',
    name: 'message',
    component: Message
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
