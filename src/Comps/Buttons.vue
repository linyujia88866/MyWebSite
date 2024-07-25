<template>
  <el-row>
    <el-button type="primary" size="large">Large</el-button>
    <el-button type="primary">Default</el-button>
    <el-button type="primary" size="small">Small</el-button>
    <el-button type="primary" size="large" :icon="Search">Search</el-button>
    <el-button type="primary" :icon="Search">Search</el-button>
    <el-button type="primary" size="small" :icon="Search">Search</el-button>
  </el-row>
  <el-row class="my-4">
    <el-button type="primary" :icon="Search" size="large" />
    <el-button type="primary" :icon="Search" />
    <el-button type="primary" :icon="Search" size="small" />
  </el-row>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>
