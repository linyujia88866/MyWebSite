<script setup>
import {onMounted, ref} from "vue";
import Navigate from "@/components/Navigate.vue";

let msg=ref("");
const originTab=ref("功能");
let items=ref(["web应用开发","UI动效设计","手机微电影制作"]);
const childRef = ref(null);
function add(){
  console.log(msg.value)
  if(msg.value!=="")
  {
    items.value.push(msg.value);
    msg.value="";
  }
}
function remove(index){
  items.value.splice(index,1);
}
function clear(){
  items.value=[];
}
</script>

<template>
  <div>
    <navigate ref="childRef" :origin-tab="originTab"></navigate>
    <header>
      <h2>小黑记事本</h2>
    </header>
    <section id="app">
      <div class="title">
        <input type="text" placeholder="请输入待做事项" v-model.trim="msg" @keyup.enter="add" autocomplete="off">
      </div>
      <div class="items">
        <ul type="1">
          <li v-for="(item,index) in items">
            <span class="order">{{index+1}}.</span>{{item}} <span class="delete" @click="remove(index)">x</span>
          </li>
        </ul>
      </div>
      <div class="tongji" v-show="items.length!==0">
        <div class="left"><span>{{items.length}}</span>items left</div>
        <div class="clear"><span @click="clear">Clear</span></div>
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

section{
  width:90%;
  margin:0 auto;
  background-color: #fff;
  box-shadow:  5px 5px 3px #ccc;
  border-radius: 0 0 3% 3%;
}
.title{
  border-bottom: 1px solid #ccc;
}
input{
  width:100%;
  border:none;
  height: 40px;
  padding:5px 20px;
  box-sizing: border-box;
  font-size: 20px;
  color:#333;
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
  padding-left: 0;
  padding:10px 10px;
  border-bottom: 1px solid #ccc;
  color:#666;
  position: relative;
}
.order{
  padding: 0 10px;
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
  margin-right: 10px;

}
.clear{
  float: right;
  margin-right: 20px;
  cursor: pointer;   /*鼠标删除小手*/
}
</style>