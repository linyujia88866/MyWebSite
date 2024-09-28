<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-main>
      <ArticlesILike style="margin-top:12px; margin-left: auto;"></ArticlesILike>
    </el-main>
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
import ArticlesILike from "@/Comps/Article/ArticlesILike.vue";
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