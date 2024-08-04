<template>
  <el-dialog v-model="dialogTableVisible" title="已存在同名文件" width="800" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-table ref="multipleTableRef"
              @selection-change="handleSelectionChange"
              :data="fileObjects">

      <el-table-column property="name" label="文件名"  />
      <el-table-column property="type" label="类型" width="70" />
      <el-table-column
          :width="400"
          property="radio" label="处理方式">
        <template #default="scope">
          <el-radio-group v-model="scope.row.radio">
            <el-radio value="skip" size="large">跳过本组</el-radio>
            <el-radio value="copy" size="large">生成副本</el-radio>
            <el-radio value="cover" size="large" :disabled="scope.row.type === 'folder'">覆盖文件</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleTogether">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {
  genNewFileName,
  genNewFolderName,
  transToDirPath,
} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";


let fileObjects = ref([])
let folderObjects = ref([])
let curPath = ref('')
let originPath = ref('')
let allFileNames = ref([])
let allFolderNames = ref([])
const emit = defineEmits(['close-event'])
const multipleTableRef = ref()
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const dialogTableVisible = ref(false)

function changeVisibleStatus() {
  dialogTableVisible.value = false
}


function openDialog() {
  dialogTableVisible.value = true
}

function transData(files, folders, path, allFiles, allFolders, origin) {
  multipleSelection.value = []
  // 以下四个是传过来的数据
  fileObjects.value = files    // 要处理的重名文件
  folderObjects.value = folders    // 要处理的重名文件
  curPath.value = path     // 复制的目标目录
  originPath.value = origin    // 复制的初始目录
  allFileNames.value = allFiles   // 目标目录下所有文件列表，用于计算新文件名
  allFolderNames.value = allFolders   // 目标目录下所有文件列表，用于计算新文件名
}

function  handleCancel(){
  emit("close-event", "")
}

async function handleTogether() {
  await copyFileWithDiffName()
  emit("close-event", "")
}

async function copyObject(operationFileName, targetFileName, type) {
  let url = "/minio/copyObject"
  if(type === 'folder'){
    url = "/minio/copyDir"
  } else {
    url = "/minio/copyObject"
  }

  let target
  if(targetFileName!==undefined){
    target = targetFileName
  }else {
    target = operationFileName
  }
  const formData = new FormData();
  formData.append('srcpath', transToDirPath(originPath.value) + operationFileName);
  formData.append('despath', transToDirPath(curPath.value) + target);
  await myHttp.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      if (response.status === 200) {

      }
    })
    .catch(error => {
      ElMessage({
        message: `复制文件${operationFileName}失败！`,
        type: 'error',
      });
    });

}

const copyFileWithDiffName = async () => {
  openLoadingDialog(`正在复制文件...`)
  for (let i = 0; i < fileObjects.value.length; i++) {
    let row =  fileObjects.value[i]
    if(row.type === 'file'){
      if(row.radio === 'copy'){
        await copyObject(row.name, genNewFileName(row.name,allFileNames.value), 'file')
      } else if(row.radio === 'cover'){
        await copyObject(row.name, row.name, 'file')
      }
    } else {
      if(row.radio === 'copy'){
        await copyObject(row.name, genNewFolderName(row.name,allFolderNames.value), 'folder')
      }
    }
  }
  closeLoading()
}


function filterFiles() {
  let uniqueNames = new Set(multipleSelection.value.map(item => item.name));
  fileObjects.value = fileObjects.value.filter(item => !uniqueNames.has(item.name));
  multipleSelection.value = []
}


defineExpose({
  changeVisibleStatus,
  transData,
  openDialog
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
  //margin-right: 10px;
}

</style>
