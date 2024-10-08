<script setup >
import {InfoFilled} from "@element-plus/icons-vue";

const props = defineProps({
  title: {
    type: String
  },
})

</script>

<template>
  <div style="width:100%; display: flex">
    <el-icon class="header-icon">
      <info-filled />
    </el-icon>
    <span style="font-size: 24px">{{ props.title }}</span>
    <span style="text-align: right; flex-grow: 1">
            <el-button style="margin-right: 20px;" size="small" type="primary">折叠/展开</el-button>
          </span>
  </div>
</template>

<style scoped>

</style>