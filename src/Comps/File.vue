<template>
  <div style="display: flex; align-items: center; align-content: center; padding: 0; margin: 0;  height: 32px;">
    <img src="@/assets/wenjian.jpg" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
    <h3 >{{ props.name }}</h3>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String
  },
})
</script>