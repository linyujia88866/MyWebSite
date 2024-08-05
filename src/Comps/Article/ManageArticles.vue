<template>
  <div>
    <navigate-one  :origin-tab="'功能'"></navigate-one>
<!--    <el-affix :offset="120" position="top" >-->
<!--      <div style="display: flex; align-content: center;text-align: left ">-->
<!--        <el-button style="margin-left: 200px;" type="primary" size="default">创建文章</el-button>-->
<!--      </div>-->
<!--    </el-affix>-->
    <div>
      <el-tabs
          tab-position="left"
          style="min-height: 700px; margin-top: 12px;"
          class="demo-tabs">
        <el-tab-pane label="未发布文章" >
          <Articles style="margin-left: auto;"></Articles>
        </el-tab-pane>
        <el-tab-pane label="已公开文章">
          <Articles style="margin-left: auto;"></Articles>
        </el-tab-pane>
        <el-tab-pane label="创建新的文章">
          <note-editor
              @save-event="whenSave"
              style=" margin-right: 12px;"/>
        </el-tab-pane>
      </el-tabs>

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
import VerticalTab from '@/Comps/Article/VerticalTab.vue';
import {ref} from "vue";
import NoteEditor from "@/Comps/Article/NoteEditor.vue";
import Articles from "@/Comps/Article/Articles.vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";


const tabs = ref(['未发布文章', '已公开文章', '创建新的文章'])
const activeTab =ref('未发布文章')


function whenSave(){
  activeTab.value='未发布文章'
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