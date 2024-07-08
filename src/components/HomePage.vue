/* eslint-disable */
<template>
  <div class="home-page">
    <div>
      <navigate ref="childRef"></navigate>
    </div>
    <div class="card-container">
        <!-- 卡片内容 -->
        <div class="card card1">

        </div>
        <div class="card card-notebook" @click="gotoNotebook">

        </div>
        <div class="card card-memory" @click="gotoMemory">

        </div>
        <div class="card">

        </div>
        <div class="card">

        </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import Navigate from "@/components/Navigate.vue";
const router = useRouter();

const childRef = ref(null);

function gotoNotebook() {
  router.push({name: 'notebook'});
}

function gotoMemory() {
  router.push({name: 'memory'});
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
.card-notebook{
  background-image: url('../assets/notebook.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-memory{
  background-image: url('../assets/seven.png');
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
  //width: 500px;
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