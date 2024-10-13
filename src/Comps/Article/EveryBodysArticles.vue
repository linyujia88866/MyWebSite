<template>
  <div style="width: 100%; text-align: right; position: absolute; margin-top: 80px">
    <el-tooltip
        effect="dark"
        content="发现更多好玩"
        placement="right-start"
        :show-after="500"
    >
      <el-icon size="60" style="margin-right: 60px; cursor: pointer" @click="router.push('/home')">
        <template #default>
          <img style="height: 100%; width: 100%; vertical-align: -0.125em" src="@/assets/find_more.svg" alt="">
        </template>
      </el-icon>
    </el-tooltip>
  </div>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-container>
      <el-main>
        <AllPubArticles ref="allPub" style="margin-top:12px; margin-left: auto;"></AllPubArticles>
      </el-main>
    </el-container>
  </el-container>
<!--  <div style="display: flex;-->
<!--              justify-content: center;-->
<!--              margin-top: 20px;-->
<!--              width: 100%;"-->
<!--       v-if="total>0">-->
<!--    <div style="display: flex;   width: 900px; justify-content: right ">-->
<!--      <el-pagination-->
<!--          @change="refresh"-->
<!--          v-model:page-size="pageSize"-->
<!--          :page-sizes="[10, 20, 30, 40]"-->
<!--          page-count="5"-->
<!--          v-model:current-page="pageCount"-->
<!--          background-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="total" />-->
<!--    </div>-->
<!--  </div>-->
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
import {onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import AllPubArticles from "@/Comps/Article/AllPubArticles.vue";
import ArticlesILike from "@/Comps/Article/ArticlesILike.vue";
import bus from "@/utils/eventBus";
import {getAllPubArticlesCount} from "@/utils/articleApi";

const router = useRouter();
let showILike = ref(false)
let nav = ref()
let isLogin = ref(false)
const total = ref(0)
const pageSize = ref(10)
const pageCount = ref(1)
const allPub = ref()

function refresh(cur_page, page_size){
  let offset = page_size * (cur_page - 1)
  allPub.value.getArtList(offset, page_size)
}

onMounted(() => {
  bus.$on('loginStatus', decideContentToShow);
  onUnmounted(()=>{
    bus.$off('loginStatus', decideContentToShow)
  }); // 确保在组件卸载时移除监听器
});

async function getArtList() {
  total.value = await getAllPubArticlesCount()
}
getArtList()

function decideContentToShow(x) {
  isLogin.value = x
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