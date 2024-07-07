<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import { defineProps } from 'vue';

const props = defineProps({
  originTab: {
    type: String,
    default: "首页",
  }
});

let activeTab= ref('首页');
let tabs= ref(['首页', '功能', '通知', '设置']);
let isLogin= false;
const router = useRouter();
useRoute();
const url = '/verify';

const menuVisible = ref(false);

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}

async function verify() {
  await axios.post(url)
      .then(response => {
        if(response.data.success === "200"){
          isLogin = true;
        }
        return 0;
      })
      .catch(error => console.error('Error:', error));
  return 1;
}

onMounted( async () => {
  console.log("初始页签" + props.originTab)
  activeTab.value = props.originTab;
  isLogin=false;
  const result = await verify();
  if (!isLogin) {
    // 要执行的代码;
    await router.push({name: 'login'});
  }
})

function changeTab(tab){
  console.log("更改tab" + tab)
  activeTab.value = tab;
  if(tab==="首页"){
    router.push({name: 'home'});
  }
}

function updateTab() {
  changeTab('功能');
}

function logout() {
  // 执行退出登录的操作，例如清除token或调用API
  menuVisible.value = false; // 可选：关闭菜单
  // 进行其他退出登录的逻辑，例如跳转到登录页面
  axios.post('/logout')
      .then(response => {
        if(response.data.success === "200"){
          isLogin = false;
          router.push({name: 'login'});
        }
      })
      .catch(error => console.error('Error:', error));
}

defineExpose({
  updateTab
})
</script>

<template>
  <div class="top-bar">
    <div class="tabs">
      <!-- 页签内容 -->
      <div class="nav-bar">
        <ul>
          <li v-for="(tab, index) in tabs" :key="index" :class="{active: activeTab === tab}">
            <a @click="changeTab(tab)">{{ tab }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-actions">

      <!-- 帮助图标 -->
      <img src="../assets/help.jpg" alt="Help Icon" class="help-icon">
      <!-- 用户头像 -->
      <div class="avatar" @click="toggleMenu">
        <!-- 头像内容，可以是图片或者其他元素 -->
        <img src="../assets/logo.png" alt="User Avatar" class="user-avatar">
      </div>
      <div class="user-menu">

        <ul v-if="menuVisible" class="menu">
          <!-- 菜单项 -->
          <li><a href="#">个人信息</a></li>
          <li><a href="#">设置</a></li>
          <li><a href="#" @click="logout">退出登录</a></li>
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
  margin: 0;
  background-color: #f5f5f5;
}

.tabs {
  /* 页签样式 */
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.help-icon {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-bar li {
  display: inline-block;
  margin-right: 10px;
}

.nav-bar li.active a {
  font-weight: bold;
  font-size: 24px;
  color: #42b983;
}



.user-menu {
  position: relative;
}
.avatar {
  cursor: pointer;
}
.menu {
  position: absolute;
  top: 20px;
  right: -10px;
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #eee;
  width: 200px;
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