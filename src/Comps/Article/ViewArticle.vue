<template>
  <div>
    <navigate-one  :origin-tab="'功能'"></navigate-one>

    <el-container class="layout-container-demo" style="height: 100%;">
      <el-aside width="200px" >
        <el-scrollbar >
          <el-menu
              :default-openeds="['1']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><icon-menu /></el-icon>快速导航
              </template>
<!--              <el-menu-item index="1-1" @click="router.push('/articleHome')">返回文章主页</el-menu-item>-->
              <el-menu-item index="1-2" @click="router.push('/notes')">返回文章管理</el-menu-item>
              <el-menu-item index="1-3" @click="router.push('/EveryBodyArticle')">返回浏览文章</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-main>
          <div style=" margin: 12px auto auto;width: 70%;">
            <div> <h1>{{title}}</h1></div>
            <!--    ===============================================================================================-->
            <!--      一共24列，自由配置-->
            <el-row style="">
              <el-col :span="4">
                <el-statistic title="作者" :value="username" />
              </el-col>
              <el-col :span="5">
                <el-statistic title="发布时间" :value="`${timestampToDate(createdAt)}`" />
              </el-col>
              <el-col :span="5">
                <el-statistic title="阅读数" :value="562">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <View />
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="5">
                <el-statistic title="收藏数" :value="562">
                  <template #suffix>
                    <el-icon style="vertical-align: -0.125em">
                      <StarFilled />
                    </el-icon>
                  </template>
                </el-statistic>
              </el-col>
              <el-col :span="5">
                <el-statistic title="评论数" :value="562">
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
                    @click.stop="cancelLikeToArt"
                    size="small">
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/点赞.svg">
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
                    @click.stop="cancelLikeToArt"
                    size="small">
                  <template #default>
                    <el-icon>
                      <template #default>
                        <img style="height: 100%; width: 100%" src="@/assets/已点赞.svg">
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
                    <el-icon color="#409efc"><StarFilled /></el-icon>
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
                           :icon="Star" ></el-button>
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
import {nextTick, ref} from "vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";
import {useRouter} from "vue-router";
import {ChatLineRound, StarFilled,Star, View} from '@element-plus/icons-vue'
import {timestampToDate} from "@/utils/stringutils";
import {addLikeToArtApi, checkLikeToArtApi} from "@/utils/fileApi";

const source = ref(0)
source.value = 172000
const router = useRouter();
let title = ref("")
let content = ref("")
let createdAt = ref("")
let username = ref("")
let articleId = ref("")
let hasLike = ref(false)
let hasGood = ref(false)

nextTick(()=>{
  title.value = history.state.title
  content.value = history.state.content
  createdAt.value = history.state.createdAt
  username.value = history.state.username
  articleId.value = history.state.articleId
  checkLikeToArt()
})

const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  },
})

async function addLikeToArt() {
  await addLikeToArtApi(articleId.value)
  await checkLikeToArt()
}

async function cancelLikeToArt() {
  await cancelLikeToArtApi(articleId.value)
  await checkLikeToArt()
}

async function checkLikeToArt() {
  let res = await checkLikeToArtApi(articleId.value)
  hasLike.value = res === "yes";
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