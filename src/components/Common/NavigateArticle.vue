<script setup>
import {useRoute, useRouter} from 'vue-router';
import {ref, watch} from "vue";
import { defineProps } from 'vue';
import {myHttp} from "@/request/myrequest";
import {Avatar, CirclePlusFilled, HomeFilled, Notification, Star} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {getUrlHash} from "@/utils/commonApi";
import bus from "@/utils/eventBus";
import {gotoLoginApi} from "@/utils/common";

const route = useRoute();
const props = defineProps({
  originTab: {
    type: String,
    default: "",
  }
});

let emit = defineEmits(["checkAuthFinished"])
function handleMouseLeave(){
  menuVisible.value = false
}
let activeTab= ref('首页');
let authority= ref('');
let curUsername= ref('');
let isLogin= ref(false);
const router = useRouter();
useRoute();
const url = '/verify';
let ws = ref();

const menuVisible = ref(false);

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}

function toggleFavorite() {
  router.push({name: 'favoriteArticle'})
}

function toggleCreateCenter() {
  router.push({name: 'manageArticle'})
}

function toggleBlogHome() {
  router.push({name: 'EveryBodyArticle'})
}

function gotoLogin() {
  gotoLoginApi(router)
}

async function verify() {
  let res = false
  authority.value = localStorage.getItem('curAuth')
  await myHttp.post(url)
      .then(async response => {
        if (response.data.code === 200) {
          isLogin.value = true;
          authority.value = response.data.data;
          localStorage.setItem('curAuth', authority.value);
          res = true
        }
      })
      .catch(error => {});
  return res
}

async function getCurUser() {
  let res = false
  curUsername.value = localStorage.getItem('curUsername')
  await myHttp.post('/current-user')
      .then(response => {
        if (response.data.code === 200) {
          curUsername.value = response.data.data;
          localStorage.setItem('curUsername', curUsername.value);
          res = true
        }
      })
      .catch(error => {});
  return res
}
reset()

async function reset() {
  // isLogin.value = false;
  await verify();
  await getCurUser();
  let hash = getUrlHash()
  // 不校验登录的页面
  emit("checkAuthFinished", isLogin.value)
  bus.$emit("loginStatus", isLogin.value)
  if (hash.startsWith("#/knowledge")
      || hash === "#/") {
    return
  }
  if (!isLogin.value) {
    // 要执行的代码;
    await gotoLoginApi(router)
  }
}

function changeTab(tab){
  activeTab.value = tab;
  if(tab==="首页"){
    router.push({name: 'home'});
  }
}
function logout() {
  // 执行退出登录的操作，例如清除token或调用API
  menuVisible.value = false; // 可选：关闭菜单
  // 进行其他退出登录的逻辑，例如跳转到登录页面
  myHttp.post('/logout')
      .then(response => {
        if(response.data.code === 200){
          isLogin.value = false;
          gotoLoginApi(router)
        } else if(response.data.code === 50002){
          ElMessage({
            message: "登出失败" ,
            type: 'error',
          });
        }
      })
      .catch(error => {});
}
watch(() => route.fullPath, (newPath, oldPath) => {
  reset()
});

</script>

<template>
  <div class="top-bar">
    <div class="tabs">
      <!-- 页签内容 -->
      <div class="nav-bar">
        <ul>
          <li >
            <img @click="changeTab('首页')" src="@/assets/yanzilogo.svg" width="36px"  alt=""/>
          </li>
          <li :class="{active: activeTab === '首页'}" style="min-width: 80px; text-align: left">
            <a @click="changeTab('首页')">首页</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-actions">
      <el-button v-if="isLogin" round type="primary" style="margin-right: 8px" @click="router.push('/createArticle')">
        <el-icon color="white" :size="20" style="cursor: pointer;margin-right: 8px;"><CirclePlusFilled /></el-icon>
        发布文章
      </el-button>
      <el-tooltip
          v-if="isLogin"
          effect="dark"
          content="社区首页"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="toggleBlogHome"><HomeFilled /></el-icon>
      </el-tooltip>
      <div @click="toggleBlogHome"
           v-if="isLogin"
           style="color: white;
              font-weight: bold;
              cursor: pointer;
              margin-right: 8px;">社区首页</div>
      <el-tooltip
          v-if="isLogin"
          effect="dark"
          content="创作中心"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="toggleCreateCenter"><Notification /></el-icon>
      </el-tooltip>
      <div @click="toggleCreateCenter"
           v-if="isLogin"
           style="color: white;
              font-weight: bold;
              cursor: pointer;
              margin-right: 8px;">创作中心</div>
      <el-tooltip
          v-if="isLogin"
          effect="dark"
          content="收藏夹"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="toggleFavorite"><Star /></el-icon>
      </el-tooltip>
      <div @click="toggleFavorite"
           v-if="isLogin"
           style="color: white;
              font-weight: bold;
              cursor: pointer;
              margin-right: 8px;">收藏夹</div>
      <el-icon v-if="isLogin" color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="toggleMenu"><Avatar /></el-icon>
      <div v-if="isLogin" style="margin-right: 25px; color: white">Hi, {{curUsername}} !</div>
      <el-tooltip
          v-else
          effect="dark"
          content="前往登录"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoLogin">
          <template #default>
            <img style="height: 100%; width: 100%" src="../../assets/login.svg" alt="">
          </template>
        </el-icon>
      </el-tooltip>
      <div @click="gotoLogin"
           v-if="!isLogin"
           style="color: white;
              font-weight: bold;
              cursor: pointer;
              margin-right: 20px;">前往登录</div>
      <div class="user-menu" v-if="menuVisible" @mouseleave="handleMouseLeave">
        <ul  class="menu" >
          <li style="cursor: pointer"><a @click="logout">退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  //position: fixed;
  width: 100%;
  top:0;
  left: 0;
  background-color: #42b983;
}

.tabs {
  /* 页签样式 */
}

.user-actions {
  display: flex;
  align-items: center;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-bar li {
  display: inline-block;
  margin-right: 10px;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}

.nav-bar li.active a {
  font-weight: bold;
  font-size: 24px;
  color: white;
}

.user-menu {
  position: relative;
}
.avatar {
  cursor: pointer;
  margin-right: 20px;
}
.menu {
  position: absolute;
  top: 20px;
  right: 25px;
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #eee;
  width: 200px;
  z-index: 1000;
}
.menu li {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}
.menu li:last-child {
  border-bottom: none;
}
.menu a {
  text-decoration: none;
  color: #333;
  display: block;
}
.menu a:hover {
  background-color: #f0f0f0;
}
</style>