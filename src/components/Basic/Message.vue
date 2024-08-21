<template>
  <div v-if="messages.length ===0">
    <h1 style="padding-top: 60px">暂无消息</h1>
  </div>
  <div v-else style="margin: 12px">
    <el-table :data="messages" style="width: 100%">
      <el-table-column prop="messageId" label="消息ID" width="120" />
      <el-table-column prop="sender" label="发送者" width="120" />
      <el-table-column prop="receiver" label="接收者" width="120" />
      <el-table-column prop="type" label="消息类型"  width="120" />
      <el-table-column prop="status" label="消息状态"  width="80" >
        <template #default="scope">
          {{scope.row.status === 0?"未读":"已读"}}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="消息标题" width="380"  >
        <template #default="scope">
          {{getMsgTitle(scope.row.content)}}
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template #default="scope">
          <el-button type="success" @click="maskRead(scope.row.messageId)">标为已读</el-button>
          <el-button type="primary" @click="gotoMsgDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>

import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import {onMounted, onUnmounted, ref} from "vue";
import bus from "@/utils/eventBus";
import {useRouter} from "vue-router";

let messages = ref([])
const router = useRouter();

function maskRead(msgId){
}

function getMsgTitle(jsonString){
  try {
    let jsonObject = JSON.parse(jsonString);
    return jsonObject.title
  }catch (e){
    return jsonString
  }
}
function getMsgBody(jsonString){
  try {
    let jsonObject = JSON.parse(jsonString);
    return jsonObject.content
  }catch (e){
    return jsonString
  }
}

function gotoMsgDetail(row){
  router.push({name: 'messageDetail',
    query:{title: getMsgTitle(row.content)},
    state: {
      content: getMsgBody(row.content)
    }
  });
}

async function getAllNotRead() {
  let array
  await myHttp.get('/message')
      .then(response => {
        if (response.data.code === 200) {
          messages.value = response.data.data
        } else {
          ElMessage({
            message: '获取消息列表失败！',
            type: 'error',
          });
        }
      })
      .catch(error => {
      });
  return array
}

getAllNotRead()

onMounted(() => {
  bus.$on('myEvent', getAllNotReadLater);
  onUnmounted(()=>{
    bus.$off('myEvent', getAllNotReadLater)
  }); // 确保在组件卸载时移除监听器
});

function getAllNotReadLater(){
  setTimeout(()=>{
    getAllNotRead()
  }, 1000)
}
</script>

<style scoped>
/* 添加一个自定义类来覆盖默认的标题样式 */
/deep/.left-align-title .el-dialog__title {
  text-align: left;
}
</style>