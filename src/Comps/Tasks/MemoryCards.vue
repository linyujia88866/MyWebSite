<template>
  <div style="width:100%; justify-content: center; display: flex; margin: 20px;">
    <!--      <div style="margin: 12px 0 0 8px;padding: 0; display: flex ">-->
    <!--        <el-button type="primary"  @click.prevent="gotoShowCase()"  size="large">创建清单</el-button>-->
    <!--        <el-button type="primary" v-if="showMode==='2'"  @click.prevent="showMode='1'"  size="large">卡片式显示</el-button>-->
    <!--        <el-button type="primary" v-if="showMode==='1'"  @click.prevent="showMode='2'"  size="large">列表式显示</el-button>-->
    <!--      </div>-->
    <el-empty v-if="tasks.length === 0" description="暂无任务" />
    <div v-else-if="showMode==='1'" class="card-container">
      <Card
          v-for="task in tasks"
          :title="task.title"
          :date="task.createdAt.replace(/\.0$/, '')"
          @click.prevent="gotoShowCase(task.taskId)"
          @delete-task="deleteTask(task.taskId)"
      />
    </div>
    <!--      <div class="card-container2" v-else-if="showMode==='2'">-->
    <!--        <ul style="padding: 0;">-->
    <!--          <li style="display: flex; margin: 0; padding: 0; ">-->
    <!--            <h3 style="width: 500px; line-height: 28px;text-align: left;">标题</h3>-->
    <!--            <h3 style="width: 200px; line-height: 28px;text-align: left;">创建时间</h3>-->
    <!--            <h3 style="width: 200px; line-height: 28px; text-align: left;">操作按钮</h3>-->
    <!--          </li>-->
    <!--          <li v-for="task in tasks" style="display: flex;">-->
    <!--            <h4 style="width: 500px; line-height: 28px;text-align: left;margin: 0; padding: 0; ">{{task.title}}</h4>-->
    <!--            <p style="width: 200px; line-height: 28px;text-align: left;-->
    <!--          margin: 0; padding: 0;">{{task.createdAt.replace(/\.0$/, '')}}</p>-->

    <!--            <el-button type="primary" size="small"  @click.prevent="gotoShowCase(task.taskId)"  >查看</el-button>-->
    <!--            <el-button size="small"  @click.prevent="deleteTask(task.taskId)" type="danger" >删除</el-button>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->

    <el-table v-else-if="showMode==='2'"
              :data="tasks"
              :highlight-current-row="true"
              max-height="76vh"
              ref = "table"
              @cell-mouse-enter="handleMouseEnter"
              @cell-mouse-leave="handleMouseLeave"
              @selection-change="handleSelectionChange"
              style="width: 50%; margin-top: 80px" :default-sort="{ prop: 'type', order: 'descending' }">
<!--      <el-table-column type="selection" width="30" />-->
      <el-table-column
          property="title"
          label="清单标题"
          sortable  >
      </el-table-column>
      <el-table-column
          property="createdAt"
          label="创建时间"
          sortable
          width="250px"
      >
        <template #default="scope">{{scope.row.createdAt.replace(/\.0$/, '')}}</template>
      </el-table-column>
      <el-table-column
          width="150px"
          label="操作按钮"
      >
        <template #default="scope">
          <el-button type="primary" size="small"  @click.prevent="gotoShowCase(scope.row.taskId)"  >查看</el-button>
          <el-button size="small"  @click.prevent="deleteTask(scope.row.taskId)" type="danger" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {myHttp} from "@/request/myrequest";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import Card from "@/Comps/Tasks/Card.vue";
import {useRouter} from 'vue-router';
import bus from "@/utils/eventBus";

const router = useRouter();
const tasks = ref([])
let showMode = ref('2')
getTaskList()
onMounted(() => {
  bus.$on('changeShowMode', changeShowMode);
  onUnmounted(()=>{
    bus.$off('changeShowMode', changeShowMode)
  }); // 确保在组件卸载时移除监听器
});

// 测试方法
function changeShowMode(message) {
  showMode.value = message
}
function gotoShowCase(taskId){
  router.push({name: 'memory',query:{taskId: taskId}});
}
async function getTaskList() {
  tasks.value = []
  let url = "/task/tasks"
  await myHttp.get(url)
    .then(response => {
      if (response.data.code === 200) {
        let array = response.data.data;
        for (let i = 0; i < array.length; i++) {
          tasks.value.push(array[i])
        }
      } else {
        ElMessage({
          message: '获取任务列表失败！',
          type: 'error',
        });
      }
    })
    .catch(error => {});
}
async function deleteTask(taskId) {
  ElMessageBox.confirm(
      '删除清单后不可恢复，确定删除吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await myHttp.post("/task/delete/" + taskId)
            .then(response => {
              if (response.data.code === 200) {
                ElMessage({
                  message: "清单删除成功" + taskId,
                  type: 'success',
                });
                getTaskList()
              }
            })
            .catch(error => {
            });
        // ElMessage({
        //   type: 'success',
        //   message: '删除清单成功',
        // })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除清单',
        })
      })
}

</script>

<style scoped>
/* 在这里添加全局样式 */
.card-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  margin: 80px 110px 80px 80px;
  flex-grow: 1;
}
</style>