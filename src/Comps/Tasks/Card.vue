<template>
<div>

      <el-card :body-style="{ padding: '0px' }">
        <img
            src="../../bianlitie/1.png"
            class="image"
         alt=""/>
        <div style="padding: 14px; height: 120px; ">
<!--          上下左右都居中-->
          <div style="display :flex; min-height: 80px; align-items: center;justify-content: center;">
            <span style="text-align: center; font-weight: bold; ">{{props.title}}</span>
          </div>
          <div class="bottom">
            <time class="time">{{ props.date }}</time>
            <div style="display: flex;justify-content: right; ">
              <el-button size="small" type="primary" class="button" style="margin-left: auto">查看</el-button>
              <el-button size="small" type="primary"  class="button" @click.stop="deleteTask" >删除</el-button>
            </div>
          </div>
        </div>
      </el-card>

</div>
</template>

<script  setup>
const props = defineProps({
  title: {
    type: String
  },
  date: {
    type: String
  },
})
let emit = defineEmits(['deleteTask'])
function deleteTask(){
  emit('deleteTask')
}
</script>

<style scoped>
.time {
  font-size: 12px;
  color: black;
  margin: 0 20px 0 0;
  width: 120px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin: 0;
}

.image {
  width: 100%;
  display: block;
}
</style>
