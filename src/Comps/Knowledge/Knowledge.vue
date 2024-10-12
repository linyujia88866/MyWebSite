<template>
  <el-container class="layout-container-demo" >
    <el-aside width="300px">
      <el-scrollbar>
        <el-menu
            ref="menu"
            @select="handleSelect"
            :default-active="defaultActive"
            :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>从0到1搭建一个自己的网站
            </template>
            <el-menu-item index="1-0">知识库概览</el-menu-item>
            <el-menu-item index="1-3">项目简介</el-menu-item>
            <el-sub-menu index="1-4">
              <template #title>环境的搭建</template>
              <el-menu-item index="1-4-1">拥有自己的第一台服务器</el-menu-item>
              <el-menu-item index="1-4-2">部署一个最简单的web服务器</el-menu-item>
              <el-menu-item index="1-4-3">开发一个简单的html页面</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="1-5">
              <template #title>前端开发</template>
              <el-menu-item index="1-5-1">单页面应用介绍</el-menu-item>
              <el-menu-item index="1-5-2">创建一个vue工程</el-menu-item>
              <el-menu-item index="1-5-3">使用vue开发一个简单的网页</el-menu-item>
            </el-sub-menu>
<!--            <el-sub-menu index="1-6">-->
<!--              <template #title>后端开发</template>-->
<!--              <el-menu-item index="1-6-1">写一个最简单的后端服务</el-menu-item>-->
<!--            </el-sub-menu>-->
<!--            <el-menu-item index="1-1">K8S</el-menu-item>-->
<!--            <el-menu-item index="1-2">Docker</el-menu-item>-->
<!--            <el-menu-item index="1-3">中间件部署</el-menu-item>-->
          </el-sub-menu>
<!--          <el-sub-menu index="2">-->
<!--            <template #title>-->
<!--              <el-icon><icon-menu /></el-icon>Navigator Two-->
<!--            </template>-->
<!--            <el-menu-item-group>-->
<!--              <template #title>Group 1</template>-->
<!--              <el-menu-item index="2-1">Option 1</el-menu-item>-->
<!--              <el-menu-item index="2-2">Option 2</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--          </el-sub-menu>-->
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="
      /*text-align: right;*/
       font-size: 24px">
        <div class="toolbar">
          <span>{{title}}</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <template #default>
            <Summary v-if="activeIndex==='1-0'"/>
            <Introduce v-if="activeIndex==='1-3'"></Introduce>
            <BuyServer v-if="activeIndex==='1-4-1'"/>
            <DeployNginx  v-if="activeIndex==='1-4-2'"></DeployNginx>
            <DevHtml v-if="activeIndex==='1-4-3'"></DevHtml>
            <SPA  v-if="activeIndex==='1-5-1'"></SPA>
            <CreateVue  v-if="activeIndex==='1-5-2'"></CreateVue>
            <UseVue  v-if="activeIndex==='1-5-3'"></UseVue>
          </template>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {nextTick, onUnmounted, ref} from 'vue'
import {Message} from '@element-plus/icons-vue'
import Summary from "@/Comps/Knowledge/Content/Summary.vue";
import BuyServer from "@/Comps/Knowledge/Content/BuyServer.vue";
import DeployNginx from "@/Comps/Knowledge/Content/DeployNginx.vue";
import {useRoute, useRouter} from "vue-router";
import DevHtml from "@/Comps/Knowledge/Content/DevHtml.vue";
import SPA from "@/Comps/Knowledge/Content/Website/SPA.vue";
import bus from "@/utils/eventBus";
import CreateVue from "@/Comps/Knowledge/Content/Website/CreateVue.vue";
import UseVue from "@/Comps/Knowledge/Content/Website/UseVue.vue";
import PutIdDown from "@/Comps/Knowledge/Content/Website/Three/PutIdDown.vue";
import Introduce from "@/Comps/Knowledge/Content/Website/Three/Introduce.vue";

const activeIndex = ref("1-0")
const menu = ref()
const defaultActive = ref('')
const route = useRoute()
const router = useRouter();
let dist = {
  '1-0': {
    title: '知识库概览'
  },
  '1-1': {
    title: 'K8S'
  },
  '1-2': {
    title: 'Docker'
  },
  '1-3': {
    title: '项目简介'
  }
  , '1-3-1': {
    title: '将知识沉淀下来'
  }
  , '1-3-2': {
    title: '灵感来源'
  }
  , '1-3-3': {
    title: '网站项目介绍'
  }
  , '1-4-1': {
    title: '拥有自己的第一台服务器'
  }
  , '1-4-2': {
    title: '部署一个最简单的web服务器'
  }
  , '1-4-3': {
    title: '开发一个简单的html页面'
  }
  , '1-5-1': {
    title: 'SPA单页面应用介绍'
  }
  , '1-5-2': {
    title: '创建一个vue工程'
  }
  , '1-5-3': {
    title: '使用vue开发一个简单的网页'
  }
  , '1-6-1': {
    title: '写一个最简单的后端服务'
  }
}
//
// <el-menu-item index="1-3-1">将知识沉淀下来</el-menu-item>
// <el-menu-item index="1-3-2">灵感来源</el-menu-item>
// <el-menu-item index="1-3-3">网站项目介绍</el-menu-item>

function handleSelect(e) {
  // console.log("您正在阅读第" + e + "章内容")
  title.value = dist[e].title
  activeIndex.value = e
  defaultActive.value = e
  history.state.activeIndex = e
}

const title = ref("")
activeIndex.value = history.state.activeIndex
nextTick(() => {
  if (activeIndex.value) {
    handleSelect(activeIndex.value)
  } else {
    handleSelect('1-0')
  }
})
bus.on('handleSelect', handleSelect)

onUnmounted(() => {
  bus.off('handleSelect', handleSelect)
})

defineExpose({
  handleSelect
})
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  //background-color: var(--el-color-primary-light-7);
  //color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  //color: var(--el-text-color-primary);
  //background: var(--el-color-primary-light-8);
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