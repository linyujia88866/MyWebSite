<template>
  <navigate ref="childRef" :origin-tab="'功能'" style="z-index: 100;"></navigate>
  <div @click="reset" style="height: 98vh; display: flex; ">
    <div>
      <div style="margin-bottom: 0; padding-bottom: 0; ">

        <div  style=" margin: 60px 0 0;padding: 0;display: flex">
          <div style="margin-left: 12px; margin-right: 12px; padding: 0;">
            <el-upload
                action=""
                :http-request="customUpload"
                ref="upload_top"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :show-file-list="false"
                :file-list="fileList_top">
              <el-button size="large" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <el-button type="primary" size="large" @click.stop="makeDir">新建文件夹</el-button>
        </div>
      </div>

      <div v-if="files.length > 0"
           style="display: flex;
                  width: 100%;
                  padding: 0;

                  margin: 12px 0 0 12px;">
        <ul>
          <li v-for="file in files" :key="file.name"
              style="height: 28px;">
            <h4 style="height: 28px;
                        margin: 0; padding: 0;">
              文件【{{ file.name }}】正在努力上传中，文件大小为【{{ file.size }} bytes】，请耐心等待。。。</h4>
          </li>
        </ul>
      </div>





      <div style="display: flex; margin-left: 12px; margin-top: 12px; margin-bottom: 12px; ">
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
        <tr style="display: flex;
            align-items: center;
            align-content: center;
            padding: 0; margin: 0;
            height: 32px;">
          <td style="display: flex;align-items: center;
            align-content: center;
            padding: 0;
            margin: 0 0 0 12px;
            width: 700px;
            height: 32px;">
            <h3>文件名</h3>
          </td>
          <td style="width: 200px; text-align: left">
            <h3 style=" color: #42b983;
            /*text-align: center;*/
            align-content: center;
            padding: 0;
            height: 32px;
           margin: 0 0 0 20px;"  >大小</h3>
          </td>
          <td style="width: 200px;text-align: left">
            <h3 style=" color: #42b983;
            /*text-align: center;*/
            align-content: center;
            padding: 0;
            height: 32px;
           margin: 0 0 0 20px;"  >修改时间</h3>
          </td>
        </tr>
        <!--    ================================================================================================================-->
        <div style="padding: 0; margin: 0 0 0 12px;" v-for="folder in folders"
             @click="goIntoDir(folder.name)">
          <tr @mouseover="handleFileHover(folder)"
              @mouseleave="handleFileLeave(folder)"
              style="display: flex;
            align-items: center;
            align-content: center;
            padding: 0; margin: 0;
            height: 32px;">
            <td style="display: flex;align-items: center;
            align-content: center;
            padding: 0; margin: 0;
            width: 700px;
            height: 32px;">
              <img src="@/assets/wenjianjia.png" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
              <h3 >{{ folder.name }}</h3>
              <button v-if="folder.show"
                      style=" border: #333333 1px solid; margin: 0 0 0 20px;"
                      @click.stop="downloadFile(folder.name, 'folder')">下载</button>
              <button v-if="folder.show"
                      style=" border: #333333 1px solid;
                  margin: 0 0 0 12px;"
                      @click.stop="deleteFolder(folder.name)">删除</button>
            </td>
            <td style="width: 200px; text-align: left;">
            </td>
            <td style="min-width: 200px;">
            </td>
          </tr>
        </div>
        <!--    ================================================================================================================-->
      </div>
      <div>
        <div style="padding: 0; margin: 0 0 0 12px;" v-for="fileName in fileNames" >

          <tr @mouseover="handleFileHover(fileName)"
              @mouseleave="handleFileLeave(fileName)"
              style="display: flex;
            align-items: center;
            align-content: center;
            padding: 0; margin: 0;
            height: 32px;">
            <td style="display: flex;align-items: center;
                align-content: center;
                padding: 0; margin: 0;
                width: 700px;
                height: 32px;">
              <img src="@/assets/wenjian.jpg" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
              <h3 >{{ getFirstAndLastChars(fileName.name) }}</h3>
              <button v-if="fileName.show"
                      style=" border: #333333 1px solid; margin: 0 0 0 20px;"
                      @click.stop="downloadFile(fileName.name, 'fileName')">下载</button>
              <button v-if="fileName.show"
                      style=" border: #333333 1px solid;
                  margin: 0 0 0 12px;"
                      @click.stop="deleteFile(fileName.name)">删除</button>
            </td>
            <td style="width: 200px; text-align: left;">
              <h3 style=" color: #42b983;
            /*text-align: center;*/
            align-content: center;
            padding: 0;
            height: 32px;
           margin: 0 0 0 20px;">{{ fileName.size }}</h3>
            </td>
            <td style="min-width: 200px;">
              <h3 style=" color: #42b983;
            text-align: center;
            align-content: center;
            padding: 0;
            height: 32px;
            margin: 0 0 0 20px;">{{ fileName.time }}</h3>
            </td>
          </tr>
        </div>
        <div v-if="progressVisible">
          <el-progress :percentage="progressPercent"></el-progress>
        </div>
      </div>
    </div>

    <div style="display: flex;  width: 100%; margin: 70px 8px 8px; align-content: center; align-items: center">
      <el-upload
          class="custom-upload"
          :append-to-body="false"
          ref="upload"
          :http-request="customUpload"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          drag
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">文件大小不要超过40m</div>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {myHttp} from "@/request/myrequest";
import Navigate from "@/components/Navigate.vue";
import { ElMessage } from 'element-plus';
import {
  calSize,
  getFirstAndLastChars,
  getParentDirectory,
  removePrefix,
  replaceSuffix,
  timePatternChange
} from "../utils/stringutils";

