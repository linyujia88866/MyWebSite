<script setup >
import { ref } from 'vue'
import bus from "@/utils/eventBus";
import QuoteArticle from "@/Comps/Knowledge/Comp/QuoteArticle.vue";
import QuoteHtml from "@/Comps/Knowledge/Comp/QuoteHtml.vue";

const activeNames = ref(['1', '2', '3', '4'])
let articleIds = {
  createHtml: '',
  putHtml: '',
  routeHtml: ''
}

function handleSelect() {
  bus.emit('handleSelect', '1-0')
}
const domain = window.location.hostname;

</script>

<template>
<div style="min-height: 800px; margin: 12px">
  <div style="text-align: left">
    <QuoteHtml article-id="476e2cea-c684-4490-9379-b633ce3c1d76"></QuoteHtml>
  </div>
</div>
</template>

<style scoped>

</style>