<template>
  <navigate-not-login></navigate-not-login>
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
            <el-menu-item index="1-2" @click="router.push('/createArticle')">前往创建文章
              <el-icon><Edit /></el-icon>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <AllPubArticlesNotLogin style="margin-top:12px; margin-left: auto;"></AllPubArticlesNotLogin>
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
import {Menu as IconMenu, Edit, Setting} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import NavigateNotLogin from "@/components/NotLogin/NavigateNotLogin.vue";
import AllPubArticlesNotLogin from "@/components/NotLogin/AllPubArticlesNotLogin.vue";

const router = useRouter();
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