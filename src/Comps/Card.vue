<template>
<div>

      <el-card :body-style="{ padding: '0px' }">
        <img
            src="@/bianlitie/1.png"
            class="image"
        />
        <div style="padding: 14px; height: 120px; ">
<!--          上下左右都居中-->
          <div style="display :flex; min-height: 80px; align-items: center;justify-content: center;">
            <span style="text-align: center; font-weight: bold; ">{{props.title}}</span>
          </div>
          <div class="bottom">
            <time class="time">{{ props.date }}</time>
            <el-button text class="button">查看</el-button>
          </div>
        </div>
      </el-card>

</div>
</template>

<script  setup>
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String
  },
  date: {
    type: String
  },
})
// const currentDate = ref(new Date())
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
