<template>
  <div>
    <navigate  :origin-tab="'功能'"></navigate>
    <div class="card-container">
      <task-card  @click.prevent="gotoShowCase()" />
      <task-card
          v-for="task in tasks"
          :title="task.title"
          :created-at="task.createdAt"
          @click.prevent="gotoShowCase(task.taskId)"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import TaskCard from "@/components/TaskCard.vue";
import Navigate from "@/components/Navigate.vue";

import {useRouter} from 'vue-router';
const router = useRouter();
function gotoShowCase(taskId){
  router.push({name: 'memory',query:{taskId: taskId}});
}
const tasks = reactive([])
let url = "/task/tasks"
import {myHttp} from "@/request/myrequest";

myHttp.get(url)
    .then(response => {
      if (response.data.code === 200) {
        let array = response.data.data;
        for (let i = 0; i < array.length; i++) {
          tasks.push(array[i])
        }
      }else {
        alert("获取任务列表失败！")
      }
    })
    .catch(error => console.error('Error:', error));


</script>

<style>
/* 在这里添加全局样式 */
.card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  padding: 10px;
  flex-grow: 1;
}
</style>