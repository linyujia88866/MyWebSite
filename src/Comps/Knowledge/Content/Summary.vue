<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";

const activeNames = ref(['1'])
function handleChange(val) {
  console.log(val)
}
</script>

<template>
<div style="height: 500px">
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="环境的搭建" name="1">
      <template #title>
        <DrawTitle title="环境的搭建"></DrawTitle>
      </template>
      <div style="text-align: left">
        <ul>
          <li><strong class="ql-size-large">拥有自己的第一台服务器</strong></li>
          <li><strong class="ql-size-large">部署一个最简单的web服务器</strong></li>
          <li><strong class="ql-size-large">开发一个简单的html页面</strong></li>
        </ul>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>