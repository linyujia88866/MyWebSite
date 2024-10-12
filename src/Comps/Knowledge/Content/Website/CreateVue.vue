<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteArticle from "@/Comps/Knowledge/Comp/QuoteArticle.vue";
import QuoteHtml from "@/Comps/Knowledge/Comp/QuoteHtml.vue";

const activeNames = ref(['1', '2', '3', '4'])
const domain = window.location.hostname;

</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="安装Nodejs"></DrawTitle>
      </template>
      <div style="text-align: left; font-size: 20px">
        <a target="_blank" href="https://blog.csdn.net/weixin_42474607/article/details/140769161">【超详细】Nodejs安装教程</a>
        nodejs装完以后，npm也就顺带安装完成了。
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Nodejs入门"></DrawTitle>
      </template>
      <div style="text-align: left; font-size: 20px">
        <p>如果你对Nodejs感兴趣，可以进行更深入的学习。推荐一个学习网站。</p>
        <a target="_blank" href="https://how2j.cn/k/nodejs/nodejs-start/1760.html?p=327364">node.js系列教材 （一）- 基础 - 入门</a>
        <p>不过这里主要目的是为了讲Vue，而不是Nodejs，只不过Vue需要依赖Nodejs，所以读者可以跳过Nodejs的学习。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="创建一个vue工程"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="476e2cea-c684-4490-9379-b633ce3c1d76"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>