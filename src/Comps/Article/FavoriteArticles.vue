<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-main>
      <ArticlesILike ref="allPub" style="margin-top:12px; margin-left: auto;"></ArticlesILike>
    </el-main>
  </el-container>
  <div style="display: flex;
              justify-content: center;
              margin-top: 20px;
              width: 100%;"
       v-if="total>0">
    <div style="display: flex;   width: 900px; justify-content: right ">
      <el-pagination
          @change="refresh"
          hide-on-single-page
          v-model:page-size="pageSize"
          v-model:current-page="pageCount"
          :page-sizes="[5, 10, 20, 30]"
          pager-count="5"
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
import ArticlesILike from "@/Comps/Article/ArticlesILike.vue";
import {getMyFavoriteArtTotalApi} from "@/utils/articleApi";
import {ref} from "vue";
const total = ref(0)
const pageSize = ref(5)
const pageCount = ref(1)
const allPub = ref()
async function getArtList() {
  total.value = await getMyFavoriteArtTotalApi()
}
getArtList()

function refresh(cur_page, page_size){
  let offset = page_size * (cur_page - 1)
  allPub.value.getArtList(page_size, offset)
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