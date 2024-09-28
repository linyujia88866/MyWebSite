<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-active="'1-3'"
            :default-openeds="['1']">
<!--          <el-sub-menu index="1" :collapse="false">-->
<!--            <template #title>-->
<!--              <el-icon><icon-menu /></el-icon>快速导航-->
<!--            </template>-->
<!--            <el-menu-item index="1-2" @click="router.push('/createArticle')">前往创建文章-->
<!--              <el-icon><Edit /></el-icon>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="1-2" @click="router.push('/EveryBodyArticle')">浏览社区文章-->
<!--              <el-icon><View /></el-icon>-->
<!--            </el-menu-item>-->
            <el-menu-item index="1-3" @click="showPublish = false">未发布文章
              <el-icon>
                <template #default>
                  <img style="height: 100%; width: 100%" src="@/assets/notPub.svg" alt="">
                </template>
              </el-icon>
            </el-menu-item>
            <el-menu-item index="1-4" @click="showPublish = true">已发布文章
              <el-icon>
                <template #default>
                  <img style="height: 100%; width: 100%" src="@/assets/alreadyPub.svg" alt="">
                </template>
              </el-icon>
            </el-menu-item>
<!--          </el-sub-menu>-->
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <PubArticles v-if="showPublish" style="margin-top:12px; margin-left: auto;"></PubArticles>
        <PriArticles v-else style="margin-top:12px; margin-left: auto;"></PriArticles>
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
import {ref} from "vue";
import {useRouter} from "vue-router";
import PubArticles from "@/Comps/Article/PubArticles.vue";
import PriArticles from "@/Comps/Article/PriArticles.vue";

let showPublish = ref(false)
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