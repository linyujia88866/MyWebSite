<template>
  <el-dialog v-model="dialogTableVisible" title="已存在同名文件" width="800" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-table ref="multipleTableRef"
              @selection-change="handleSelectionChange"
              :data="fileObjects">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="文件夹名称"  />
      <el-table-column property="type" label="类型" width="200" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">跳过文件</el-button>
        <el-button type="primary" @click="handleTogether">生成副本</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {
  genNewFolderName,
  transToDirPath,
} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";


let fileObjects = ref([])
let curPath = ref('')
let originPath = ref('')
let allFileNames = ref([])
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

function transData(files, path, allFiles, origin) {
  multipleSelection.value = []
  // 以下四个是传过来的数据
  fileObjects.value = files    // 要处理的重名文件
  curPath.value = path     // 复制的目标目录
  originPath.value = origin    // 复制的初始目录
  allFileNames.value = allFiles   // 目标目录下所有文件列表，用于计算新文件名
}

function  handleCancel(){
  if(multipleSelection.value.length === 0){
    ElMessage({
      message: `请选择要操作的文件！`,
      type: 'warning',
    });
    return
  }
  filterFiles()
  if(fileObjects.value.length === 0){
    emit("close-event", "")
  }
}

async function handleTogether() {
  if(multipleSelection.value.length === 0){
    ElMessage({
      message: `请选择要操作的文件！`,
      type: 'warning',
    });
    return
  }
  await moveFileWithDiffName()
  filterFiles()
  if (fileObjects.value.length === 0) {
    emit("close-event", "")
  }
}

async function moveObject(operationFileName, targetFileName) {
  let url = "/minio/moveDir"
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

const moveFileWithDiffName = async () => {
  openLoadingDialog(`正在复制文件...`)
  for (let i = 0; i < multipleSelection.value.length; i++) {
    await moveObject(multipleSelection.value[i].name, genNewFolderName(multipleSelection.value[i].name,allFileNames.value))
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
