<script setup>
import { ref } from 'vue';
let pptx = ref(''); //设置ppt网络地址，可以是相对地址
import {useRoute, useRouter} from 'vue-router';
const route=useRoute()
const router = useRouter();

const excel=ref("") //设置文档网络地址，可以是相对地址
pptx.value = route.query.pptUrl
</script>

<template>
  <div>
    <h1>PPT文档预览</h1>
    <iframe id="pptViewer" :src="`/PPTXjs-1.21.1/index_bak.html?file=` + pptx" width="100%" height="900" frameborder="0">
    </iframe>
  </div>
</template>

<style scoped></style>

