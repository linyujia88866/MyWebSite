<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="我接收的"  name="first">
      <Message ref="receive" :tab="'receive'"></Message>
    </el-tab-pane>
    <el-tab-pane label="我发送的" name="second">
      <Message ref="send" :tab="'send'"></Message>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import Message from "@/components/Basic/Message.vue";

const receive =ref()
const send =ref()
let messages = ref([])
const router = useRouter();
const activeName = ref('first')

const handleClick = (tab, event) => {
  if(tab.props.name==="second"){
      send.value.refresh()
  }else {
    receive.value.refresh()
  }
}
</script>

<style scoped>
/* 添加一个自定义类来覆盖默认的标题样式 */
/deep/.left-align-title .el-dialog__title {
  text-align: left;
}
.demo-tabs{
  margin-left: 12px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>