<template>
  <div >
    <navigate ref="childRef" :origin-tab="'管理中心'"></navigate>
    <h1>管理员页面</h1>
    <table>
      <thead>
      <tr>
        <th>用户名</th>
        <th>用户权限</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.permission }}</td>
        <td>
          <button @click="deleteUser(user.id)">删除用户</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigate from "@/components/Navigate.vue";

const users = ref([
  { id: 1, username: '张三', permission: '普通用户' },
  { id: 2, username: '李四', permission: '管理员' },
  // ... 其他用户
]);

const deleteUser = (userId) => {
  // 模拟删除用户操作
  users.value = users.value.filter(user => user.id !== userId);
  // 实际应用中，你可能需要发起一个API请求来从后端删除用户
};
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