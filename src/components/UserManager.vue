<template>
  <div >
    <navigate ref="childRef" :origin-tab="'管理中心'"></navigate>
<!--    <h1>管理员页面</h1>-->
    <button @click="openCreateUserDialog"
            style="background-color: green;float: left; margin: 10px 0">创建用户</button>
    <table>
      <thead>
      <tr>
        <th>用户名</th>
        <th>用户权限</th>
        <th>状态</th>
        <th>操作</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.userId">
        <td>{{ user.username }}</td>
        <td>{{ user.authority === 0 ?  '超级管理员': '普通用户' }}</td>
        <td>正常</td>
        <td>
          <button @click="deleteUser(user.userId)">删除用户</button>
          <button @click="deleteUser(user.userId)">冻结/解冻</button>
          <button @click="openUpdateUserDialog(user.username)">修改密码</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <DialogCreateUser v-if="createStatus" @close-event="closeDialog"></DialogCreateUser>
  <DialogUpdateUser ref="updateDialog"
                    v-if="updateStatus"
                    v-slot="{ setInitData }"
                    @close-event="closeUpdateDialog"></DialogUpdateUser>
</template>

<script setup>
import {defineComponent, nextTick, onMounted, ref} from 'vue';
import Navigate from "@/components/Navigate.vue";

import {myHttp} from "@/request/myrequest";
import DialogCreateUser from "@/components/DialogCreateUser.vue";
import DialogUpdateUser from "@/components/DialogUpdateUser.vue";
const url = '/user/all';
defineComponent({
  DialogUpdateUser
})

let users = ref([]);
let createStatus = ref(false)
let updateStatus = ref(false)
const updateDialog = ref(null)

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
        alert("你没有这个操作权限！")
      });
}

const deleteUser = (userId) => {
  // 模拟删除用户操作
  users.value = users.value.filter(user => user.userId !== userId);
  // 实际应用中，你可能需要发起一个API请求来从后端删除用户
};

const openCreateUserDialog = () => {
  createStatus.value = true
};


const openUpdateUserDialog = (username) => {
  updateStatus.value = true
  nextTick(() => {
    if(updateDialog.value){
      updateDialog.value.setInitData(username, 111111)
    }
  })

};

function closeDialog() {
  createStatus.value = false
  getUsersInfo()
}

</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

button {
  background-color: #f44336;
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