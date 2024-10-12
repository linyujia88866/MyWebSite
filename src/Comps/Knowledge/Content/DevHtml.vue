<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteHtml from "@/Comps/Knowledge/Comp/QuoteHtml.vue";

const activeNames = ref(['1', '2', '3', '4'])

let articleIds = {
  createHtml: '',
  putHtml: '',
}

const domain = window.location.hostname;

articleIds.createHtml="e0aa52a0-3bab-4bf2-8821-34b2e539671c"
articleIds.putHtml = "ac3c8b20-ed3c-40e8-96e8-73486ce46430";
articleIds.routeHtml = "9cfe0445-24ce-4e48-b41b-30a6c4ab2183";
</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="创建一个HTML文件"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml :article-id="articleIds.createHtml"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="把HTML文件放入nginx"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml :article-id="articleIds.putHtml"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="Nginx的路由管理"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml :article-id="articleIds.routeHtml"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>