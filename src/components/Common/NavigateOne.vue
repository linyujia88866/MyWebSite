<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import { defineProps } from 'vue';
import {myHttp} from "@/request/myrequest";
import {Avatar, Message, Management, Setting} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const props = defineProps({
  originTab: {
    type: String,
    default: "",
  }
});
function handleMouseLeave(){
  menuVisible.value = false
}
let activeTab= ref('首页');
let authority= ref('');
let isLogin= false;
const router = useRouter();
useRoute();
const url = '/verify';

const menuVisible = ref(false);

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}

async function verify() {
  authority.value = localStorage.getItem('curAuth')
  await myHttp.post(url)
      .then(response => {
        if (response.data.code === 200) {
          isLogin = true;
          authority.value = response.data.data;
          localStorage.setItem('curAuth', authority.value);
        }
      })
      .catch(error => console.error('Error:', error));
}

onMounted( async () => {
  // activeTab.value = props.originTab;
  isLogin=false;
  await verify();
  if (!isLogin) {
    // 要执行的代码;
    await router.push({name: 'login'});
    ElMessage({
      message: "请先登录" ,
      type: 'error',
    });
  }

})

function changeTab(tab){
  activeTab.value = tab;
  if(tab==="首页"){
    router.push({name: 'home'});
  }
}

function updateTab() {
  // changeTab('功能');
}

function gotoHelp(){
  router.push({name: 'help'});
}

function gotoMessage(){
  router.push({name: 'message'});

}

function gotoSetting(){
  router.push({name: 'setting'});
}

function gotoManage(){
  router.push({name: 'manager'});
}

function logout() {
  // 执行退出登录的操作，例如清除token或调用API
  menuVisible.value = false; // 可选：关闭菜单
  // 进行其他退出登录的逻辑，例如跳转到登录页面
  myHttp.post('/logout')
      .then(response => {
        if(response.data.code === 200){
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
          <li :class="{active: activeTab === '首页'}">
            <a @click="changeTab('首页')">首页</a>
          </li>
          <li style="margin-left: 12px; cursor: default " v-if="props.originTab.length > 0" :class="{active: activeTab === props.originTab}">
            <a >{{props.originTab}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-actions">
      <el-icon color="white" :size="30" @click="gotoMessage" style="cursor: pointer; margin-right: 8px;"><Message /></el-icon>
<!--      <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoHelp"><HelpFilled /></el-icon>-->
      <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoHelp">
        <template #default>
          <img style="height: 100%; width: 100%" src="@/assets/帮助.svg">
        </template>
      </el-icon>
      <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoSetting"><Setting /></el-icon>
      <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoManage" v-if="authority === '0'"><Management /></el-icon>
      <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 20px;" @click="toggleMenu"><Avatar /></el-icon>
      <div class="user-menu" @mouseleave="handleMouseLeave">

        <ul v-if="menuVisible" class="menu" >
          <!-- 菜单项 -->
          <li><a href="/#/profile">个人信息</a></li>
          <li><a href="/#/setting">设置</a></li>
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