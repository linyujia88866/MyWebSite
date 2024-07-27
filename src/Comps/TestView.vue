<script setup lang="ts">
import { ref } from 'vue';
import PDF from '@/components/PDF.vue'
let dySrc = ref('')
const dialogVisible = ref(false)
//? 打开新页面预览
const showPDF = async () => {
  dySrc.value = '/lib/pdfjs/web/测试.pdf'
  //替换为实际的文档URL
  const pdfUrl = `lib/pdfjs/web/viewer.html?file=${dySrc.value}`;
  //pdfUrl是当前页面的pdf文件的URL,第二个参数'_blank'表示在新窗口中打开。
  window.open(pdfUrl, '_blank');
}
//?在弹框中显示
const showDialogPDF = () => {
  dialogVisible.value = true
  dySrc.value = '/lib/pdfjs/web/测试.pdf'
}
</script>
<template>
  <div>
    文件名(新页面打开预览)：
    <span @click="showPDF" style="color:rgb(0,174,236);cursor: pointer;">xxx.pdf</span>
  </div>
  <div>
    文件名(弹窗打开预览)：
    <span @click="showDialogPDF" style="color:rgb(0,174,236);cursor: pointer;">xxx.pdf</span>
  </div>
  <el-dialog v-model="dialogVisible" title="预览pdf">
    <p-d-f :src="dySrc"></p-d-f>
  </el-dialog>
</template>
<style scoped>
.el-dialog {
  width: 1000px;
  height: 800px;
}

.el-dialog__body {
  height: 100%;
}
</style>