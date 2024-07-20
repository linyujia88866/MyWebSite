

<template>
  <navigate ref="childRef" :origin-tab="'功能'"></navigate>
  <div  style="display: flex; margin-top: 60px;">
    <!-- 隐藏的文件上传input -->
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
    <!-- 点击按钮触发文件上传 -->
    <button @click="selectFile" style="margin-left: 12px; margin-top: 12px;">选择文件上传</button>

  </div>
  <div style="display: flex;  width: 100%; align-content: center; align-items: center;">
    <ul style="display: flex;">
      <li v-for="file in files" :key="file.name" style="height: 28px; text-align: center; align-content: center; align-items: center">
        {{ file.name }} - {{ file.size }} bytes
      </li>
      <button @click="uploadFile" v-if="files.length>0" style="margin-left: 20px; height: 28px; ">上传</button>
      <button @click="removeFile" v-if="files.length>0" style="margin-left: 20px; height: 28px; ">移除</button>
    </ul>

  </div>
  <div style="display: flex; margin-left: 12px; margin-top: 0; margin-bottom: 12px; ">当前文件夹路径: /{{curPath}}</div>
  <div>
    <Folder v-for="folder in folders" :key="folder.name" :name="folder.name" style="margin: 0;padding: 0; margin-left: 12px;" />
  </div>
  <div>
    <File v-for="fileName in fileNames" :key="fileName.name" :name="fileName.name" style="margin: 0;padding: 0; margin-left: 12px;" />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Folder from '@/Comps/Folder.vue';
import {useRouter} from 'vue-router';
const router = useRouter();


import {myHttp} from "@/request/myrequest";
import Navigate from "@/components/Navigate.vue";
import File from "@/Comps/File.vue";
let curPath = ref('')

const fileInput = ref(null);

const selectFile = () => {
  if(fileObject.value){return}
  fileInput.value.click(); // 触发文件选择
};

const fileObject = ref(null)

function removeFile() {
  fileObject.value=null
  files.value = []
}

const uploadFile = async () => {

  if (!fileObject.value) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileObject.value);
  formData.append('filepath', curPath.value + '/');

  try {
    const response = await myHttp.post("/minio/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
        .then(() =>{
          getFileList()
          fileObject.value=null
          files.value = []
          alert('上传成功')
        })

  } catch (error) {
    console.error(error);
  }
};
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
            fileNames.value.push({name: item})
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