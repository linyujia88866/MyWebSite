<template >
  <div id="app">
    <navigate-one :origin-tab="curTitle" v-if="!curUrl"></navigate-one>
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
<script setup lang="ts">
import NavigateOne from "@/components/Common/NavigateOne.vue";
import {computed,watch, ref} from "vue";
import { useRoute } from 'vue-router';
let curUrl = ref(false)
let curTitle =  ref("")
const route = useRoute();
watch(() => route.fullPath, (newPath, oldPath) => {
  curUrl.value = newPath === "/login" || newPath === "/registry";
  curTitle.value = route.meta.title
  // 你可以在这里根据路由变化执行相应的逻辑
});
</script>