
<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>快速导航
            </template>
              <el-menu-item index="1" @click="router.push('/message')">返回消息列表
                <el-icon><View /></el-icon>
              </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <div>
          <h3>{{title}}</h3>
          <span>{{content}}</span>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>

import { ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {View} from "@element-plus/icons-vue";

const  title = ref("")
const  content = ref("")
const router = useRouter();
const route=useRoute()
title.value = route.query.title
content.value = history.state.content

</script>

<style scoped>

</style>