const router = useRouter();
const topLine = ref('-')
topLine.value = topLine.value.repeat(200)

let curPath = ref('')
let fileList = ref([])
let fileList_top = ref([])
const upload = ref(null)
const upload_top = ref(null)

const fileInput = ref(null);
const files = ref([]);

const folders = ref([
  // 更多文件夹...
]);

const fileObject = ref(null)
const fileNames = ref([
  // 更多文件夹...
]);
let dirName = ref('')
let makingDir=ref(false)

let progressVisible = ref(false)
let progressPercent = ref(0)

function handleProgress(event) {
  console.log("11111")
  // 显示进度条
  progressVisible.value = true;
  // 计算进度百分比
  progressPercent.value = Math.floor((event.loaded / event.total) * 100);
}

const selectFile = () => {
  if(fileObject.value){return}
  fileInput.value.click(); // 触发文件选择
};


function handleRemove(file, fileList) {
  console.log(file, fileList);
}
function handlePreview(file) {
  console.log(file);
}
function handleExceed(files, fileList) {
  this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
}
function beforeRemove(file, fileList) {
  return this.$confirm(`确定移除 ${ file.name }？`);
}

function  customUpload(request) {
  fileObject.value = request.file;
  files.value = [...files.value, {name: request.filename, size: request.size}];
  afterFileSelected()
}
function  handleSuccess(response, file, fileList) {
  // 成功处理逻辑
  console.log('Upload success:', response);
}
function  handleError(err, file, fileList) {
  // 错误处理逻辑
  console.error('Upload failed:', err);
}



// 创建文件夹
function makeDir() {
  makingDir.value = true
  dirName.value = "新建文件夹"
}

// 文件鼠标移动上去触发事件
function handleFileHover(fileObject){
    fileObject.show = true
}

// 文件鼠标失焦事件
function handleFileLeave(fileObject){
  fileObject.show = false
}

// 返回上一层
function changePath() {
  if(curPath.value === ''){
    return
  } else {
    curPath.value = getParentDirectory(curPath.value)
  }
  getFileList()
}

// 进入文件夹
function goIntoDir(dir){
  if(curPath.value === ''){
    curPath.value = dir
  } else {
    curPath.value = curPath.value + '/'  + dir
  }
  getFileList()
}

// 取消创建文件夹输入文件夹名称状态
function reset(){
  makingDir.value = false
  dirName.value = ""
}
// 取消创建文件夹输入文件夹名称状态
function cancelMakeDir() {
  makingDir.value = false
  dirName.value = ""
}
// 判断文件名是否存在
function hasElementWithName(list, name) {
  return list.some(element => element.name === name);
}

