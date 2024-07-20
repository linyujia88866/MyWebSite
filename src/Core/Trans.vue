

<template>
<div @click="reset" style="height: 100%;">
  <navigate ref="childRef" :origin-tab="'功能'"></navigate>
  <div style="margin-bottom: 0; padding-bottom: 0;">
    <div  style="display: flex; margin-top: 60px; margin-bottom: 0; padding-bottom: 0;">
      <!-- 隐藏的文件上传input -->
      <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
      <!-- 点击按钮触发文件上传 -->
      <button @click="selectFile"
              style="margin-left: 12px;
              margin-top: 12px;
              height: 32px; width: 108px;
              border-radius: 5px;
              border: #888888 1px solid;
              background-color: deepskyblue;">选择文件上传</button>
      <button style="float: left; margin-left: 12px; margin-top: 12px;
              height: 32px; width: 108px;
              border-radius: 5px;
              border: #888888 1px solid;
              background-color: deepskyblue;"
              @click.stop="makeDir">新建文件夹</button>
    </div>
  </div>

  <div v-if="files.length > 0" style="display: flex;  width: 100%; align-content: center; align-items: center; padding: 0; margin: 0 0 0 12px; min-height: 0; ">
    <ul style="display: flex; margin-bottom: 0; padding: 0; margin-left: 12px;  min-height: 0;">
      <li v-for="file in files" :key="file.name" style="height: 28px; text-align: center; align-content: center; align-items: center">
        {{ file.name }} - {{ file.size }} bytes
      </li>
      <button @click="uploadFile" v-if="files.length>0"
              style="margin: 0 0 0 10px;height: 28px; ">上传</button>
      <button @click="removeFile" v-if="files.length>0"
              style="margin: 0 0 0 10px;height: 28px; ">移除</button>
    </ul>
  </div>
  <hr style=" margin: 20px 0 8px 12px;">
<!--  <p style="text-align: left;padding: 0; margin: 0 0 0 12px;vertical-align: top; ">{{topLine}}</p>-->
  <div style="display: flex; margin-left: 12px; margin-top: 0; margin-bottom: 12px; ">
    <button v-if="curPath !== ''"
        style="margin-right: 8px; display: flex;" @click="changePath">
      <p style="margin: 0; padding: 0">↑</p>
      <p style="margin: 0; padding: 0">返回上一层</p>
    </button>
    <p style="margin: 0; padding: 0; ">当前文件夹路径:</p>
    <p style="margin: 0; padding: 0;font-weight: bold; vertical-align: bottom; text-decoration-line: underline; ">/全部文件/</p>
    <p style="margin: 0; padding: 0; font-weight: bold; vertical-align: bottom; text-decoration-line: underline;">{{curPath}}</p>
  </div>
  <div v-if="makingDir"
       style="display: flex; align-items: center; align-content: center; padding: 0; margin: 0 0 0 12px;height: 32px;">
    <img src="@/assets/wenjianjia.png" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
    <input v-model="dirName" @click.stop>
    <button style="margin-left: 12px;" @click.stop="createDir">确定</button>
    <button style="margin-left: 12px;" @click.stop="cancelMakeDir">取消</button>
  </div>
  <div>
    <Folder v-for="folder in folders" :key="folder.name" :name="folder.name"
            @click="gointodir(folder.name)"
            style="padding: 0; margin: 0 0 0 12px;" />
  </div>
  <div>
<!--    <File v-for="fileName in fileNames" :key="fileName.name" :name="fileName.name" style="margin: 0;padding: 0; margin-left: 12px;" />-->
    <div style="padding: 0; margin: 0 0 0 12px;" v-for="fileName in fileNames" >
      <div @mouseover="handleFileHover(fileName)"
           @mouseleave="handleFileLeave(fileName)"
          style="display: flex;
          align-items: center;
          align-content: center;
          padding: 0; margin: 0;
          height: 32px;">
        <img src="@/assets/wenjian.jpg" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
        <h3 >{{ fileName.name }}</h3>
        <button v-if="fileName.show"
                style=" border: #333333 1px solid; margin: 0 0 0 12px;"
                @click="downloadFile(fileName.name)">下载</button>
        <button v-if="fileName.show"
                style=" border: #333333 1px solid;
                margin: 0 0 0 12px;"
                @click="downloadFile(fileName.name)">删除</button>
      </div>

    </div>
  </div>
  <div style="height: 500px; width: 100%;  display: flex;"
       v-if="fileNames.length === 0 && folders.length ===0"><h3 style="margin: auto; ">暂无文件</h3></div>
