<template>
  <div>
    <navigate-one  :origin-tab="'功能'"></navigate-one>
    <div >
      <div style="margin: 12px 0 0 8px;padding: 0; display: flex ">
        <el-button type="primary"  @click.prevent="gotoShowCase()"  size="large">创建任务清单</el-button>
        <el-button type="primary" v-if="showMode==='2'"  @click.prevent="showMode='1'"  size="large">卡片式显示</el-button>
        <el-button type="primary" v-if="showMode==='1'"  @click.prevent="showMode='2'"  size="large">列表式显示</el-button>
      </div>
      <div class="card-container" v-if="showMode==='1'">

        <Card v-for="task in tasks"
              :title="task.title"
              :date="task.createdAt.replace(/\.0$/, '')"
              @click.prevent="gotoShowCase(task.taskId)"
        />
      </div>
      <div class="card-container2" v-if="showMode==='2'">
        <ul style="padding: 0;">
          <li style="display: flex; margin: 0; padding: 0; ">
            <h3 style="width: 700px; line-height: 28px;text-align: left;">任务标题</h3>
            <h3 style="width: 200px; line-height: 28px;text-align: left;">创建时间</h3>
            <h3 style="width: 200px; line-height: 28px; text-align: left;">操作按钮</h3>
          </li>
          <li v-for="task in tasks" style="display: flex;">
            <h4 style="width: 700px; line-height: 28px;text-align: left;margin: 0; padding: 0; ">{{task.title}}</h4>
            <p style="width: 200px; line-height: 28px;text-align: left;
          margin: 0; padding: 0;">{{task.createdAt.replace(/\.0$/, '')}}</p>

            <el-button type="primary" size="small"  @click.prevent="gotoShowCase(task.taskId)"  >编辑</el-button>
            <el-button type="primary" size="small"  @click.prevent="gotoShowCase(task.taskId)"  >删除</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import Navigate from "@/components/Common/Navigate.vue";

import {useRouter} from 'vue-router';
const router = useRouter();
function gotoShowCase(taskId){
  router.push({name: 'memory',query:{taskId: taskId}});
}
const tasks = reactive([])
let url = "/task/tasks"
let showMode = ref('1')
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import Card from "@/Comps/Tasks/Card.vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";

myHttp.get(url)
    .then(response => {
      if (response.data.code === 200) {
        let array = response.data.data;
        for (let i = 0; i < array.length; i++) {
          tasks.push(array[i])
        }
      }else {
        ElMessage({
          message: '获取任务列表失败！',
          type: 'error',
        });
      }
    })
    .catch(error => console.error('Error:', error));


</script>

<style scoped>
/* 在这里添加全局样式 */
.card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  margin: 12px 8px 8px;
  flex-grow: 1;
}

.card-container2 {
  margin: 0 5px 5px 20px;
  padding: 0;
}
</style>