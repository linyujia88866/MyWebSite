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
        >移动到此</el-button
        >
      </span>
    </template>
  </el-dialog>
  <Repeat ref="repeatFiledDialog"   @closeEvent="handleCloseSameFileDialog" @close="handleCloseSameFileDialog"></Repeat>
</template>

<script setup>
import {defineProps, nextTick, ref} from 'vue'
import {
  calSize, findObject,
  getParentDirectory,
  hasElementWithName,
  removePrefix,
  replaceSuffix,
  timePatternChange, transToDirPath
} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";
import Repeat from "@/Core/RepeatWhenCopy.vue";


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
let repeatFiledDialog=ref()
let sameFilesToUpload=ref([])

const dialogTableVisible = ref(false)
async function handleCloseSameFileDialog() {
  repeatFiledDialog.value.changeVisibleStatus()     //关闭窗口
  dialogTableVisible.value = false
  clearFiles()
  emit('updateValue', "")
}

function clearFiles(){
  sameFilesToUpload.value = []
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
function changeVisibleStatus(curDir, filename) {
  dialogTableVisible.value = true
  originPath.value = curDir
  operationFileName.value = filename
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
  if(hasElementWithName(fileNames.value, operationFileName.value)){
    sameFilesToUpload.value.push(findObject(fileNames.value, operationFileName.value))
  }
  if(sameFilesToUpload.value.length >0){
    repeatFiledDialog.value.openDialog()
    repeatFiledDialog.value.transData(sameFilesToUpload.value, curPath.value, fileNames.value, originPath.value)
    return
  }
  copyObject()
}

function copyObject(){
  openLoadingDialog('正在复制文件...')
  let url = "/minio/copyObject"
  const formData = new FormData();
  formData.append('srcpath', transToDirPath(originPath.value) + operationFileName.value);
  formData.append('despath', transToDirPath(curPath.value) + operationFileName.value);
  myHttp.post(url, formData, {
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
      }})
      .catch(error => {
        ElMessage({
          message: '复制文件失败！',
          type: 'error',
        });
      });
      closeLoading()
}
async function getFileList() {
  openLoadingDialog('正在加载文件夹目录信息...')
  let url = "/minio/listObjectsInDir/test"
  await myHttp.post(url, {prefix: curPath.value + '/'}, {
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
            let item_name_temp = removePrefix(json_item.name, '.*?\/')
            let item_size_temp = json_item.size
            let item_time_temp = json_item.time
            let item_name = removePrefix(item_name_temp, curPath.value + '\/')
            if (item_name.endsWith('/')) {
              folders.value.push({
                name: replaceSuffix(item_name),
                size: calSize(item_size_temp),
                time: timePatternChange(item_time_temp),
                show: false,
              })
            } else {
              if (!item_name.endsWith("_#*#*dirMask")) {
                fileNames.value.push({
                  name: item_name,
                  size: calSize(item_size_temp),
                  time: timePatternChange(item_time_temp),
                  show: false,
                })
              }
            }
          }
        } else {
          ElMessage({
            message: '获取文件列表失败！',
            type: 'error',
          });
        }
      })
      .catch(error => console.error('Error:', error));
  closeLoading()
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
