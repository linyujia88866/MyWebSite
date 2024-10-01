
<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-openeds="['1']">
<!--          <el-sub-menu index="1">-->
<!--            <template #title>-->
<!--              <el-icon><icon-menu /></el-icon>快速导航-->
<!--            </template>-->
              <el-menu-item index="1" @click="router.push('/message')">返回消息列表
                <el-icon><View /></el-icon>
              </el-menu-item>
<!--          </el-sub-menu>-->
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
          <span  v-if="messageType === Enums.MessageType.disk_expansion_application">
            网盘申请空间大小：{{size}}（Mb）
          </span>
          <div>
            <span  v-if="messageType === Enums.MessageType.disk_expansion_application">
            申请人：{{sender}}
            </span>
          </div>
          <div style="margin-top: 20px;" v-if="showBtn()">
            <el-button type="primary" @click="agree(2)">同意</el-button>
            <el-button type="danger" @click="agree(3)">拒绝</el-button>
            <div style="margin-top: 8px">
              <span>当前消息状态: {{descStatus(status)}}</span>
            </div>
          </div>
          <div style="margin-top: 8px" v-if="showOrigin()">
            <span >原始申请消息ID:
              <a @click="refreshData" style="text-decoration: underline; cursor: pointer">
              /{{origin}}(点击跳转)
              </a>
            </span>
          </div>
          <div>
            <span>
            消息创建时间：{{formatDate(createdAt)}}
            </span>
          </div>
          <div>
            <span>
            消息答复时间：{{formatDate(updatedAt)}}
            </span>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {View} from "@element-plus/icons-vue";
import {Enums} from "@/enums/enums";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import bus from "@/utils/eventBus";
import {format} from "date-fns";
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
const  sender = ref("")
const  origin = ref("")
const  target = ref("")
let  messageType = ref(0)
const  size = ref(0)
const  status= ref(0)
const router = useRouter();
const route=useRoute()

messageId.value = route.query.messageId

getMsgDetail()

const formatDate = (date) => {
  if(date === undefined || date.length === 0){
    return
  }
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

function showBtn() {
  return messageType.value === Enums.MessageType.disk_expansion_application && user.value === "admin"
}

function showOrigin() {
  return messageType.value === Enums.MessageType.disk_expansion_application_deal && origin.value?.length > 0
}

function refreshData(){
  router.push({name: 'messageDetail',
    query:{messageId: origin.value},
  });
  messageId.value = origin.value
  getMsgDetail()
}

async function agree(status) {
  let array
  // 创建URLSearchParams对象
  const params = new URLSearchParams();
  params.append('status', status);
  await myHttp.put(`/message/${messageId.value}`, params)
      .then(response => {
        if (response.data.code === 200) {
          array=response.data.data
          if(status === 2){
            ElMessage({
              message: "你已同意该申请",
              type: 'success',
            });
            sendAgree();
          } else if(status ===3){
            ElMessage({
              message: "你已拒绝该申请",
              type: 'warning',
            });
            sendReject()
          }

        } else if (response.data.code > 70000){
          ElMessage({
            message: response.data.message,
            type: 'error',
          });
        }
      })
      .catch(error => {
      });
  // bus.emit('myEvent', "");
  return array
}
const user = ref("")
function getCurUser() {
  user.value = localStorage.getItem('curUser')
}

const createdAt = ref("")
const updatedAt = ref("")

async function getMsgDetail() {
  let array
  await myHttp.get(`/message/one/${messageId.value}`)
      .then(response => {
        if (response.data.code === 200) {
          array = response.data.data
          messageType.value = array.type
          status.value = array.status
          sender.value = array.sender
          createdAt.value = array.createdAt
          updatedAt.value = array.updatedAt
          let msgContent = array.content
          let msgBody =  JSON.parse(msgContent);
          title.value = msgBody.title
          content.value= msgBody.content
          link.value = msgBody.link
          size.value = msgBody.size
          origin.value = msgBody.origin
          target.value = `#/messageDetail?messageId=${origin.value}`
        } else {
          ElMessage({
            message: '获取消息详情失败！',
            type: 'error',
          });
        }
      })
      .catch(error => {
      });
  getCurUser()
  return array
}

const sendAgree = () => {
  let msg = {
    title: "网盘空间申请结果",
    content: "管理员已经同意了你的申请",
    link: "/#/fileTrans",
    origin: messageId.value
  }
  let obj = {
    receiver: sender.value,
    content: JSON.stringify(msg),
    type: Enums.MessageType.disk_expansion_application_deal
  }
  bus.emit('sendMessage', JSON.stringify(obj));
}

const sendReject = () => {
  let msg = {
    title: "网盘空间申请结果",
    content: "管理员拒绝了你的申请",
    link: "/#/fileTrans",
    origin: messageId.value
  }
  let obj = {
    receiver: sender.value,
    content: JSON.stringify(msg),
    type: Enums.MessageType.disk_expansion_application_deal
  }
  bus.emit('sendMessage', JSON.stringify(obj));
}
</script>

<style scoped>

</style>