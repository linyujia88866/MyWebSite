<template>
  <div>
    <navigate  :origin-tab="'功能'"></navigate>
    <div class="card-container">
      <task-card
          id="showcase"
          :title="'示例待办清单标题'"
          :created-at="'2002-01-21'"
          :description="'待办任务描述'"
          @click="gotoShowCase"
      />
      <task-card
          v-for="task in tasks"
          :key="task.id"
          :title="task.title"
          :created-at="task.createdAt"
          :description="task.description"
      />
      <task-card
          :title="'＋'"
          :created-at="'创建新的任务清单'"
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
function gotoShowCase(){
  router.push({name: 'memory'});
}
const tasks = reactive([
  {
    id: 1,
    title: '待办清单1',
    createdAt: '2024-01-21',
    description: '待办任务描述'
  },
  // ... 其他任务对象
]);
</script>

<style>
/* 在这里添加全局样式 */
.card-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  padding: 10px;
  flex-grow: 1;
}
</style>