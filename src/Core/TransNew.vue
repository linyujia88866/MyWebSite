<template>
  <div @click="reset" style="height: 90vh; display: flex;">
    <div>
      <div style="margin-bottom: 0; padding-bottom: 0; ">
        <div  style=" margin: 0 0 0;padding: 0;display: flex; align-items: center">
          <div style="margin-left: 12px; margin-right: 12px; padding: 0;" v-if="!batchOperationStatus">
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
              <el-button size="default" type="primary">点击上传<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
            </el-upload>
          </div>
          <el-button v-if="!batchOperationStatus" type="primary" size="default" @click.stop="makeDir">新建文件夹</el-button>
          <el-button v-if="batchOperationStatus"
                     style="margin-left: 12px"
                     type="primary" size="default"
                     @click.stop="batchDownload">下载</el-button>
          <el-button v-if="batchOperationStatus" type="primary" size="default" @click.stop="batchDelete">删除</el-button>
          <el-button v-if="batchOperationStatus" type="primary" size="default" @click.stop="batchCopy">复制</el-button>
          <el-button v-if="batchOperationStatus" type="primary" size="default" @click.stop="batchMove">移动</el-button>
          <div class="demo-progress">
            <p style=" margin-left: 12px;">已使用空间：</p>
            <el-progress :percentage=sizeUsedRatio >
              <span><p>{{sizeUsed}} MB / {{sizeAll}} MB </p></span>
            </el-progress>
          </div>
          <el-button style="margin-left: 8px" type="success" size="small" @click.stop="resize">扩容</el-button>
        </div>
      </div>
      <!--      =====================================================================================================================================================-->

      <div style="display: flex; margin-left: 12px; margin-top: 12px; margin-bottom: 12px; ">
        <button v-if="curPath !== ''"
                style="margin-right: 8px; display: flex;" @click="gotoParentPath">
          <p style="margin: 0; padding: 0">↑</p>
          <p style="margin: 0; padding: 0">返回上一层</p>
        </button>
        <p style="margin: 0; padding: 0; ">当前文件夹路径:</p>
        <p style="margin: 0; padding: 0;font-weight: bold; vertical-align: bottom; text-decoration-line: underline; ">/全部文件/</p>
        <p style="margin: 0; padding: 0; font-weight: bold; vertical-align: bottom; text-decoration-line: underline;">{{curPath}}</p>
      </div>
      <!--      =====================================================================================================================================================-->
      <FileInfoData
          @cur-path-change="updateCurPath"
          @copy-file="copyTheFile"
          @view-file="showTheFile"
          @move-file="moveTheFile"
          @rename-file="renameFile"
          @selection-change="handleSelectionChange"
          style="width: 1200px; " ref="table"></FileInfoData>
    </div>
    <!--    上面这个高度值要注意，要和el-table那边的设置一致，否则会出现末尾行遮挡现象-->
    <!--      =====================================================================================================================================================-->
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
    <!--      =====================================================================================================================================================-->
  </div>
  <MoveFile   @update-value="getFileList" ref="moveFile"></MoveFile>
  <CopyFile  @update-value="getFileList" ref="copyFile"></CopyFile>
  <Expansion ref="expansionDialog"></Expansion>
  <MakingDir ref="makingDir" @confirm="getFileList"></MakingDir>
  <ViewPhotoes ref="viewPhotos"></ViewPhotoes>
  <Repeat ref="repeatFiledDialog"   @closeEvent="handleCloseSameFileDialog" @close="handleCloseSameFileDialog"></Repeat>
  <RenameFile ref="renameFileDialog" @confirm="confirmRename"></RenameFile>
    <div class="status-bar">
      免责声明：
      1、本站属于开源免费，不会对您的文件安全提供保障，如发生文件丢失或被窃取，后果自负。
      2、如您将商业机密文件上传到此，本站不承担任何法律责任。
      3、请不要上传非法内容，一经发现，封号处理。
    </div>
</template>

<script setup>
import {nextTick, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getExtension, getParentDirectory} from "@/utils/stringutils";
import MoveFile from "@/Core/MoveFile.vue";
import CopyFile from "@/Core/CopyFile.vue";
import FileInfoData from "@/Core/FileInfoData.vue";
import {Upload} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import Repeat from "@/Core/Repeat.vue";
import RenameFile from "@/Core/RenameFile.vue";
import MakingDir from "@/Core/MakingDir.vue";
import {showTheFileApi} from "@/utils/viewFile";
import {downloadFileApi, getSizeLeftApi, uploadFileApi} from "@/utils/fileApi";
import ViewPhotoes from "@/Core/ViewPhotoes.vue";
import Expansion from "@/Core/Expansion.vue";

