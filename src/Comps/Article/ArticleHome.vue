/* eslint-disable */
<template>
  <div class="home-page">
    <div>
      <navigate-one ref="childRef" :origin-tab="'文章社区首页'"></navigate-one>
    </div>
    <div class="card-container">
      <!-- 卡片内容 -->
      <div>
        <div class="card card-fileTrans" @click="gotoCreateArt">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          创建新的文章
        </p>
      </div>
      <!--=================================================分割线================================================================-->
      <div>
        <div class="card card-fileChange" @click="gotoManage">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          管理我的文章
        </p>
      </div>

<!--      ================================================-->
      <div>
        <div class="card card-tushuguan" @click="gotoReadArticles">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          浏览别人的文章
        </p>
      </div>

<!--      ================================-->
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";
const router = useRouter();

const childRef = ref(null);

function gotoCreateArt() {
  router.push({name: 'createArticle'});
}

function gotoManage() {
  router.push({name: 'notes'});
}

function gotoReadArticles() {
  router.push({name: 'EveryBodyArticle'});
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

.card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  padding: 12px 10px 10px;
  flex-grow: 1;
}

.card {
  /* 卡片样式 */
  border: 1px solid #ddd;
  height: 30%;
  border-radius: 4px;
  padding: 10px;
  text-align: center;

  background-image: url('@/assets/more.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-table{
  background-image: url('@/assets/table.png');
  background-size: cover;
  background-position: 0 -20px;
  background-repeat: no-repeat;
}
.card-notebook{
  background-image: url('@/assets/note.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-memory{
  background-image: url('@/assets/remember.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileTrans{
  background-image: url('@/assets/createArticle.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileChange{
  background-image: url('@/assets/manageArticle.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-tushuguan{
  background-image: url('@/assets/tushuguan.jpg');
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