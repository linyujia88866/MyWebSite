<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteArticle from "@/Comps/Knowledge/Comp/QuoteArticle.vue";
import bus from "@/utils/eventBus";

const activeNames = ref(['1', '2', '3', '4'])
function handleChange(val) {
  // console.log(val)
}
let articleIds = {
  createHtml: '',
  putHtml: '',
  routeHtml: ''
}

function handleSelect() {
  bus.emit('handleSelect', '1-0')
}

const domain = window.location.hostname;
if(domain === "127.0.0.1"){
  articleIds.createHtml = "59b9d756-edc4-424f-8b10-c403a7cc3308";
  articleIds.putHtml = "8d29f33c-ad0c-4f01-ab01-990a5507f0ab";
  articleIds.routeHtml = "815a5fb4-a9cf-40c3-a8ac-cbcc32f3c094";
}else {
  articleIds.createHtml="3001b564-e2b6-40eb-ace0-d17384a3948e"
  articleIds.putHtml = "4e7c019a-a4e9-45c2-80bd-9f15a7d4bf20";
  articleIds.routeHtml = "9e1d8958-97ea-4301-a0c9-af776da99a96";
}
</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="什么是单页面应用SPA"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.createHtml"></QuoteArticle>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Hash模式"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.putHtml"></QuoteArticle>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="History模式"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.routeHtml"></QuoteArticle>
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