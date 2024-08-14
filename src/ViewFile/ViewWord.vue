
<template>
  <vue-office-docx
      :src="docx"
      style="height: 100vh;"
      @rendered="renderedHandler"
      @error="errorHandler"
  />
</template>

<script setup>
import {  ref } from "vue";
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import {useRoute, useRouter} from 'vue-router';
const route=useRoute()
const router = useRouter();

const docx=ref("") //设置文档网络地址，可以是相对地址


docx.value = route.query.docxUrl

// docx作为参数通过父组件传参
const renderedHandler=()=>{

}
const errorHandler=()=>{

}

</script>