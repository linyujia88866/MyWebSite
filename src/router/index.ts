import {createRouter, createWebHashHistory} from 'vue-router'
import HomePage from "@/components/HomePage.vue";

import Memorandum from "@/Comps/Tasks/Memorandum.vue";
import MemoryCards from "@/Comps/Tasks/MemoryCards.vue";
import Message from "@/components/Basic/Message.vue";
import Setting from "@/components/Basic/Setting.vue";
import Login from "@/components/Login.vue";
import Registry from "@/components/Registry.vue";
import UserManager from "@/components/Manage/UserManager.vue";
import NoteEditor from "@/Comps/Article/NoteEditor.vue";
import Articles from "@/Comps/Article/Articles.vue";
import NotePage from "@/Comps/Article/ManageArticles.vue";
import Trans from "@/Core/Trans.vue";
import ViewWord from "@/ViewFile/ViewWord.vue";
import ViewExcel from "@/ViewFile/ViewExcel.vue";
import ViewPPT from "@/ViewFile/ViewPPT.vue";
import Profile from "@/components/Basic/Profile.vue";
import Help from "@/components/Basic/Help.vue";
import TransNew from "@/Core/TransNew.vue";
import FileInfoData from "@/Core/FileInfoData.vue";
import ViewArticle from "@/Comps/Article/ViewArticle.vue";

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
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/help',
    name: 'help',
    component: Help
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
    component: TransNew
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
    component: FileInfoData
  },
  {
    path: '/viewArticle',
    name: 'viewArticle',
    component: ViewArticle
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
