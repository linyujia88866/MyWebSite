<template >
  <div id="app">
    <navigate-one :origin-tab="curTitle" v-if="!curUrl"></navigate-one>
    <navigate-article :origin-tab="curTitle" v-if="articleUrl"></navigate-article>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
</style>
<script setup >
import NavigateOne from "@/components/Common/NavigateOne.vue";
import {watch, ref} from "vue";
import { useRoute } from 'vue-router';
import NavigateArticle from "@/components/Common/NavigateArticle.vue";
let curUrl = ref(false)
// 文章社区功能相关的页面使用的页头
let articleUrl = ref(false)
let curTitle =  ref("")
const route = useRoute();
watch(() => route.fullPath, (newPath, oldPath) => {
  checkPath(newPath)
  // 你可以在这里根据路由变化执行相应的逻辑
});
checkPath(route.fullPath)

function checkPath(newPath){
  articleUrl.value = newPath === "/articles"
      || newPath === "/manageArticle"
      || newPath === "/articleHome"
      || newPath === "/EveryBodyArticle"
      || newPath === "/"
      || newPath === "/favoriteArticle"
      || newPath === "/createArticle"
      || newPath.startsWith("/viewArticle");
  curUrl.value = newPath === "/login" || newPath === "/registry" || articleUrl.value;
  curTitle.value = route.meta.title
}
</script>