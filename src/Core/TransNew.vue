<template>
  <navigate-one ref="childRef" :origin-tab="'功能'" style="z-index: 100;"></navigate-one>
  <div @click="reset" style="height: 98vh; display: flex; ">
    <div>
      <div style="margin-bottom: 0; padding-bottom: 0; ">

        <div  style=" margin: 12px 0 0;padding: 0;display: flex">
          <div style="margin-left: 12px; margin-right: 12px; padding: 0;">
            <el-upload
                @click="clearFiles"
                action=""
                ref="upload_top"
                multiple
                :limit="10"
                :auto-upload="false"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :show-file-list="false"
                >
              <el-button size="large" type="primary">点击上传<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
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

<!--      ==========================================================================================================================================-->
      <div v-if="makingDir"
           style="display: flex; align-items: center; align-content: center; padding: 0; margin: 0 0 0 12px;height: 32px;">
        <img src="@/assets/wenjianjia.png" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
        <input v-model="dirName" @click.stop>
        <button style="margin-left: 12px;" @click.stop="createDir">确定</button>
        <button style="margin-left: 12px;" @click.stop="cancelMakeDir">取消</button>
      </div>
<!--      =====================================================================================================================================================-->
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
            width: 400px;
            height: 32px;">
            <h3>文件名</h3>
          </td>
          <td style="display: flex;align-items: center;
            align-content: center;
            padding: 0;
            width: 300px;
            height: 32px;">
            <h3 style="color: #42b983;margin-left: auto; " v-if="showHead">文件操作</h3>
          </td>
          <td style="width: 200px; text-align: left">
            <h3 style="color: #42b983;
            /*text-align: center;*/
            align-content: center;
            padding: 0;
            height: 32px;
           margin: 0 0 0 20px;">大小</h3>
          </td>
          <td style="width: 200px;text-align: left">
            <h3 style=" color: #42b983;
            /*text-align: center;*/
            align-content: center;
            padding: 0;
            height: 32px;
           margin: 0 0 0 20px;">修改时间</h3>
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

              <h3
                  style="width: 400px;
                         cursor: pointer;
                         text-align: left;"
              >{{ folder.name }}</h3>
              <el-tooltip
                  effect="dark"
                  content="下载"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="folder.show"
                           style="margin: 0 0 0 auto;"
                           @click.stop="downloadFile(folder.name, 'folder')"
                           type="warning"
                           size="small"
                           circle
                           :icon="Download" ></el-button>
              </el-tooltip>
              <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="folder.show"  circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="deleteFolder(folder.name)"
                           type="danger"
                           size="small"
                           :icon="Delete" ></el-button>
              </el-tooltip>
            </td>
            <td style="width: 200px; text-align: left;">
              <h3 style=" color: #42b983;
                /*text-align: center;*/
                align-content: center;
                padding: 0;
                height: 32px;
                margin: 0 0 0 20px;">-</h3>
            </td>
            <td style="min-width: 200px;">
              <h3 style=" color: #42b983;
                text-align: left;
                padding: 2px;
                height: 32px;
                margin: 0 0 0 20px;">-</h3>
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
              line-height: 32px;">
            <td
                class="myTr"
                style="display: flex;align-items: center;
                align-content: center;
                padding: 0; margin: 0;
                width: 700px;
                height: 32px;">
              <img src="@/assets/wenjian.jpg" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
              <h3 style="width: 400px;
                         cursor: pointer;
                         text-align: left;"
                  @dblclick="showTheFile(fileName.name)">{{ getFirstAndLastChars(fileName.name) }}</h3>
              <el-tooltip
                  effect="dark"
                  content="复制"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 0 0 auto;"
                           @click.stop="copyTheFile(fileName.name)"
                           type="primary"
                           size="small"
                           :icon="CopyDocument"></el-button>
              </el-tooltip>

              <el-tooltip
                  effect="dark"
                  content="移动"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="moveTheFile(fileName.name)"
                           type="primary"
                           size="small"
                           :icon="DocumentRemove" ></el-button>
              </el-tooltip>
              <el-tooltip
                  effect="dark"
                  content="重命名"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="renameFile(fileName.name)"
                           type="primary"
                           size="small"
                           :icon="Edit" ></el-button>
              </el-tooltip>
              <el-tooltip
                  effect="dark"
                  content="预览"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="showTheFile(fileName.name)"
                           type="success"
                           size="small"
                           :icon="View" ></el-button>
              </el-tooltip>
              <el-tooltip
                  effect="dark"
                  content="下载"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 0 0 8px;"
                           @click.stop="downloadFile(fileName.name, 'fileName')"
                           type="warning"
                           size="small"
                           :icon="Download" ></el-button>
              </el-tooltip>
              <el-tooltip
                  effect="dark"
                  content="删除"
                  placement="top"
                  :show-after="500"
              >
                <el-button v-if="fileName.show"  circle
                           style="margin: 0 8px 0 8px;"
                           @click.stop="deleteFile(fileName.name)"
                           type="danger"
                           size="small"
                           :icon="Delete" ></el-button>
              </el-tooltip>
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

    <div
        style="display: flex;
                width: 100%;
                margin: 12px 8px 8px;
                align-content: center;
                align-items: center">
      <el-upload
          class="custom-upload"
          ref="upload_drag"
          :append-to-body="false"
          multiple
          :limit="10"
          :auto-upload="false"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :show-file-list="false"
          drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">文件大小不要超过40m</div>
      </el-upload>
    </div>
  </div>
