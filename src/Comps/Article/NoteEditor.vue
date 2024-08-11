<template>
<div>
  <header >
    <span class="the-title-label">标题：</span><input class="the-title" type="text" placeholder="请输入标题" v-model.trim="title" autocomplete="off">
  </header>
  <div style="width: 100%; margin-bottom: 100px">
    <Editor :value="emailForm.test_msg" @updateValue="getMsg"  />
  </div>
  <div class="fixed-bar">
    <button @click.prevent="saveDefault(false)">保存文章</button>
    <button @click.prevent="saveAndView">保存并预览</button>
    <button style="margin-right: 30px" @click.prevent="saveAndPublish">发布文章</button>
  </div>
</div>
</template>

<script setup>
import Editor from '@/Editor/index.vue'
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();
import {pubArt, saveArtApi, updateArtApi, viewArt} from "@/utils/articleApi";

const emit = defineEmits(['save-event']);
const props = defineProps({
  articleId: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
})
let curArtId = ref("")
curArtId.value = props.articleId

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
if(curArtId.value.length > 0){
  emailForm.test_msg = props.content
  title.value = props.title
}

async function saveAndView() {
  let res = await saveDefault(false)
  if(res.length === 0){
    return
  }
  // let artData = await viewArt(res)
  await router.push({
    name: 'viewArticle',
    // state: artData,
    query:{articleId: res}
  });
}

async function saveDefault(publish) {
  let artData = {}
  let res = ""
  if (curArtId.value.length > 0) {
    artData = await viewArt(curArtId.value)
    curArtId.value = artData.articleId
    await updateArtApi(title.value, emailForm.msg , curArtId.value )
    return curArtId.value
  }
  res =  await save(publish)
  curArtId.value = res
  return res
}

async function saveAndPublish() {
  let res = await saveDefault(true)

  if(res.length === 0){
    return
  }
  await pubArt(res)
  // let artData = await viewArt(res)
  await router.push({
    name: 'viewArticle',
    // state: artData,
    query:{articleId: res}
  });
}

async function save(publish) {
  return  await saveArtApi(title.value, emailForm.msg, publish, emit)
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
  //background-color: rgb(135, 206, 235);
  background-color: white;
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
