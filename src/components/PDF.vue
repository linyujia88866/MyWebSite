<template>
  <iframe :src="src" width="100%" :web.xmlheight="pdfH" style="width: 100%; height: 90%"></iframe>
</template>
<script setup lang='ts'>
import { ref, nextTick, computed, onMounted } from 'vue'
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

let src = computed(() => {
  // vue3的话 路径上不需要写public
  // 如果是vue2的话 要写public ->  return `/public/lib/pdfjs/web/viewer.html?file=${props.src}`
  // 我这里是本地文件测试（props.src是本地文件，必须将这个文件放在public/lib/pdfjs/web下面才行）
  return `/lib/pdfjs/web/viewer.html?file=${props.src}`
})
let pdfH = ref(100)
nextTick(() => {
  pdfH.value = document.documentElement.clientHeight - 68
})
onMounted(() => {
})
</script>