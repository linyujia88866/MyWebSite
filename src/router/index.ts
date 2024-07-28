import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from "@/components/HomePage.vue";

import Memorandum from "@/components/Memorandum.vue";
import MemoryCards from "@/components/MemoryCards.vue";
import Message from "@/components/Message.vue";
import Setting from "@/components/Setting.vue";
import Login from "@/components/Login.vue";
import Registry from "@/components/Registry.vue";
import UserManager from "@/components/UserManager.vue";
import NoteEditor from "@/Core/NoteEditor.vue";
import Articles from "@/Core/Articles.vue";
import NotePage from "@/Core/NotePage.vue";
import Trans from "@/Core/Trans.vue";
import ViewWord from "@/ViewFile/ViewWord.vue";
import ViewExcel from "@/ViewFile/ViewExcel.vue";
import ViewPPT from "@/ViewFile/ViewPPT.vue";

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
  },
  {
    path: '/registry',
    name: 'registry',
    component: Registry
  },
  {
    path: '/manager',
    name: 'manager',
    component: UserManager
  },
  {
    path: '/edit',
    name: 'edit',
    component: NoteEditor
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotePage
  },
  {
    path: '/fileTrans',
    name: 'fileTrans',
    component: Trans
  },
  {
    path: '/viewWord',
    name: 'viewWord',
    component: ViewWord
  },
  {
    path: '/viewExcel',
    name: 'viewExcel',
    component: ViewExcel
  },
  {
    path: '/viewPPT',
    name: 'viewPPT',
    component: ViewPPT
  },
  {
    path: '/test',
    name: 'test',
    component: ViewPPT
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
