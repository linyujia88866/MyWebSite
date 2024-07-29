<template>
<div>
  <header style="margin-top: 70px">
    <span class="the-title-label">标题：</span><input class="the-title" type="text" placeholder="请输入标题" v-model.trim="title" autocomplete="off">
  </header>
  <div style="width: 100%">
    <Editor :value="emailForm.test_msg" @updateValue="getMsg"  />
  </div>
  <div class="fixed-bar">
    <button @click.prevent="save">保存文章</button>
    <button>保存并预览</button>
    <button style="margin-right: 30px">发布文章</button>
  </div>
</div>
</template>

<script setup>
import Editor from '@/Editor/index.vue'
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";

const emit = defineEmits(['save-event']);

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

let title = ref('【无标题】')

function gotoMemoryCards() {
  router.push({name: 'home'});
}

async function save() {
  if (title.value === "") {
    ElMessage({
      message: '请输入标题！',
      type: 'warning',
    });
    return
  }
  if (emailForm.msg.length === 0) {
    ElMessage({
      message: '请输入文章内容！',
      type: 'warning',
    });
    return
  }
  let requestBody = {
    title: title.value,
    content: emailForm.msg
  };

  await myHttp.post("/article/save", requestBody)
      .then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: "文章保存成功" + response.data.data,
            type: 'info',
          });
          emit('save-event', 'Hello from child with Composition API');
        }
      })
      .catch(error => console.error('Error:', error));
}
</script>
<style scoped>
.the-title{
  color: #2c3e50;;
  font-weight: 400;
  line-height: 60px;
  width: 1000px;
  height: 42px;
  border: #2c3e50 2px solid;
  border-radius: 5px;
  text-align: center;
  font-size: 24px;
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
  justify-content: right;
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
