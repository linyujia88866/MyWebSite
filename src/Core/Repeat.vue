<template>
  <el-dialog v-model="dialogTableVisible" title="已存在同名文件" width="800" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-table ref="multipleTableRef"
              @selection-change="handleSelectionChange"
              :data="fileObjects">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="文件名"  />
      <el-table-column property="size" label="大小（字节）" width="200" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">取消上传</el-button>
        <el-button type="primary" @click="handleTogether">增加编号</el-button>
        <el-button type="primary" @click="handleCover">覆盖上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {
  genNewFileName,
} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElNotification} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";


let fileObjects = ref([])
let curPath = ref('')
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

function transData(files, path, allFiles) {
  multipleSelection.value = []
  fileObjects.value = files
  curPath.value = path
  allFileNames.value = allFiles
}
async function handleCover() {
  await uploadFile()
  filterFiles()
  if (fileObjects.value.length === 0) {
    emit("close-event", "")
  }
}

function  handleCancel(){
  filterFiles()
  if(fileObjects.value.length === 0){
    emit("close-event", "")
  }
}

async function handleTogether() {
  await uploadFileWithDiffName()
  filterFiles()
  if (fileObjects.value.length === 0) {
    emit("close-event", "")
  }
}

const uploadFile = async () => {
      for (let i = 0; i < multipleSelection.value.length; i++) {
        let file = multipleSelection.value[i]
        openLoadingDialog(`文件【${file.name}】正在努力上传中，请耐心等待。。。`)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filepath', curPath.value + '/');

        await myHttp.post("/minio/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {

        }).catch(() => {
          ElNotification({
            title: '错误',
            message: `文件【${file.name}】上传失败！`,
            duration: 10000,
            type: 'error',
          })
        });
      }
  closeLoading()
}

const uploadFileWithDiffName = async () => {
  for (let i = 0; i < multipleSelection.value.length; i++) {

    let file = multipleSelection.value[i]
    const formData = new FormData();
    formData.append('file', file);
    let newFileName = genNewFileName(file.name,allFileNames.value)
    openLoadingDialog(`文件【${newFileName}】正在努力上传中，请耐心等待。。。`)
    let renameReportFile =new File([file],newFileName,{type:file.type});
    formData.append("file",renameReportFile );
    formData.append("filename",newFileName );
    formData.append('filepath', curPath.value + '/');
    await myHttp.post("/minio/upload2", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
    }).catch(() => {
      ElNotification({
        title: '错误',
        message: `文件【${file.name}】上传失败！`,
        duration: 10000,
        type: 'error',
      })
    });
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