</div>
</template>

<script setup>
import {ref} from 'vue';
import Folder from '@/Comps/Folder.vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const topLine = ref('-')
topLine.value = topLine.value.repeat(200)

import {myHttp} from "@/request/myrequest";
import Navigate from "@/components/Navigate.vue";
let curPath = ref('')

const fileInput = ref(null);

const selectFile = () => {
  if(fileObject.value){return}
  fileInput.value.click(); // 触发文件选择
};

let dirName = ref('')
let makingDir=ref(false)

function makeDir() {
  makingDir.value = true
  dirName.value = "新建文件夹"
}

function handleFileHover(fileObject){
    fileObject.show = true
}

function handleFileLeave(fileObject){
  fileObject.show = false
}

function changePath() {
  if(curPath.value === ''){
    return
  } else {
    curPath.value = getParentDirectory(curPath.value)
  }
  getFileList()
}

function getParentDirectory(filePath) {
  // 移除尾部的斜杠，以确保正则表达式工作正常
  filePath = filePath.replace(/\/$/, '');

  // 匹配最后一个斜杠前的部分
  const match = filePath.match(/^(.*)\/[^\/]*$/);
  return match ? match[1] : '';
}

function gointodir(dir){
  if(curPath.value === ''){
    curPath.value = dir
  } else {
    curPath.value = curPath.value + '/'  + dir
  }
  getFileList()
}

function reset(){
  makingDir.value = false
  dirName.value = ""
}

function cancelMakeDir() {
  makingDir.value = false
  dirName.value = ""
}

function hasElementWithName(list, name) {
  return list.some(element => element.name === name);
}

function downloadFile(filename) {
  console.log("下载文件")
  console.log(filename)
}

const createDir = async () =>
    {
      if(!dirName.value){
        alert("请输入文件夹名称")
        return
      }

      if(hasElementWithName(folders.value, dirName.value)){
        alert("文件夹名称重复")
        return
      }
      const formData = new FormData();
      formData.append('filepath', curPath.value + '/' + dirName.value);

      try {
        await myHttp.post("/minio/createDir", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
            .then(() => {
              makingDir.value = false
              dirName.value = ""
              getFileList()
            });

      } catch (error) {
        alert("创建文件夹失败")
      }
    }
;

const fileObject = ref(null)

function removeFile() {
  fileObject.value=null
  files.value = []
}

const uploadFile = async () =>
    {

      if (!fileObject.value) {
        alert('Please select a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileObject.value);
      formData.append('filepath', curPath.value + '/');

      try {
        await myHttp.post("/minio/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
            .then(() =>{
              getFileList()
              fileObject.value=null
              files.value = []
              alert('上传成功')
            });

      } catch (error) {
        console.error(error);
      }
    }
;
const handleFileChange = (event) => {
  fileObject.value = event.target.files[0];
  files.value = [...files.value, ...event.target.files];
  event.target.value = '';
};

function removePrefix(str, prefix) {
  // 创建一个正则表达式，它将匹配以prefix变量开头的字符串
  const regex = new RegExp('^' + prefix);

  // 使用replace方法移除匹配到的前缀
  return str.replace(regex, '');
}

function replaceSuffix(str, prefix='\/') {
  // 正则表达式匹配字符串末尾的后缀
  const regex = new RegExp(prefix + '$');
  // 使用replace方法替换后缀
  return str.replace(regex, '');
}


function getFileList(){
  let url = "/minio/listObjectNamesInDir/test"

  myHttp.post(url, {prefix: curPath.value+'/'}, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      if (response.status === 200) {
        folders.value = []
        fileNames.value = []
        let array = response.data;
        for (let i = 0; i < array.length; i++) {
          let item_temp = removePrefix(array[i],'.*?\/')
          let item = removePrefix(item_temp, curPath.value + '\/')
          if(item.endsWith('/')){
            folders.value.push({name: replaceSuffix(item)})
          } else {
            if(!item.endsWith("_#*#*dirMask")){
              fileNames.value.push({
                name: item,
                show: false,
              })
            }
          }
        }
      }else {
        alert("获取文件列表失败！")
      }
    })
    .catch(error => console.error('Error:', error));
}

getFileList()

const files = ref([]);

const folders = ref([
  // 更多文件夹...
]);


const fileNames = ref([
  // 更多文件夹...
]);

</script>
<style scoped>


.custom-file-upload {
  padding: 10px;
  background: #f0f0f0;
  display: inline-block;
  cursor: pointer;
}
</style>