<template>
  <navigate  :origin-tab="'功能'"></navigate>

  <header >
    <h4 style="text-align: left;
    padding-top: 60px;
    padding-left: 10px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 0;
    padding-bottom: 0;"
        @click="gotoMemoryCards"><<<</h4>
    <span class="the-title-label">标题：</span><input class="the-title" type="text" placeholder="请输入标题" v-model.trim="title" autocomplete="off">
  </header>
  <div class="page">
    <Editor :value="emailForm.test_msg" @updateValue="getMsg" />
  </div>
  <div class="fixed-bar">
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
  </div>
</template>

<script setup>
import Editor from '@/Editor/index.vue'
import {reactive, ref} from "vue";
import Navigate from "@/components/Navigate.vue";
import {useRoute, useRouter} from 'vue-router';
const route=useRoute()
const router = useRouter();
import {myHttp} from "@/request/myrequest";

const emailForm = reactive({
  test_msg: "<p>#创作灵感# </p>" +
      "<p>• 记录工作实践、项目复盘</p>" +
      "<p>• 写技术笔记巩固知识要点 </p>" +
      "<p>• 发表职场感悟心得 </p>" +
      "<p>• 搬运自己的原创文章到这</p>",
  msg: ''
})
const getMsg = (val) => {
  emailForm.msg = val
}

let title = ref('')

function gotoMemoryCards() {
  router.push({name: 'home'});
}
</script>
<style scoped>
.the-title{
  color: #2c3e50;;
  font-weight: 400;
  line-height: 60px;
  width: 1000px;
  height: 32px;
  border: #2c3e50 2px solid;
  border-radius: 5px;
}

.the-title-label{
  padding-top: 0;
  margin-top: 0;
  color: #2c3e50;;
  font-weight: 400;
  line-height: 60px;
  max-width: 500px;
}

.fixed-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(135, 206, 235);
  color: white;
  padding: 10px;
}

.fixed-bar button {
  margin: 0 5px;
  padding: 10px 20px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
}

.fixed-bar button:hover {
  background-color: #666;
}
</style>
