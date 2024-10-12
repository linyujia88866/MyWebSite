<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import bus from "@/utils/eventBus";

const activeNames = ref(['1', '2', '3', '4'])

function handleSelect(val) {
  bus.emit('handleSelect', val)
}

</script>

<template>
<div style="height: 500px">
  <el-collapse v-model="activeNames">
    <el-collapse-item title="环境的搭建" name="1">
      <template #title>
        <DrawTitle title="环境的搭建"></DrawTitle>
      </template>
      <div style="text-align: left">
        <ul>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-1')"><a>拥有自己的第一台服务器</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-2')"><a>部署一个最简单的web服务器</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-3')"><a>开发一个简单的html页面</a></strong></li>
        </ul>
      </div>
    </el-collapse-item>
    <el-collapse-item title="前端开发" name="2" >
      <template #title>
        <DrawTitle title="前端开发"></DrawTitle>
      </template>
      <div style="text-align: left">
        <ul>
          <li><strong class="ql-size-large"  @click="handleSelect('1-5-1')"><a>单页面应用介绍</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-5-2')"><a>创建一个vue工程</a></strong></li>
        </ul>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>
.ql-size-large {
  text-decoration: underline dodgerblue;
  color: #1989fa;
  cursor: pointer;
}
</style>