<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            :default-active="'1-4'"
            :default-openeds="['1']">
            <el-menu-item index="1-3" @click="showPri">未发布文章
              <el-icon>
                <template #default>
                  <img style="height: 100%; width: 100%" src="@/assets/notPub.svg" alt="">
                </template>
              </el-icon>
            </el-menu-item>
            <el-menu-item index="1-4" @click="showPub">已发布文章
              <el-icon>
                <template #default>
                  <img style="height: 100%; width: 100%" src="@/assets/alreadyPub.svg" alt="">
                </template>
              </el-icon>
            </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-main>
        <PubArticles ref="allPub" v-if="showPublish" style="margin-top:12px; margin-left: auto;"></PubArticles>
        <PriArticles ref="allPri" v-else style="margin-top:12px; margin-left: auto;"></PriArticles>
      </el-main>
    </el-container>
  </el-container>
  <div style="display: flex;
              justify-content: center;
              width: 100%;"
       v-if="total>0">
    <div style="display: flex;
                width: 1100px;
                margin-top: 20px;
                justify-content: right ">
      <el-pagination
          @change="refresh"
          hide-on-single-page
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30]"
          pager-count="5"
          v-model:current-page="pageCount"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total" />
    </div>
  </div>
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
import {getPriArticlesCount, getPubArticlesCount} from "@/utils/articleApi";

let showPublish = ref(true)
const router = useRouter();
const total = ref(10)
const pageSize = ref(5)
const pageCount = ref(1)
const allPub = ref()
const allPri = ref()

function showPri() {
  showPublish.value = false
  getArtList()
}

function showPub() {
  showPublish.value = true
  getArtList()
}

// 先获取总数
async function getArtList() {
  if(showPublish.value){
    total.value = await getPubArticlesCount()
  } else {
    total.value = await getPriArticlesCount()
  }
}
getArtList()

function refresh(cur_page, page_size){
  let offset = page_size * (cur_page - 1)
  if(showPublish.value){
    allPub.value.getArtList(page_size, offset)
  } else {
    allPri.value.getArtList(page_size, offset)
  }
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