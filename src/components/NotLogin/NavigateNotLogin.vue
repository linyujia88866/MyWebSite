<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import { defineProps } from 'vue';
import {Avatar, } from "@element-plus/icons-vue";

const props = defineProps({
  originTab: {
    type: String,
    default: "首页",
  }
});
let activeTab= ref('首页');
let isLogin= false;
const router = useRouter();
useRoute();
const url = '/verify';

const menuVisible = ref(false);

function toggleMenu() {
  router.push({name: 'login'});
}

onMounted( async () => {
  activeTab.value = props.originTab;
  isLogin=false;
})

function changeTab(tab){
  activeTab.value = tab;
  if(tab==="首页"){
    router.push({name: 'home'});
  }
}

function gotoHelp(){
  router.push({name: 'help'});
}
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
        </ul>
      </div>
    </div>
    <div class="user-actions">
      <el-tooltip
          effect="dark"
          content="帮助"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 8px;" @click="gotoHelp">
          <template #default>
            <img style="height: 100%; width: 100%" src="../../assets/帮助.svg">
          </template>
        </el-icon>
      </el-tooltip>

      <el-tooltip
          effect="dark"
          content="前往登录"
          placement="top"
          :show-after="500"
      >
        <el-icon color="white" :size="30" style="cursor: pointer;margin-right: 20px;" @click="toggleMenu">
          <template #default>
            <img style="height: 100%; width: 100%" src="../../assets/登录.svg">
          </template>
        </el-icon>
      </el-tooltip>

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