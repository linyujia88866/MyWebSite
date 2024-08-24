
<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>快速导航
            </template>
              <el-menu-item index="1" @click="router.push('/message')">返回消息列表
                <el-icon><View /></el-icon>
              </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <div>
          <h3>{{title}}</h3>
          <span>{{content}}</span>

        </div>
        <div style="margin-top: 20px;">
          <span  v-if="link.length>0">详情链接：
          <a style="text-decoration: underline" :href="link">{{link}}</a>
          </span>
            <span  v-if="messageType === Enums.MessageType.disk_expansion_application">网盘申请空间大小：
            {{size}}
          </span>
          <div style="margin-top: 20px;" v-if="messageType === Enums.MessageType.disk_expansion_application">
            <el-button type="primary" @click="agree(2)">同意</el-button>
            <el-button type="danger" @click="agree(3)">拒绝</el-button>
            <div style="margin-top: 8px">
              <span>当前消息状态: {{descStatus(status)}}</span>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>

import { ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {View} from "@element-plus/icons-vue";
import {Enums} from "@/enums/enums";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import bus from "@/utils/eventBus";
function descStatus(status){
  if(status===0){
    return "未读"
  } else if(status===1){
    return "已读"
  }else if(status===2){
    return "接受"
  }else if(status===3){
    return "拒绝"
  }
}
const  title = ref("")
const  content = ref("")
const  link = ref("")
const  messageId = ref("")
const  messageType = ref(0)
const  size = ref(0)
const  status= ref(0)
const router = useRouter();
const route=useRoute()
title.value = route.query.title
content.value = history.state.content
link.value = history.state.link
size.value = history.state.size
status.value = history.state.status
messageId.value = history.state.messageId
messageType.value = history.state.messageType
async function agree(status) {
  let array
  // 创建URLSearchParams对象
  const params = new URLSearchParams();
  params.append('status', status);
  await myHttp.put(`/message/${messageId.value}`, params)
      .then(response => {
        if (response.data.code === 200) {
          array=response.data.data
        } else if (response.data.code > 70000){
          ElMessage({
            message: response.data.message,
            type: 'error',
          });
        }
      })
      .catch(error => {
      });
  bus.emit('myEvent', "");
  return array
}
</script>

<style scoped>

</style>