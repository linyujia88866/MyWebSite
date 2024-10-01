<template>
  <el-container class="layout-container-demo" >
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            @select="handleSelect"
            :default-active="'1-0'"
            :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>服务器环境搭建
            </template>
            <el-menu-item index="1-0">知识库概览</el-menu-item>
            <el-menu-item index="1-1">K8S</el-menu-item>
            <el-menu-item index="1-2">Docker</el-menu-item>
            <el-menu-item index="1-3">中间件部署</el-menu-item>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="
      /*text-align: right;*/
       font-size: 24px">
        <div class="toolbar">
<!--          <el-dropdown>-->
<!--            <el-icon style="margin-right: 8px; margin-top: 1px">-->
<!--              <setting />-->
<!--            </el-icon>-->
<!--            <template #dropdown>-->
<!--              <el-dropdown-menu>-->
<!--                <el-dropdown-item>View</el-dropdown-item>-->
<!--                <el-dropdown-item>Add</el-dropdown-item>-->
<!--                <el-dropdown-item>Delete</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </template>-->
<!--          </el-dropdown>-->
          <span>{{title}}</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <template #default>
            <Summary v-if="activeIndex==='1-0'"/>
          </template>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import Summary from "@/Comps/Knowledge/Content/Summary.vue";
const activeIndex = ref("1-0")
let dist = {
  '1-0': {
    title: '知识库概览'
  },
  '1-1': {
    title: 'K8S'
  },
  '1-2': {
    title: 'Docker'
  }
}
function handleSelect(e) {
  title.value = dist[e].title
  activeIndex.value = e
}
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const title= ref("")
handleSelect('1-0')
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  //background-color: var(--el-color-primary-light-7);
  //color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  //color: var(--el-text-color-primary);
  //background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>