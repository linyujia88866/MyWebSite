<template>
  <el-dialog v-model="dialogTableVisible" title="复制到">
    <div style="display: flex; margin-left: 12px; margin-top: 12px;
    margin-bottom: 12px;  ">
      <button v-if="curPath !== ''"
              style="margin-right: 8px; display: flex;" @click="changePath">
        <p style="margin: 0; padding: 0">↑</p>
        <p style="margin: 0; padding: 0">返回上一层</p>
      </button>
      <p style="margin: 0; padding: 0; ">当前文件夹路径:</p>
      <p style="margin: 0; padding: 0;font-weight: bold;  text-decoration-line: underline; ">/全部文件/</p>
      <p style="margin: 0; padding: 0; font-weight: bold;  text-decoration-line: underline;">{{curPath}}</p>
    </div>
    <div style="min-height: 400px;">
      <div style="padding: 0; margin: 0 0 auto 12px;" v-for="folder in folders"
           @click="goIntoDir(folder.name)">
        <tr style="display: flex;
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
          </td>
          <td style="width: 200px; text-align: left;">
          </td>
          <td style="min-width: 200px;">
          </td>
        </tr>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"
        >复制到此</el-button
        >
      </span>
    </template>
  </el-dialog>
  <Repeat ref="repeatFiledDialog"   @closeEvent="handleCloseSameFileDialog" @close="handleCloseSameFileDialog"></Repeat>
  <RepeatDir ref="repeatDirDialog"   @closeEvent="handleCloseSameFileDialog" @close="handleCloseSameFileDialog"></RepeatDir>
</template>

<script setup>
import {defineProps, nextTick, ref} from 'vue'
import {
  findObject,
  getParentDirectory,
  hasElementWithName,
  transToDirPath
} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";
import Repeat from "@/Core/RepeatWhenCopy.vue";
import RepeatDir from "@/Core/RepeatWhenCopyDir.vue";
import {getFileListApi} from "@/utils/fileApi";


const props = defineProps({
  curDir: {
    type: String,
    default: "",
  }
});
const emit = defineEmits(['updateValue'])

let curPath = ref('')
let originPath = ref('')
let operationFileName = ref('')
let operationFileType = ref('file')
let repeatFiledDialog=ref()
let repeatDirDialog=ref()
let sameFilesToCopy=ref([])
let sameFoldersToCopy=ref([])

const dialogTableVisible = ref(false)
async function handleCloseSameFileDialog() {
  repeatFiledDialog.value.changeVisibleStatus()     //关闭窗口
  repeatDirDialog.value.changeVisibleStatus()     //关闭窗口
  dialogTableVisible.value = false
  clearFiles()
  emit('updateValue', "")
}

function clearFiles(){
  sameFilesToCopy.value = []
}
// 进入文件夹
async function goIntoDir(dir) {
  if (curPath.value === '') {
    curPath.value = dir
  } else {
    curPath.value = curPath.value + '/' + dir
  }
  await getFileList()
}

// 打开窗口
function changeVisibleStatus(curDir, fileObject) {
  dialogTableVisible.value = true
  originPath.value = curDir
  operationFileName.value = fileObject.name
  operationFileType.value = fileObject.type
  curPath.value = ""
  nextTick(async () => {
    await getFileList()
  })
}

async function changePath() {
  if (curPath.value === '') {
    return
  } else {
    curPath.value = getParentDirectory(curPath.value)
  }
  await getFileList()
}
const folders = ref([]);
const fileNames = ref([]);

function  handleConfirm(){
  if(operationFileType.value === 'file'){
    if(hasElementWithName(folders.value, operationFileName.value)){
      sameFilesToCopy.value.push(findObject(fileNames.value, operationFileName.value))
    }
  }else {
    if(hasElementWithName(folders.value, operationFileName.value)){
      sameFoldersToCopy.value.push(findObject(folders.value, operationFileName.value))
    }
  }
  if(sameFilesToCopy.value.length >0){
    repeatFiledDialog.value.openDialog()
    repeatFiledDialog.value.transData(sameFilesToCopy.value, curPath.value, fileNames.value, originPath.value)
    return
  }
  if(sameFoldersToCopy.value.length >0){
    repeatDirDialog.value.openDialog()
    repeatDirDialog.value.transData(sameFoldersToCopy.value, curPath.value, folders.value, originPath.value)
    return
  }
  copyObject()
}

async function copyObject() {
  openLoadingDialog('正在复制文件...')
  let url
  if (operationFileType.value === 'file') {
    url = "/minio/copyObject"
  } else {
    url = "/minio/copyDir"
  }

  const formData = new FormData();
  formData.append('srcpath', transToDirPath(originPath.value) + operationFileName.value);
  formData.append('despath', transToDirPath(curPath.value) + operationFileName.value);
  await myHttp.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
      .then(response => {
        if (response.status === 200) {

          ElMessage({
            message: '复制文件成功！',
            type: 'success',
          });
          dialogTableVisible.value = false
          emit('updateValue', "")
        }
      })
      .catch(error => {
        ElMessage({
          message: '复制文件失败！',
          type: 'error',
        });
      });
  closeLoading()
}
async function getFileList() {
  let a
  [a, folders.value, fileNames.value] = await getFileListApi(curPath.value + '/', [],[],[])
}

defineExpose({
  changeVisibleStatus
})

</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>
