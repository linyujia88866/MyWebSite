<script setup lang="ts" name="home">
import { computed, nextTick, ref, onMounted } from 'vue';
const pptx = ref('/file/test.pptx'); //设置ppt网络地址，可以是相对地址

const renderedHandler = () => {
  console.log('渲染完成');
};
const errorHandler = () => {
  console.log('渲染失败');
};
</script>

<template>
  <div>
    <h1>PPT文档预览</h1>
    <iframe :src="`/PPTXjs-1.21.1/index.html?file=` + pptx" width="100%" height="900" frameborder="0">

    </iframe>
  </div>
</template>

<style scoped></style>