<MoveFile :cur-dir="curPath.value"  @update-value="getFileList"
          ref="moveFile"></MoveFile>

  <CopyFile :cur-dir="curPath.value"  @update-value="getFileList"
            ref="copyFile"></CopyFile>

  <!-- 图片预览 -->
  <el-image-viewer
      v-if="showImagePreview"
      :zoom-rate="1.2"
      @close="closePreview"
      :url-list="imgPreviewList"
  />

  <Repeat ref="repeatFiledDialog"   @closeEvent="handleCloseSameFileDialog" @close="handleCloseSameFileDialog"></Repeat>
  <RenameFile ref="renameFileDialog" @confirm="confirmRename"></RenameFile>
<!--  <div class="status-bar">-->
<!--    注意：预览文件目前只支持docx、pdf和图片格式，预览文件时会将docx转换为pdf格式！！！-->
<!--  </div>-->
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {myHttp} from "@/request/myrequest";
import { ElMessage } from 'element-plus';
import {
  getFirstAndLastChars,
  getParentDirectory,
} from "@/utils/stringutils";
import MoveFile from "@/Core/MoveFile.vue";
import CopyFile from "@/Core/CopyFile.vue";
import { ElLoading } from 'element-plus'
import {
  Delete,
  Edit,
  CopyDocument,
  DocumentRemove,
  View,
  Upload,
  Download,
} from '@element-plus/icons-vue'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import Repeat from "@/Core/Repeat.vue";
import RenameFile from "@/Core/RenameFile.vue";
import NavigateOne from "@/components/Common/NavigateOne.vue";
import {showTheFileApi} from "@/utils/viewFile";
import {
  createDirApi,
  deleteFileApi,
  deleteFolderApi,
  downloadFileApi,
  getFileListApi,
  uploadFileApi
} from "@/utils/fileApi";

// ==============================================================================================================

let showHead = ref(false)           // 文件操作表头显示开关
// docx作为参数通过父组件传参
let imgPreviewList = ref([])           //预览图片列表
const showImagePreview = ref(false)    //预览图片开关
const router = useRouter();           // 理由处理
const topLine = ref('-')
topLine.value = topLine.value.repeat(200)   // 用于显示一条横线
let curPath = ref('')     // 当前文件路径
const upload_drag = ref(null)       // 右边的上传文件拖动区对象
const upload_top = ref(null)   // 顶部的上传文件操作区对象
const renameFileDialog = ref(null)   // 顶部的上传文件操作区对象
const moveFile = ref(null);    // 移动文件夹弹窗对象
const copyFile = ref(null);    // 移动文件夹弹窗对象
const repeatFiledDialog = ref(null);    // 移动文件夹弹窗对象
const files = ref([]);       // 上传文件时提示
const folders = ref([]);     // 当前页面的文件夹名称列表
const fileObject = ref(null)   // 正在上传或处理的文件对象
const fileNames = ref([]);    // 当前页面的文件名列表
let dirName = ref('')      // 新建文件夹名称
let makingDir=ref(false)   // 正在创建  文件夹
let progressVisible = ref(false)    //显示进度条
let progressPercent = ref(0)         // 进度条百分比
let loading = null;
let uploading = ref(false)
let fileNamesToUpload = ref([])
let filesToUpload = ref([])
let sameFilesToUpload = ref([])
// ==============================================================================================================

// ==========================================
const openLoadingDialog = (text) => {
  if(loading === null){
    if(text === undefined){
      text = '正在上传文件...'
    }
    loading = ElLoading.service({
      lock: true,
      text: text,
      background: 'rgba(0, 0, 0, 0.7)',
    })
  } else {
    loading.setText(text)
  }
}

function confirmRename(newName){
  getFileList()
}

function handleExceed(files, fileList) {
  ElNotification({
    title: '文件数量限制',
    // message: `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
    message: `最多同时只能上传 10 个文件，本次选择了 ${files.length + fileList.length} 个文件`,
    duration: 10000,
    type: 'warning',
  })
}

