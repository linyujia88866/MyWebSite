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
        <DrawTitle title="替换容器中的文件"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="743fbd25-372e-4c07-8729-16d988c67610"></QuoteHtml>
      </div>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="使用dockerfile构建自定义镜像"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <QuoteHtml article-id="a44292ac-6fae-49a5-83c6-1cfc1ee7fd73"></QuoteHtml>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>