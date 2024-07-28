<template>
  <el-dialog v-model="dialogTableVisible" title="发现同名文件" width="800" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-table ref="multipleTableRef"
              @selection-change="handleSelectionChange"
              :data="fileObjects">
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="Name"  />
      <el-table-column property="size" label="Size" width="200" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
<!--        <el-button @click="toggleSelection([])">Clear selection</el-button>-->
        <el-button type="primary" @click="handleConfirm">取消上传</el-button>
        <el-button type="primary" @click="handleConfirm">增加编号</el-button>
        <el-button type="primary" @click="handleConfirm">覆盖上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineProps, nextTick, reactive, ref} from 'vue'
import {calSize, getParentDirectory, removePrefix, replaceSuffix, timePatternChange} from "@/utils/stringutils";
import {myHttp} from "@/request/myrequest";
import {ElLoading, ElMessage} from "element-plus";



let fileObjects = ref([])
const emit = defineEmits(['close-event'])
const multipleTableRef = ref()
const multipleSelection = ref([])
// const toggleSelection = (rows) => {
//   if (rows.length>0) {
//     rows.forEach((row) => {
//       multipleTableRef.value.toggleRowSelection(row, undefined)
//     })
//   } else {
//     multipleTableRef.value.clearSelection()
//   }
// }
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const dialogTableVisible = ref(false)

function changeVisibleStatus() {

  dialogTableVisible.value = !dialogTableVisible.value
}

function transData(files) {
  multipleSelection.value = []
  fileObjects.value = files
}


function  handleConfirm(){
  console.log(multipleSelection.value)
  filterFiles()
  if(fileObjects.value.length === 0){
    emit("close-event", "")
  }

}

function filterFiles() {
  let uniqueNames = new Set(multipleSelection.value.map(item => item.name));
  fileObjects.value = fileObjects.value.filter(item => !uniqueNames.has(item.name));
  multipleSelection.value = []
}

function handleCancel() {
  if(multipleSelection.value.length === 0){
    emit("close-event", "")
  }
}

let loading = null;
const openFullScreen2 = (text) => {
  if(text === undefined){
    text = '正在复制文件...'
  }
  loading = ElLoading.service({
    lock: true,
    text: text,
    background: 'rgba(0, 0, 0, 0.7)',
    overlay: true
  })
}


defineExpose({
  changeVisibleStatus,
  transData
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
