<template>
  <div >
    <navigate-one ref="childRef" :origin-tab="'管理中心'"></navigate-one>
<!--    <h1>管理员页面</h1>-->
    <div style="text-align: left;" >
      <el-button type="success" @click="openCreateUserDialog" style="margin: 20px 20px 0;">创建用户</el-button>
<!--      <button @click="openCreateUserDialog"-->
<!--              style="background-color: green;float: left; margin: 60px 0 10px;">创建用户</button>-->
    </div>
    <div>
      <el-table :data="users" style="width: 90%; margin: 0 20px 20px 20px">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="authority" label="用户权限" width="180" >
          <template #default="scope">
            {{ scope.row.authority === 0 ?  '超级管理员': '普通用户' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180" >
          <template #default="scope">
            <p :style="rowStyle(scope.row.status)">{{ scope.row.status === 0 ?  '正常': '冻结' }}</p>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
          <template #default="scope">
            <el-button type="danger" @click="deleteUser(scope.row.userId)">删除用户</el-button>
            <el-button type="danger" @click="freezeUser(scope.row)">冻结/解冻</el-button>
            <el-button type="danger" @click="openUpdateUserDialog(scope.row.username)">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    <table>-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>用户名</th>-->
<!--        <th>用户权限</th>-->
<!--        <th>状态</th>-->
<!--        <th>操作</th>-->

<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="user in users" :key="user.userId">-->
<!--        <td>{{ user.username }}</td>-->
<!--        <td>{{ user.authority === 0 ?  '超级管理员': '普通用户' }}</td>-->
<!--        <td>正常</td>-->
<!--        <td>-->
<!--          <button @click="deleteUser(user.userId)">删除用户</button>-->
<!--          <button @click="deleteUser(user.userId)">冻结/解冻</button>-->
<!--          <button @click="openUpdateUserDialog(user.username)">修改密码</button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
  </div>
  <DialogCreateUser v-if="createStatus" @close-event="closeDialog"></DialogCreateUser>
  <DialogUpdateUser ref="updateDialog"
                    v-if="updateStatus"
                    v-slot="{ setInitData }"
                    @close-event="closeUpdateDialog"></DialogUpdateUser>
</template>

<script setup>
import {defineComponent, nextTick, onMounted, ref} from 'vue';

import {myHttp} from "@/request/myrequest";
import DialogCreateUser from "@/components/Manage/DialogCreateUser.vue";
import DialogUpdateUser from "@/components/Manage/DialogUpdateUser.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import NavigateOne from "@/components/Common/NavigateOne.vue";
const url = '/user/all';
defineComponent({
  DialogUpdateUser
})

let users = ref([]);
let createStatus = ref(false)
let updateStatus = ref(false)
const updateDialog = ref(null)

function rowStyle(status) {
  return {
    color: status === 1 ? 'red' : 'green'
  };
}

function closeUpdateDialog() {
  updateStatus.value = false
}

onMounted(async () => {
    await getUsersInfo()
})

async function getUsersInfo() {
  await myHttp.get(url)
      .then(response => {
        if (response.data.code === 200) {
          users.value = []
          let array = response.data.data;
          for (let i = 0; i < array.length; i++) {
            users.value.push(array[i])
          }
        }
      })
      .catch(error => {
        ElMessage({
          message: "你没有这个操作权限！",
          type: 'error',
        });
      });
}

const deleteUser = async (userId) => {
  ElMessageBox.confirm(
      '删除该用户后，该用户相关的数据和文件都将彻底删除且不可恢复， 确定删除?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(async () => {
        await doDelete(userId)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
};
function crossOver(x) {
  return 1 - Math.abs(x)
}
async function freezeUser(user) {
  let url
  let msg
  let msgType
  if(user.status === 0){
    url = `/user/freeze/${user.userId}`
    msg = "已冻结"
    msgType = 'warning'
  }else {
    url = `/user/unfreeze/${user.userId}`
    msg = "已解冻"
    msgType = 'success'
  }
  await myHttp.put(url)
      .then(response => {
        if (response.data.code === 200) {
          // 模拟删除用户操作
          user.status = crossOver(user.status)
          ElMessage({
            type: msgType,
            message: msg,
          })
        }
      })
      .catch(error => {
        ElMessage({
          message: "你没有这个操作权限！",
          type: 'error',
        });
      });
}

async function doDelete(userId) {
  // 实际应用中，你可能需要发起一个API请求来从后端删除用户
  await myHttp.delete(`/user/${userId}`)
      .then(response => {
        if (response.data.code === 200) {
          // 模拟删除用户操作
          users.value = users.value.filter(user => user.userId !== userId);
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        }
      })
      .catch(error => {
        ElMessage({
          message: "你没有这个操作权限！",
          type: 'error',
        });
      });
}

const openCreateUserDialog = () => {
  createStatus.value = true
};


const openUpdateUserDialog = (username) => {
  updateStatus.value = true
  nextTick(() => {
    if(updateDialog.value){
      updateDialog.value.setInitData(username, "*********")
    }
  })

};

function closeDialog() {
  createStatus.value = false
  getUsersInfo()
}

</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

button {
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>