function handleChange(file, fileList) {
// 文件状态变化时的处理逻辑
  fileNamesToUpload.value.push(file.name)
  filesToUpload.value.push(file.raw)
  if(!uploading.value){
    uploading.value = true
    setTimeout(function() {
      customUpload2()

    }, 100);
  }
}

// 原本的挨个处理同名文件改成批量处理同名文件，所以这里有了方法2
async function customUpload2() {
  sameFilesToUpload.value = await uploadFileApi(fileNamesToUpload.value, filesToUpload.value, fileNames.value, curPath.value)
  await getFileList()
  if (sameFilesToUpload.value.length > 0) {
    repeatFiledDialog.value.openDialog()
    repeatFiledDialog.value.transData(sameFilesToUpload.value, curPath.value, fileNames.value)
  }
  clearFiles()
}

function handleCloseSameFileDialog(){
  repeatFiledDialog.value.changeVisibleStatus()
  sameFilesToUpload.value = []
  fileNamesToUpload.value = []
  filesToUpload.value = []
  getFileList()
  clearFiles()
}

const closePreview = () => {
  imgPreviewList.value = []
  showImagePreview.value = false
}


// 创建文件夹
function makeDir() {
  makingDir.value = true
  dirName.value = "新建文件夹"
}

// 文件鼠标移动上去触发事件
function handleFileHover(fileObject){
    fileObject.show = true
    fileObject.lineWidth = 1
  // showHead.value = true
}

// 文件鼠标失焦事件
function handleFileLeave(fileObject){
  fileObject.show = false
  fileObject.lineWidth = 0
  // showHead.value = false
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
  console.log(curPath.value)
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
async function showTheFile(filename) {
  let qrUrl= await showTheFileApi(filename, curPath.value)
  // if(filename.endsWith('.png') || filename.endsWith('.jpg')){
  //               showImagePreview.value = true
  //               imgPreviewList.value = [qrUrl]
  //             }
}

function moveTheFile(filename) {
  moveFile.value.changeVisibleStatus(curPath.value, filename)
}

function renameFile(name){
  renameFileDialog.value.open(name)
}


function copyTheFile(filename) {
  copyFile.value.changeVisibleStatus(curPath.value, filename)
}

async function downloadFile(filename, type) {
  await downloadFileApi(filename, type, curPath.value)
}

async function deleteFile(filename) {

  ElMessageBox.confirm(
      '确认是否删除文件?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        doDeleteFile(filename)
      })
      .catch(() => {
        return false
      })
}

async function doDeleteFile(filename) {
  let res  = await deleteFileApi(filename, curPath.value)
  console.log(res)
  if(res === 'success'){
    await getFileList()
  }
}

async function deleteFolder(dirName) {
  ElMessageBox.confirm(
      '确认是否删除文件夹?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        doDeleteFolder(dirName)
      })
      .catch(() => {
        return false
      })
}

// 删除文件夹
async function doDeleteFolder(dirName) {
  let res = await deleteFolderApi(dirName, curPath.value)
  if(res === "success"){
    await getFileList()
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
      let res = await createDirApi(curPath.value, dirName.value)
      if(res === 'success'){
        makingDir.value = false
        dirName.value = ""
        await getFileList()
      }
    }

function clearFiles(){
  fileObject.value=null
  upload_drag.value.clearFiles()
  upload_top.value.clearFiles()
  uploading.value = false
  fileNamesToUpload.value = []
  sameFilesToUpload.value = []
  filesToUpload.value = []
}
// 使用计算属性
const hasName = (target) => {
  return fileNames.value.some(item => item.name === target);
};

async function getFileList() {
  let [_, a, b] = await getFileListApi(curPath.value + '/', undefined, [], [])
  folders.value = a
  fileNames.value = b
}


// 刚进入页面时获取文件列表
onMounted(()=>{
  nextTick(()=>{
    getFileList()
  })
})

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

.status-bar {
  position: fixed;      /* 固定位置 */
  left: 0;              /* 左边距为0 */
  bottom: 0;            /* 底部边距为0 */
  width: 100%;          /* 宽度为100% */
  height: 40px;         /* 高度设置为你需要的值 */
  background-color: #333; /* 背景颜色 */
  color: white;         /* 文字颜色 */
  /* 其他样式 */
}



/* 设置基本样式 */
.myTr {
}

/* 设置悬停时的阴影效果 */
.myTr:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 阴影大小、模糊度、扩散距离和颜色 */
}

/deep/ .custom-input .el-input__inner {
  color: #42b983; /* 修改为需要的颜色 */
}
</style>