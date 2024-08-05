<template>
  <navigate-one  :origin-tab="'功能'"></navigate-one>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-active="'1-3'"
            :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>快速导航
            </template>
            <el-menu-item-group>
                <template #title>页面跳转</template>
                <el-menu-item index="1-1" @click="router.push('/articleHome')">返回文章主页</el-menu-item>
                <el-menu-item index="1-2" @click="router.push('/createArticle')">前往创建文章</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="文章类型">
              <el-menu-item index="1-3" @click="showPublish = false">未发布文章</el-menu-item>
              <el-menu-item index="1-4" @click="showPublish = true">已公开文章</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <Articles v-if="showPublish" style="margin-top:12px; margin-left: auto;"></Articles>
        <Articles v-else style="margin-top:12px; margin-left: auto;"></Articles>
      </el-main>
    </el-container>
  </el-container>

<div>
    <el-backtop :right="100" :bottom="100" style="width: 150px">
      <div
          style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
      >
        回到顶部
      </div>
    </el-backtop>
  </div>
</template>

<script setup>
import VerticalTab from '@/Comps/Article/VerticalTab.vue';
import {ref} from "vue";
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import NoteEditor from "@/Comps/Article/NoteEditor.vue";
import Articles from "@/Comps/Article/Articles.vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";
import {useRouter} from "vue-router";

let showPublish = ref(false)


const tabs = ref(['未发布文章', '已公开文章', '创建新的文章'])
const activeTab =ref('未发布文章')
const router = useRouter();

function whenSave(){
  activeTab.value='未发布文章'
}

</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 0;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}


.layout-container-demo .el-header {
  position: relative;
}
.layout-container-demo .el-aside {
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