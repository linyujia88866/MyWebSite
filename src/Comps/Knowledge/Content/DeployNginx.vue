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
        <DrawTitle title="什么是web服务器"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="b6909a89-ab1c-4baa-a537-e9e13be54bf5"></QuoteHtml>
      </div>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Nginx的下载和安装"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="b4b08544-a962-4d38-8a16-2034715b9878"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="如何访问Nginx"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="5eeba80b-aed3-4946-aa2e-06d255208cee"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>