const router = useRouter();           // 理由处理
const topLine = ref('-')
let sizeLeftRatio = ref(0)
let sizeUsedRatio = ref(0)
let sizeUsed = ref(0)
let sizeLeft = ref(0)
let sizeAll = ref(0)
topLine.value = topLine.value.repeat(200)   // 用于显示一条横线
let curPath = ref('')     // 当前文件路径
const upload_drag = ref(null)       // 右边的上传文件拖动区对象
const table = ref(null)       // 右边的上传文件拖动区对象
const upload_top = ref(null)   // 顶部的上传文件操作区对象
const renameFileDialog = ref(null)   // 顶部的上传文件操作区对象
const moveFile = ref(null);    // 移动文件夹弹窗对象
const copyFile = ref(null);    // 移动文件夹弹窗对象
const expansionDialog = ref(null);    // 移动文件夹弹窗对象
const repeatFiledDialog = ref(null);    // 移动文件夹弹窗对象
const files = ref([]);       // 上传文件时提示
const folders = ref([]);     // 当前页面的文件夹名称列表
const fileObject = ref(null)   // 正在上传或处理的文件对象
const fileNames = ref([]);    // 当前页面的文件名列表
let batchOperationStatus = ref(false)
let selectionFiles = ref([])
let makingDir=ref()   // 正在创建  文件夹
let viewPhotos=ref()   // 正在创建  文件夹
let loading = null;
let uploading = ref(false)
let fileNamesToUpload = ref([])
let filesToUpload = ref([])
let sameFilesToUpload = ref([])
// ==============================================================================================================
nextTick(()=>{
  getFileList()
})
// ==========================================
async function confirmRename(newName) {
  await getFileList()
}

function updateCurPath(res){
  [curPath.value, folders.value, fileNames.value] = [...res]
  getSizeLeft()
}

function handleSelectionChange(selections) {
  selectionFiles.value = selections
  batchOperationStatus.value = selections.length > 0;
}
function handleExceed(files, fileList) {
  ElNotification({
    title: '文件数量限制',
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
      uploadFile()
    }, 100);
  }
}

// 原本的挨个处理同名文件改成批量处理同名文件，所以这里有了方法2
async function uploadFile() {
  sameFilesToUpload.value = await uploadFileApi(fileNamesToUpload.value, filesToUpload.value, fileNames.value, curPath.value)
  table.value.updateTableData()
  if (sameFilesToUpload.value.length > 0) {
    repeatFiledDialog.value.openDialog()
    repeatFiledDialog.value.transData(sameFilesToUpload.value, curPath.value, fileNames.value)
  }
  clearFiles()
}

async function handleCloseSameFileDialog() {
  repeatFiledDialog.value.changeVisibleStatus()  //关闭窗口
  sameFilesToUpload.value = []
  fileNamesToUpload.value = []
  filesToUpload.value = []
  await getFileList()
  clearFiles()
}

// 创建文件夹
function makeDir() {
  makingDir.value.open(curPath.value, folders.value)
}

async function batchDownload() {
  for (let i = 0; i < selectionFiles.value.length; i++) {
    let file = selectionFiles.value[i]
    await downloadFileApi(file.name, file.type, curPath.value)
  }
}

async function batchDelete() {
  table.value.batchDelete(selectionFiles.value)
}

function batchCopy() {
  copyFile.value.openDialog(curPath.value, selectionFiles.value)
}

function openExpansion(){
  expansionDialog.value.openDialog()
}

function batchMove() {
  moveFile.value.openDialog(curPath.value, selectionFiles.value)
}

// 扩容
function resize(){
  ElMessageBox.alert('请发送邮件到 linyujia619@qq.com 申请扩容', '扩容方法', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确定',
    callback: (action) => {
      // ElMessage({
      //   type: 'info',
      //   message: `action: ${action}`,
      // })
    },
  })
  // openExpansion()
}

// 返回上一层
function gotoParentPath() {
  if(curPath.value === ''){
    return
  } else {
    curPath.value = getParentDirectory(curPath.value)
  }
  table.value.updateCurPath(curPath.value)
  table.value.updateTableData()
}
// 取消创建文件夹输入文件夹名称状态
function reset(){
  makingDir.value.close()
}
let supportPicFileSuffixList = ["png", "jpg", "gif"]
async function showTheFile(filename) {
  if(supportPicFileSuffixList.includes(getExtension(filename))){
    viewPhotos.value.open(filename, curPath.value)
  } else {
    await showTheFileApi(filename, curPath.value)
  }
}

function moveTheFile(filename) {
  moveFile.value.changeVisibleStatus(curPath.value, filename)
}

function renameFile(name){
  renameFileDialog.value.open(name, curPath.value)
}

function copyTheFile(fileObj) {
  copyFile.value.changeVisibleStatus(curPath.value, fileObj)
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
async function getFileList() {
  await table.value.updateTableData()
}
async function getSizeLeft() {
  let res = await getSizeLeftApi()
  sizeLeftRatio.value = res.left / res.all * 100
  sizeUsedRatio.value = res.used / res.all * 100
  sizeAll.value = res.all / (1024 *1024)
  sizeAll.value = Math.round(sizeAll.value * 1000) / 1000;
  sizeLeft.value = res.left / (1024 *1024)
  sizeLeft.value = Math.round(sizeLeft.value * 1000) / 1000;
  sizeUsed.value = res.used / (1024 *1024)
  sizeUsed.value = Math.round(sizeUsed.value * 1000) / 1000;
}
</script>
<style scoped>
/deep/ .custom-upload{
  width: 100%;
}
/deep/ .custom-upload .el-upload-dragger{
  width: auto;
  height: 82vh;
  align-content: center;
}

ul {
  list-style-type: none; /* 移除列表的标记，可选 */
  margin: 0; /* 移除默认的列表内边距，可选 */
  padding: 0; /* 移除默认的列表内边距，可选 */
}

/deep/ .custom-input .el-input__inner {
  color: #42b983; /* 修改为需要的颜色 */
}
.demo-progress{
  display: flex;
  align-items: center;
}
.demo-progress .el-progress--line {
  width: 500px;
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
</style>