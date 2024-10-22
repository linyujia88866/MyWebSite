<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";
import bus from "@/utils/eventBus";
import {knowledgeList} from "@/constant/knowledge";

const activeNames = ref(['1', '2', '3', '4'])

function handleSelect(val) {
  bus.emit('handleSelect', val)
}
let dist = knowledgeList
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
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-1')"><a>{{dist['1-4-1'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-2')"><a>{{dist['1-4-2'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-3')"><a>{{dist['1-4-3'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-4')"><a>{{dist['1-4-4'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-5')"><a>{{dist['1-4-5'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-6')"><a>{{dist['1-4-6'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-4-7')"><a>{{dist['1-4-7'].title}}</a></strong></li>
        </ul>
      </div>
    </el-collapse-item>
    <el-collapse-item title="前端开发" name="2" >
      <template #title>
        <DrawTitle title="前端开发"></DrawTitle>
      </template>
      <div style="text-align: left">
        <ul>
          <li><strong class="ql-size-large"  @click="handleSelect('1-5-1')"><a>{{dist['1-5-1'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-5-2')"><a>{{dist['1-5-2'].title}}</a></strong></li>
          <li><strong class="ql-size-large"  @click="handleSelect('1-5-3')"><a>{{dist['1-5-3'].title}}</a></strong></li>
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