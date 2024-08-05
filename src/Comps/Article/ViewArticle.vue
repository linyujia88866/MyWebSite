<template>
  <div>
    <navigate-one  :origin-tab="'功能'"></navigate-one>
    <div style=" position: absolute; text-align: left; margin-left: 20px;  top: 80px; " >
      <el-button type="primary" @click="router.push('/notes')">返回文章管理</el-button>
    </div>
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
    </div>



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
import { useTransition } from '@vueuse/core'
import { ChatLineRound, StarFilled,View  } from '@element-plus/icons-vue'
import {timestampToDate} from "@/utils/stringutils";

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000
const router = useRouter();
let title = ref("")
let content = ref("")
let createdAt = ref("")
let username = ref("")

nextTick(()=>{
  title.value = history.state.title
  content.value = history.state.content
  createdAt.value = history.state.createdAt
  username.value = history.state.username
})

const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  },
})



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