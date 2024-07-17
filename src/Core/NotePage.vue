<template>
  <div>
    <navigate  :origin-tab="'功能'"></navigate>
    <VerticalTab
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
    />
    <div v-if="activeTab === '未发布文章'" class="container">
      <Articles style="margin-left: auto; width: 100%; "></Articles>
    </div>
    <div v-else-if="activeTab === '已公开文章'" class="container">
      <Articles style="margin-left: auto; width: 100%; "></Articles>
    </div>
    <div v-else-if="activeTab === '创建新的文章'" class="container">
      <note-editor
          @save-event="whenSave"
          style="margin-left: auto; margin-right: 20px; width: calc(100% - 250px); "/>
    </div>

    <!-- More content for other tabs -->
  </div>
</template>

<script setup>
import VerticalTab from '@/Comps/VerticalTab.vue';
import {ref} from "vue";
import Navigate from "@/components/Navigate.vue";
import NoteEditor from "@/Core/NoteEditor.vue";
import Articles from "@/Core/Articles.vue";


const tabs = ref(['未发布文章', '已公开文章', '创建新的文章'])
const activeTab =ref('未发布文章')


function whenSave(){
  activeTab.value='未发布文章'
}

</script>

<style>
.container{
  margin-top: 60px;
}
</style>