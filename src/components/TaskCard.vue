<template>
  <div class="notebook">
    <div class="task-card-header" v-if="title">
      <h3 style="margin-top: 70px;"></h3>
      <span >{{ title }}</span>
      <h3></h3>
      <span>{{ createdAt }}</span>
    </div>
    <div class="task-card-header" v-else>
      <h3 style="text-align: center; margin-top: 60px; margin-bottom: 0; padding-bottom: 0;color: green; font-size: 50px;"> + </h3>
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

.task-card-header {
  padding-top: 10px;
  justify-content: left;
}

h3{
  text-align:center;
}
span{
  text-align: left;
}

.notebook {
  margin: 10px;
  width: 250px; /* 本子的宽度 */
  height: 250px; /* 本子的高度 */
  border-radius: 5px; /* 本子的圆角 */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* 本子的阴影效果 */
  position: relative; /* 相对定位，供后续添加装饰等使用 */
}




.notebook::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('../assets/bianli.png') ;
  opacity: 0.2;
  background-size: cover;
  position: absolute;
}
</style>