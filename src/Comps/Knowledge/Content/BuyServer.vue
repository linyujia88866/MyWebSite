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
        <DrawTitle title="购买服务器"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="f539ac9e-1b25-4db2-84a0-2995269fee52"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item  name="2">
      <template #title>
        <DrawTitle title="防火墙配置"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="74f3736f-f6ad-486c-9c61-bf94f3aa568a"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="使用密码登录"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="6740b140-0780-4276-bd15-2501f6924af9"></QuoteHtml>
      </div>
    </el-collapse-item>
    <el-collapse-item  name="4">
      <template #title>
        <DrawTitle title="SSH登录服务器"></DrawTitle>
      </template>
      <div style="text-align: left">
        <QuoteHtml article-id="ba5d9938-5975-4ed3-85a6-46d4fa83dee3"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>