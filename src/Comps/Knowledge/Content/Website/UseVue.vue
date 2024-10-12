<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";

const activeNames = ref(['1', '2', '3', '4'])
const domain = window.location.hostname;
if(domain === "127.0.0.1"){}else {}

</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="Vue入门"></DrawTitle>
      </template>
      <div style="text-align: left; font-size: 20px">
        <p>Vue 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，可以高效地开发用户界面。</p>
        <p>如果读者对Vue感兴趣，想系统性地学习Vue，可以查看官网学习。</p>
        <a target="_blank" href="https://cn.vuejs.org/">Vue官网</a>
        <p>也可以基于一些民间网站学习。</p>
        <a target="_blank" href="https://how2j.cn/k/vuejs/vuejs-start/1744.html?p=327364">Vue.js系列教材 （一）- 简介</a>
        <p>本站不会重复造轮子，再输出同质教程。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Element-Plus框架"></DrawTitle>
      </template>
      <div style="text-align: left; font-size: 20px">
        <p>1. Element-plus简介</p>
        <p>是ElementUI的升级版，是一套基于vue2与vue3的桌面端组件库，它提供了丰富的组件帮助开发人员快速构建功能强大、风格统一的页面。</p>
        <p>官方中文站点：<a target="_blank" href="https://element-plus.org/zh-CN/">一个 Vue 3 UI 框架 | Element Plus</a></p>
        <p>如何使用Element-plus库？</p>
        <a target="_blank" href="https://element-plus.org/zh-CN/guide/installation.html">安装element-plus</a>
        <p>读者自行学习框架，下一章直接实战开发网站。</p>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>