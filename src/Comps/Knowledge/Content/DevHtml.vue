<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteArticle from "@/Comps/Knowledge/Comp/QuoteArticle.vue";

const activeNames = ref(['1'])
function handleChange(val) {
  console.log(val)
}
let articleIds = {
  createHtml: '',
  putHtml: '',
}

const domain = window.location.hostname;
if(domain === "127.0.0.1"){
  articleIds.createHtml = "c0e178dd-2f68-448e-b95d-c7f06ebc36d8";
  articleIds.putHtml = "db09a244-00c8-4e4c-ac0a-ee1a8e064658";
  articleIds.routeHtml = "4d6fd776-fc70-4640-8938-165ad5987b44";
}else {
  articleIds.createHtml="e0aa52a0-3bab-4bf2-8821-34b2e539671c"
  articleIds.putHtml = "ac3c8b20-ed3c-40e8-96e8-73486ce46430";
  articleIds.routeHtml = "9cfe0445-24ce-4e48-b41b-30a6c4ab2183";
}
</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="创建一个HTML文件"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.createHtml"></QuoteArticle>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="把HTML文件放入nginx"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.putHtml"></QuoteArticle>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="Nginx的路由管理"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteArticle :article-id="articleIds.routeHtml"></QuoteArticle>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>