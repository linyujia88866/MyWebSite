/* eslint-disable */
<template>
  <div class="home-page">
    <div class="top-bar">
      <div class="tabs">
        <!-- 页签内容 -->
        <div class="nav-bar">
          <ul>
            <li v-for="(tab, index) in tabs" :key="index" :class="{active: activeTab === tab}">
              <a @click="activeTab = tab">{{ tab }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-actions">

        <!-- 帮助图标 -->
        <img src="../assets/help.jpg" alt="Help Icon" class="help-icon">
        <!-- 用户头像 -->
        <img src="../assets/logo.png" alt="User Avatar" class="user-avatar">
      </div>
    </div>
    <div class="card-container">
        <!-- 卡片内容 -->
        <div class="card card1">

        </div>
        <div class="card">

        </div>
        <div class="card">

        </div>
        <div class="card">

        </div>
        <div class="card">

        </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import axios from "axios";
let activeTab= ref('首页');
let tabs= ref(['首页', '通知', '设置']);
let isLogin= false;
const router = useRouter();
const route = useRoute();


const url = '/verify';
onMounted( async () => {
  isLogin=false;
  const result = await verify();
  if (!isLogin) {
    console.log("重新返回登录界面")
    // 要执行的代码;
    router.push({name: 'login'});
  }
})


async function verify() {
  await axios.post(url)
      .then(response => {
        console.log(response.data)
        console.log(response.data.data)
        if(response.data.success === "200"){
          isLogin = true;
        }

        return 2;
      })
      .catch(error => console.error('Error:', error));
  return 1;
}





</script>

<style scoped>
.home-page {
  width: 100%;
  height: 98vh;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
}

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

.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 10px;
  flex-grow: 1;
}

.card {
  /* 卡片样式 */
  border: 1px solid #ddd;
  height: 90%;
  border-radius: 4px;
  padding: 10px;
  text-align: center;

  background-image: url('../assets/more.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card1{
  background-image: url('../assets/quick.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

</style>