async function downloadFile(filename, type) {
  let finalPath;
  let url = "/minio/download"
  let resName= type === 'folder' ? filename + '.zip' : filename
  if(curPath.value.length > 0){
    finalPath = curPath.value + '/' + filename
  } else {
    finalPath = filename
  }
  if(type==='folder'){
    finalPath = finalPath + '/'
    url = "/minio/downloadDir"
  }
  try {
    await myHttp.get(url, {
      params: {
        fileName: finalPath
      },
      responseType: 'blob'
    })
      .then(response => {
        if (response.status === 200) {
          //浏览器下载
          const myBlob = response.data
          const qrUrl = window.URL.createObjectURL(myBlob);
          let fileLink = document.createElement("a");
          fileLink.href = qrUrl;
          fileLink.setAttribute("download", resName);
          document.body.appendChild(fileLink);
          fileLink.click();
        } else if (response.status === 222) {
          ElMessage({
            message: '文件夹为空！',
            type: 'warning',
          });
        }
      });

  } catch (error) {
    console.error(error);
  }
}

async function deleteFile(filename) {
  let removePath;
  if(curPath.value === ''){
    removePath = filename
  } else {
    removePath = curPath.value + '/' + filename
  }
  const formData = new FormData();
  formData.append('filepath', removePath);

  try {
    await myHttp.post("/minio/removeObject", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if(response.status === 200 && response.data === true){
          getFileList()
        }
      });
  } catch (error) {
    console.error(error);
  }
}

// 删除文件夹
async function deleteFolder(dirName) {
  let removePath;
  if (curPath.value === '') {
    removePath = dirName
  } else {
    removePath = curPath.value + '/' + dirName
  }
  const formData = new FormData();
  formData.append('filepath', removePath);

  try {
    await myHttp.post("/minio/removeDir", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
        .then(response => {
          if (response.status === 200 && response.data === true) {
            getFileList()
          }
        });
  } catch (error) {
    console.error(error);
  }
}


const createDir = async () =>
    {
      if(!dirName.value){
        ElMessage({
          message: '请输入文件夹名称！',
          type: 'warning',
        });
        return
      }

      if(hasElementWithName(folders.value, dirName.value)){
        ElMessage({
          message: '文件夹名称重复！',
          type: 'warning',
        });
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
        ElMessage({
          message: '创建文件夹失败！',
          type: 'error',
        });
      }
    }
;


const uploadFile = async () =>
    {

      if (!fileObject.value) {
        ElMessage({
          message: '请选择要上传的文件！',
          type: 'warning',
        });
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
              clearFileObjects()
            });

      } catch (error) {
        console.error(error);
        clearFileObjects()
      }
    }
;

function clearFileObjects(){
  fileObject.value=null
  files.value = []
  upload.value.clearFiles()
  upload_top.value.clearFiles()
}
const handleFileChange = (event) => {
  fileObject.value = event.target.files[0];

  files.value = [...files.value, ...event.target.files];
  event.target.value = '';
  afterFileSelected()
};

function afterFileSelected() {
  if(hasName(fileObject.value.name)){
    ElMessage({
      message: '文件名已存在',
      type: 'warning',
    });
    clearFileObjects()
    return
  }
  uploadFile()
}


// 使用计算属性
const hasName = (target) => {
  return fileNames.value.some(item => item.name === target);
};

function getFileList(){
  let url = "/minio/listObjectsInDir/test"
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
          let json_item = array[i]
          let item_name_temp = removePrefix(json_item.name,'.*?\/')
          let item_size_temp = json_item.size
          let item_time_temp = json_item.time
          let item_name = removePrefix(item_name_temp, curPath.value + '\/')
          if(item_name.endsWith('/')){
            folders.value.push({
              name: replaceSuffix(item_name),
              size: calSize(item_size_temp),
              time: timePatternChange(item_time_temp),
              show: false,
            })
          }
          else {
            if(!item_name.endsWith("_#*#*dirMask")){
              fileNames.value.push({
                name: item_name,
                size: calSize(item_size_temp),
                time: timePatternChange(item_time_temp),
                show: false,
              })
            }
          }
        }
      }else {
        ElMessage({
          message: '获取文件列表失败！',
          type: 'error',
        });
      }
    })
    .catch(error => console.error('Error:', error));
}


// 刚进入页面时获取文件列表
getFileList()

</script>
<style scoped>


/deep/ .custom-upload{
  width: 100%;
}
/deep/ .custom-upload .el-upload-dragger{
  width: 100%;
  height: 90vh;
  align-content: center;
}

tr{
  width: 70vw;
}

ul {
  list-style-type: none; /* 移除列表的标记，可选 */
  margin: 0; /* 移除默认的列表内边距，可选 */
  padding: 0; /* 移除默认的列表内边距，可选 */
}
</style>