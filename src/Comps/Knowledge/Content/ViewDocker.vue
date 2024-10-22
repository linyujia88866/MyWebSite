<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import QuoteHtml from "@/Comps/Knowledge/Comp/QuoteHtml.vue";
const activeNames = ref(['1', '2', '3', '4'])
</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="Portainer介绍"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="c7149324-54d7-4d66-844e-c89548fd8208"></QuoteHtml>
      </div>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="如何安装Portainer"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="a724799b-0c3f-4984-a90b-3a7eb71aef70"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="如何使用Portainer"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="dd80f43d-1e78-41a5-b63d-5b336b76736e"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>