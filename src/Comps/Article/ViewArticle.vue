<template>
  <div>
    <el-container class="layout-container-demo" style="height: 100%;">
      <el-aside width="200px" >
        <el-scrollbar >
          <el-menu
              :default-openeds="['1']">
<!--            <el-sub-menu index="1">-->
<!--              <template #title>-->
<!--                <el-icon><icon-menu /></el-icon>快速导航-->
<!--              </template>-->
<!--              <el-menu-item index="1-2" v-if="isLogin" @click="router.push('/manageArticle')">返回文章管理-->
<!--                <el-icon><Setting /></el-icon>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="1-3" @click="router.push('/')">返回浏览文章-->
<!--                <el-icon><View /></el-icon>-->
<!--              </el-menu-item>-->
<!--            </el-sub-menu>-->
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-main>
          <div style="margin: 12px auto auto;width: 70%;">
            <div> <h1>{{title}}</h1></div>
            <!--    ===============================================================================================-->
            <!--      一共24列，自由配置-->
            <el-row style="">
              <el-col :span="4">
                <el-statistic title="作者" :value="username" />
              </el-col>
              <el-col :span="4">
                <el-statistic title="发布时间" :value="`${timestampToDate(createdAt)}`" />
              </el-col>
              <el-col :span="4">
                <el-statistic title="阅读数" :value="readCount">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <View />
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="4">
                <el-statistic title="点赞数" :value="goodCount">
                  <template #suffix>
                    <el-icon >
                      <template #default>
                        <img style="height: 100%; width: 100%; vertical-align: -0.125em" src="@/assets/giveGoodLine.svg">
                      </template>
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="4">
                <el-statistic title="收藏数" :value="likeCount">
                  <template #suffix>
                    <el-icon  style="vertical-align: -0.125em">
                      <Star />
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="4">
                <el-statistic title="评论数" :value="commentCount">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <ChatLineRound />
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
            </el-row>
            <!--    ===============================================================================================-->
            <el-divider content-position="center">文章内容</el-divider>
            <div style="text-align: left; margin-left: 20px;" v-html="content"></div>
            <div style="display: flex; width: 100%;
            padding: 8px;
            justify-content: flex-end;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);">
              <!--              =========================================================================-->
              <el-tooltip
                  v-if="!hasGood"
                  effect="dark"
                  content="点赞"
                  placement="top"
                  :show-after="500"
              >
                <el-button
                    circle
                    style="margin: 0 0 0 8px; "
                    @click.stop="addGoodToArt"
                    size="small">
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/giveGood.svg">
                      </template>
                    </el-icon>
                  </template>
                </el-button>
              </el-tooltip>
              <!--              =========================================================================-->
              <el-tooltip
                  v-else
                  effect="dark"
                  content="取消点赞"
                  placement="top"
                  :show-after="500"
              >
                <el-button
                    circle
                    style="margin: 0 0 0 8px; "
                    @click.stop="cancelGoodToArt"
                    size="small">
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/alGood.svg">
                      </template>
                    </el-icon>
                  </template>
                </el-button>
              </el-tooltip>
              <!--              =========================================================================-->
              <el-tooltip
                  v-if="hasLike"
                  effect="dark"
                  content="取消收藏"
                  placement="top"
                  :show-after="500"
              >
                <el-button   circle
                             style="margin: 0 0 0 8px; "
                             @click.stop="cancelLikeToArt"
                             size="small" >
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/alLike.svg">
                      </template>
                    </el-icon>
                  </template>
                </el-button>


              </el-tooltip>
              <!--              =========================================================================-->
              <el-tooltip
                  v-else
                  effect="dark"
                  content="收藏"
                  placement="top"
                  :show-after="500"
              >
                <el-button circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="addLikeToArt"
                           size="small"
                >
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/like.svg">
                      </template>
                    </el-icon>
                  </template>

                </el-button>
              </el-tooltip>
              <!--              =========================================================================-->
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

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
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Menu as IconMenu,ChatLineRound, StarFilled,Star, View, Setting} from '@element-plus/icons-vue'
import {timestampToDate} from "@/utils/stringutils";
import {
  addGoodToArtApi,
  addLikeToArtApi, cancelGoodToArtApi,
  cancelLikeToArtApi,
  checkGoodToArtApi,
  checkLikeToArtApi
} from "@/utils/fileApi";
import {viewArt} from "@/utils/articleApi";
import bus from "@/utils/eventBus";
import {gotoLoginApi} from "@/utils/common";

const source = ref(0)
source.value = 172000
const router = useRouter();
let nav = ref()
let isLogin = ref(false)
let title = ref("")
let content = ref("")
let createdAt = ref("")
let username = ref("")
let articleId = ref("")
let readCount = ref(0)
let goodCount = ref(0)
let likeCount = ref(0)
let commentCount = ref(0)
let hasLike = ref(false)
let hasGood = ref(false)
const route=useRoute()

articleId.value = route.query.articleId
onMounted(() => {
  bus.$on('loginStatus', decideContentToShow);
  onUnmounted(()=>{
    bus.$off('loginStatus', decideContentToShow)
  }); // 确保在组件卸载时移除监听器
});
nextTick(async () => {
  let res = await viewArt(articleId.value)
  title.value = res.title
  content.value = res.content
  createdAt.value = res.createdAt
  username.value = res.username
  articleId.value = res.articleId
  readCount.value = res.readCount
  goodCount.value = res.goodCount
  likeCount.value = res.likeCount
  commentCount.value = res.commentCount
  await checkLikeToArt()
  await checkGoodToArt()
})

const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  },
})

function decideContentToShow(x) {
  isLogin.value = x
}

async function addLikeToArt() {
  let res = await addLikeToArtApi(articleId.value)
  if(res === "notLogin"){
    await gotoLoginApi(router)
    return
  }
  if(res==="success"){
    likeCount.value =  likeCount.value + 1
  }
  await checkLikeToArt()
}

async function addGoodToArt() {
  let res = await addGoodToArtApi(articleId.value)
  if(res === "notLogin"){
    await gotoLoginApi(router)
    return
  }
  if(res==="success"){
    goodCount.value =  goodCount.value + 1
  }
  await checkGoodToArt()
}

async function cancelLikeToArt() {
  let res = await cancelLikeToArtApi(articleId.value)
  if(res==="success"){
    likeCount.value =  likeCount.value - 1
  }
  await checkLikeToArt()
}

async function cancelGoodToArt() {
  let res = await cancelGoodToArtApi(articleId.value)
  if(res==="success"){
    goodCount.value  =  goodCount.value -1
  }
  await checkGoodToArt()
}

async function checkLikeToArt() {
  let res = await checkLikeToArtApi(articleId.value)
  hasLike.value = res === "yes";
}

async function checkGoodToArt() {
  let res = await checkGoodToArtApi(articleId.value)
  hasGood.value = res === "yes";
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
</style>