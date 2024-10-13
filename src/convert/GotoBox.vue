<script setup lang="ts">
import {useRouter} from 'vue-router';
const router = useRouter();
</script>

<template>
  <div style="width: 100%; text-align: right; position: absolute; margin-top: 80px">
    <el-tooltip
        effect="dark"
        content="更多工具"
        placement="right-start"
        :show-after="500"
    >
      <el-icon size="40" style="margin-right: 60px; cursor: pointer" @click="router.push('/fileConvert')">
        <template #default>
          <img style="height: 100%; width: 100%; vertical-align: -0.125em" src="@/assets/tool.svg" alt="">
        </template>
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped>

</style>