<template>
  <div style="display: flex; align-items: center; align-content: center; padding: 0; margin: 0;  height: 32px;">
    <img src="@/assets/wenjianjia.png" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
    <h3 @click="toggle">{{ props.name }}</h3>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const props = defineProps({
  name: {
    type: String
  },
})

let isOpen = ref(false)


function toggle() {
  isOpen.value= !isOpen.value;
}

</script>