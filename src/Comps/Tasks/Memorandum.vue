<script setup>
import {reactive, ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
const route=useRoute()
const router = useRouter();
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import NavigateOne from "@/components/Common/NavigateOne.vue";

let url ="/task"
let taskId = ref("")
taskId.value = route.query.taskId
if(taskId.value){
  url=url+"/get/"+taskId.value
  getTaskInfo()
}
let items=reactive([]);

let msg=ref("");
const originTab=ref("任务详情");
let title = ref("")

function getTaskInfo() {
  myHttp.get(url)
      .then(response => {
        if (response.data.code === 200) {
          let data = response.data.data
          title.value = data.title
          let things = data.content.split("#*#*10086")
          for(let i = 0; i < things.length; i++){
            items.push({content: things[i]})
          }
        } else {
          ElMessage({
            message: "获取任务信息失败",
            type: 'error',
          });
        }
      })
}


// let items=ref(["web应用开发","UI动效设计","手机微电影制作"]);

const childRef = ref(null);

function add(){
  if(msg.value!=="" )
  {
    items.push({content: msg.value});
    msg.value="";
  }
}
function remove(index){
  items.splice(index,1);
}
function clear(){
  items=[];
}

async function saveTask() {
  if(title.value===""){
    ElMessage({
      message: "请填写标题",
      type: 'warning',
    });
    return
  }
  if(title.value.length > 30){
    ElMessage({
      message: "标题长度不能超过30个字符",
      type: 'warning',
    });
    return
  }
  if(items.length === 0){
    ElMessage({
      message: "请添加至少一个事项",
      type: 'warning',
    });
    return
  }
  let newItems = []
  for(let i = 0; i < items.length; i++){
    newItems.push(items[i].content)
  }

  let requestBody = {
    title: title.value,
    content: newItems.join("#*#*10086")
  };
  if(taskId.value){
    await updateTask(requestBody)
  } else {
    await createNewTask(requestBody)
  }
}

async function updateTask(requestBody) {
  await myHttp.post("/task/update/" + taskId.value, requestBody)
      .then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: "任务保存成功" + taskId.value,
            type: 'success',
          });
          router.push({name: 'memoryCards'})
        }
      })
      .catch(error => {});
}

async function createNewTask(requestBody) {
  await myHttp.post("/task/save", requestBody)
      .then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: "任务保存成功" + response.data.data,
            type: 'success',
          });
          taskId.value = response.data.data
          router.push({name: 'memoryCards'})
        }
      })
      .catch(error => {});
}

function gotoMemoryCards(){
  router.push({name: 'memoryCards'});
}
</script>

<template>
  <div>
<!--    <navigate-one ref="childRef" :origin-tab="originTab"></navigate-one>-->
    <h4 style="text-align: left; padding-top: 12px; padding-left: 10px;text-decoration: underline;cursor: pointer;"
        @click="gotoMemoryCards">返回清单列表</h4>
    <header>
      <span class="the-title-label">标题：</span><input class="the-title" type="text" placeholder="请输入标题" v-model.trim="title" autocomplete="off">
    </header>
    <section >
      <div class="title">
        <input type="text" placeholder="请输入事项(按ENTER键添加事项)" v-model.trim="msg" @keyup.enter="add" autocomplete="off">
        <button style="margin: 0 12px ; width: 80px; height: 32px; text-align: center; padding: 0" @click="add">添加</button>
      </div>
      <el-empty v-if="items.length === 0" description="暂无事项" />
      <div v-else class="items">
        <ul type="1">
          <li v-for="(item,index) in items">
            <span class="order">{{index+1}}.</span><input style="text-align: left;display: block; width: 80%"  v-model.trim="item.content"> <span class="delete" @click="remove(index)">x</span>
          </li>
        </ul>
      </div>
      <div class="tongji" v-show="items.length!==0">
        <div class="left">当前共有<span style="text-align: center;">{{items.length}}</span>个事项</div>
        <div class="clear"><span @click="clear">清空所有事项</span></div>
      </div>
    </section>
    <div style="height: 2px"></div>
    <section v-if="items.length">
      <div>
        <button type="submit" @click="saveTask">保存清单</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
*{
  padding-left: 0;
  margin:0;
  list-style: none;
}
body{
  background-color: #eee;
}
header,footer{
  text-align: center;
  height: 60px;

}
h2{
  color:rgba(238, 7, 7, 0.842);
  font-weight: 400;
  line-height: 60px;
}

button[type="submit"] {
  width: 100px;
  height: 38px;
  padding-left: 8px;
  //margin: 10px;
  text-align: center;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  //margin-right: 10px;
  cursor: pointer;
}

.the-title{
  color: #2c3e50;;
  font-weight: 400;
  line-height: 60px;
  max-width: 500px;
  border: #2c3e50 2px solid;
  border-radius: 5px;
}

.the-title-label{
  color: #2c3e50;;
  font-weight: 400;
  line-height: 60px;
  max-width: 500px;
}

section{
  width:90%;
  margin:0 auto;
  background-color: #fff;
  box-shadow:  5px 5px 3px #ccc;
  border-radius: 0 0 3% 3%;
}
.title{
  border-bottom: 1px solid #ccc;
  display: flex;
}
input{
  width:100%;
  border:none;
  height: 40px;
  padding:5px 20px;
  box-sizing: border-box;
  font-size: 20px;
  color: #2c3e50;
}
.items{
  width:100%;
}
.items ul{
  width:100%;
}
li{
  width:100%;
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color:#666;
  position: relative;
}
.order{
  padding-top: 15px;
  text-align: left;
  float: left;
  width: 10px;
}
.delete{
  position: absolute;
  right:10px;
  top:10px;
  display: none;
  font-size: 24px;
  cursor: pointer;   /*鼠标删除小手*/
}
.items li:hover .delete{
  display: block;
}
.tongji{
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color:darkturquoise;
}
.left{
  float: left;
  margin-left: 20px;
  font-style: italic;
}
.left span{
  //margin-right: 10px;

}
.clear{
  float: right;
  margin-right: 20px;
  cursor: pointer;   /*鼠标删除小手*/
}
</style>