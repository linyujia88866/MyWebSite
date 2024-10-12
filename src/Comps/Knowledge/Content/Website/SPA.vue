<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteHtml from "@/Comps/Knowledge/Comp/QuoteHtml.vue";

const activeNames = ref(['1', '2', '3', '4'])

const domain = window.location.hostname;

</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="什么是单页面应用SPA"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="3001b564-e2b6-40eb-ace0-d17384a3948e"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Hash模式"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="4e7c019a-a4e9-45c2-80bd-9f15a7d4bf20"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="History模式"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="9e1d8958-97ea-4301-a0c9-af776da99a96"></QuoteHtml>
      </div>
    </el-collapse-item>

<!--    <el-collapse-item name="4">-->
<!--      <template #title>-->
<!--        <DrawTitle title="导航到1-0"></DrawTitle>-->
<!--      </template>-->
<!--      <div style="text-align: left">-->
<!--        <el-button @click="handleSelect">导航到1-0</el-button>-->
<!--      </div>-->
<!--    </el-collapse-item>-->
  </el-collapse>
</div>
</template>

<style scoped>

</style>