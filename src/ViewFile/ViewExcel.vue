
<template>
  <vue-office-excel
      :src="excel"
      style="height: 100vh;"
      @rendered="renderedHandler"
      @error="errorHandler"
  />
</template>

<script setup>
import {  ref } from "vue";
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
import {useRoute, useRouter} from 'vue-router';
const route=useRoute()
const router = useRouter();

const excel=ref("") //设置文档网络地址，可以是相对地址


excel.value = route.query.excelUrl

// docx作为参数通过父组件传参
const renderedHandler=()=>{
  console.log("渲染完成")
}
const errorHandler=()=>{
  console.log("渲染失败")
}

</script>