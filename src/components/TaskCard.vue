<template>
  <div class="notebook">
    <div class="task-card-header" v-if="title">
      <h3>标题：</h3>
      <span>{{ title }}</span>
      <h3>更新时间：</h3>
      <span>{{ createdAt }}</span>
    </div>
    <div class="task-card-header" v-else>
      <h3 style="text-align: center; margin-top: 40px; margin-bottom: 0; padding-bottom: 0;color: green; font-size: 50px;"> + </h3>
      <h3 style="text-align: center; margin-top: 0;  color: green;">创建新的任务清单</h3>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    createdAt: String,
  }
});
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  width: 200px;
}

.task-card-header {
  //display: flex;
  padding-top: 10px;
  justify-content: left;
}

h3{
  text-align: left;
  padding-left: 10px;
}
span{
  text-align: left;
}

.task-card-content {
  margin-top: 10px;
}

.notebook {
  //border: 1px solid #ccc;
  //padding: 20px;
  margin: 10px;
  width: 200px; /* 本子的宽度 */
  height: 200px; /* 本子的高度 */
  //background-color: #fff; /* 本子的背景颜色 */
  //border: 1px solid #000; /* 本子的边框 */
  border-radius: 5px; /* 本子的圆角 */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* 本子的阴影效果 */
  //padding: 20px; /* 本子内部的填充 */
  position: relative; /* 相对定位，供后续添加装饰等使用 */
}




.notebook::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('../assets/bianlitie.png') ;
  opacity: 0.5;
  background-size: cover;
  position: absolute;
  //top: 10px;
  //left: 20px;
}
</style>