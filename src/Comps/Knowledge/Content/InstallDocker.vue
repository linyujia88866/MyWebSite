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
        <DrawTitle title="为什么要安装docker"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="bd9cab0a-6225-4c11-8b06-9fccb95e7645"></QuoteHtml>
      </div>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="如何安装docker"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="279d35e3-0717-42e3-abb4-f3d07c3a432d"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="如何使用docker"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="18193a08-9b9f-474d-bc13-cf969ac3487b"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>