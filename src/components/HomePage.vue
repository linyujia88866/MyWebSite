/* eslint-disable */
<template>
  <div class="home-page">
    <div>
      <navigate-one ref="childRef"></navigate-one>
    </div>
    <div class="card-container">
        <!-- 卡片内容 -->
        <div>
          <div class="card card-fileTrans" @click="gotoTrans">

          </div>
          <p style="margin: 0; padding: 0; font-weight: bold;">
            文件传输助手
          </p>
        </div>
      <!--=================================================分割线================================================================-->
      <div  v-if="false">
        <div class="card card-fileChange" @click="gotoTrans">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          文件转换助手
        </p>
      </div>
<!--=================================================分割线================================================================-->
      <div>
        <div class="card card-notebook" @click="gotoNotebook">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          文章博客社区
        </p>
      </div>
      <!--=================================================分割线================================================================-->
      <div>
        <div class="card card-memory" @click="gotoMemory">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          待办任务
        </p>
      </div>
      <!--=================================================分割线================================================================-->
      <div v-if="false">
        <div class="card card-table" >

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          表格快捷变换
        </p>
      </div>


      <div  v-if="false" class="card" @click.stop="gotoTest()" >

      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";
const router = useRouter();

const childRef = ref(null);

function gotoNotebook() {
  router.push({name: 'EveryBodyArticle'});
}

function gotoTest() {
  router.push({name: 'test'});
}

function gotoMemory() {
  router.push({name: 'memoryCards'});
}

function gotoTrans() {
  router.push({name: 'fileTrans'});
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

  background-image: url('../assets/more.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-table{
   background-image: url('../assets/table.png');
   background-size: cover;
   background-position: 0 -20px;
   background-repeat: no-repeat;
 }
.card-notebook{
  background-image: url('../assets/报刊杂志.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-memory{
  background-image: url('../assets/remember.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileTrans{
  background-image: url('../assets/filetrans.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileChange{
  background-image: url('../assets/trans.jpg');
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