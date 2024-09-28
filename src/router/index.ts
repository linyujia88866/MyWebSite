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
import Articles from "@/Comps/Article/PriArticles.vue";
import NotePage from "@/Comps/Article/ManageArticles.vue";
import ViewWord from "@/ViewFile/ViewWord.vue";
import ViewExcel from "@/ViewFile/ViewExcel.vue";
import ViewPPT from "@/ViewFile/ViewPPT.vue";
import Profile from "@/components/Basic/Profile.vue";
import Help from "@/components/Basic/Help.vue";
import TransNew from "@/Core/TransNew.vue";
import ViewArticle from "@/Comps/Article/ViewArticle.vue";
import CreateArticle from "@/Comps/Article/CreateArticle.vue";
import ArticleHome from "@/Comps/Article/ArticleHome.vue";
import EveryBodysArticles from "@/Comps/Article/EveryBodysArticles.vue";
import FileConvertHome from "@/convert/FileConvertHome.vue";
import DownLoadGif from "@/convert/DownLoadGif.vue";
import WebSocketExample from "@/websocket/WebSocketExample.vue";
import MessageManage from "@/components/Manage/MessageManage/MessageManage.vue";
import MessageDetail from "@/components/Basic/MessageDetail.vue";
import MessageTabs from "@/components/Basic/MessageTabs.vue";
import Base64 from "@/convert/Base64.vue";

const routes = [
  {
    path: '/',
    name: 'default',
    component: EveryBodysArticles,
    meta: { title: '浏览文章' }
  },{
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { title: '' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/memory',
    name: 'memory',
    component: Memorandum,
    meta: { title: '待办详情' }
  },
  {
    path: '/memoryCards',
    name: 'memoryCards',
    component: MemoryCards,
    meta: { title: '待办列表' }
  },
  {
    path: '/message',
    name: 'message',
    component: MessageTabs,
    meta: { title: '消息' }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    meta: { title: '设置' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { title: '个人中心' }
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
    meta: { title: '帮助' }
  },
  {
    path: '/registry',
    name: 'registry',
    component: Registry,
    meta: { title: '注册' }
  },
  {
    path: '/manager',
    name: 'manager',
    component: UserManager,
    meta: { title: '用户管理' }
  },
  {
    path: '/messageManage',
    name: 'messageManage',
    component: MessageManage,
    meta: { title: '消息管理' }
  },
  {
    path: '/messageDetail',
    name: 'messageDetail',
    component: MessageDetail,
    meta: { title: '消息详情' }
  },
  {
    path: '/edit',
    name: 'edit',
    component: NoteEditor,
    meta: { title: '编辑文章' }
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles,
    meta: { title: '文章列表' }
  },
  {
    path: '/manageArticle',
    name: 'manageArticle',
    component: NotePage,
    meta: { title: '管理文章' }
  },
  {
    path: '/fileTrans',
    name: 'fileTrans',
    component: TransNew,
    meta: { title: '文件传输' }
  },
  {
    path: '/fileConvert',
    name: 'fileConvert',
    component: FileConvertHome,
    meta: { title: '文件转换' }
  },
  {
    path: '/downloadGif',
    name: 'downloadGif',
    component: DownLoadGif,
    meta: { title: '文件转换' }
  },
  {
    path: '/base64',
    name: 'base64',
    component: Base64,
    meta: { title: 'Base64加解密' }
  },
  {
    path: '/viewWord',
    name: 'viewWord',
    component: ViewWord,
    meta: { title: 'word文件浏览' }
  },
  {
    path: '/viewExcel',
    name: 'viewExcel',
    component: ViewExcel,
    meta: { title: 'excel文件浏览' }
  },
  {
    path: '/viewPPT',
    name: 'viewPPT',
    component: ViewPPT,
    meta: { title: 'ppt文件浏览' }
  },
  {
    path: '/test',
    name: 'test',
    component: WebSocketExample,
    meta: { title: '测试' }
  },
  {
    path: '/viewArticle',
    name: 'viewArticle',
    component: ViewArticle,
    meta: { title: '查看文章' }
  },
  {
    path: '/createArticle',
    name: 'createArticle',
    component: CreateArticle,
    meta: { title: '创建文章' }
  },
  {
    path: '/articleHome',
    name: 'articleHome',
    component: ArticleHome,
    meta: { title: '文章首页' }
  },
  {
    path: '/EveryBodyArticle',
    name: 'EveryBodyArticle',
    component: EveryBodysArticles,
    meta: { title: '浏览文章' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
