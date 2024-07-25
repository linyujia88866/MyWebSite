<template>
  <div>
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup>
import { getDocument } from 'pdfjs-dist/webpack';
import {ref} from "vue";

const props = defineProps({
  title: {
    type: String
  },
  date: {
    type: String
  },
  pdfUrl: {
    type: String,
    required: true
  }
})

let pdfCanvas = ref(null)
async function renderPdf() {
  const context = pdfCanvas.value.getContext('2d');
  const pdf = await getDocument(props.pdfUrl).promise;
  const page = await pdf.getPage(1); // 获取第一页

  const viewport = page.getViewport({scale: 1.5}); // 设置缩放比例
  pdfCanvas.value.height = viewport.height;
  pdfCanvas.value.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext).promise;
}
renderPdf()
</script>