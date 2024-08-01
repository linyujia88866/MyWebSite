<template>
  <el-table
      :data="tableData"
      :highlight-current-row="true"
      max-height="700px"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
      style="width: 100%" :default-sort="{ prop: 'type', order: 'descending' }">
    <el-table-column type="selection" width="30" />
    <el-table-column v-if="false"
        property="type"
        label="文件名"
        sortable  >
    </el-table-column>
    <el-table-column
        property="name"
        label="文件名"
        width="700px"
        sortable  >
      <template #default="scope">
        <div class="filenametd">
          <img :src="getMapBg(scope.row.type)" alt="图标文件夹" style="margin-right: 12px; height: 20px; width: 20px;">
          <el-tooltip
              effect="dark"
              :content="scope.row.name"
              placement="top"
              :show-after="500"
          >
            <h3 style="width: 300px;
                         cursor: pointer;
                         text-align: left;"
                @click.stop="handleClick(scope.row)"
                @dblclick="handleDbClick(scope.row)"
            >{{ scope.row.shortenName }}</h3>
          </el-tooltip>
          <el-tooltip
              effect="dark"
              content="复制"
              placement="top"

              :show-after="500"
          >
            <el-button   circle
                         @click.stop="copyFile(scope.row.name)"
                         v-if="scope.row.show"
                         style="margin: 0 0 0 8px;"
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
            <el-button   circle
                         v-if="scope.row.show"
                       style="margin: 0 0 0 8px;"
                       @click.stop="moveTheFile(scope.row.name)"
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
            <el-button  circle
                        v-if="scope.row.show"
                       style="margin: 0 0 0 8px;"
                       @click.stop="renameFile(scope.row.name)"
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
            <el-button  circle
                        v-if="scope.row.show"
                       style="margin: 0 0 0 8px;"
                       @click.stop="showTheFile(scope.row.name)"
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
            <el-button   circle
                         v-if="scope.row.show"
                       style="margin: 0 0 0 8px;"
                       @click.stop="downloadFile(scope.row.name, scope.row.type)"
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
            <el-button   circle
                         v-if="scope.row.show"
                       style="margin: 0 8px 0 8px;"
                       @click.stop="deleteFile(scope.row)"
                       type="danger"
                       size="small"
                       :icon="Delete" ></el-button>
          </el-tooltip>
        </div>
      </template>

    </el-table-column>
    <el-table-column
        property="type"
        sortable
        width="150px"
        label="文件类型"
    >
      <template #default="scope">{{ scope.row.type }}</template>
    </el-table-column>
    <el-table-column
        property="realSize"
        sortable
        label="大小"
        width="100px"
    >
      <template #default="scope">{{ scope.row.size }}</template>
    </el-table-column>

    <el-table-column
        label="修改时间" sortable >

      <template #default="scope">{{ scope.row.time }}</template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {ElMessageBox, ElTable} from 'element-plus'
import {deleteFileApi, deleteFolderApi, downloadFileApi, getFileListApi} from "@/utils/fileApi";
import {ref} from "vue";
import {CopyDocument, Delete, DocumentRemove, Download, Edit, View} from "@element-plus/icons-vue";
import fl from "@/assets/wenjian.jpg";
import fd from "@/assets/wenjianjia.png";

const emit = defineEmits(['moveFile', 'renameFile', 'viewFile', 'copyFile', 'curPathChange'])

function getMapBg(markNumber) {
  let bgObj = {
    folder: fd,
    file: fl,
  };
  return bgObj[markNumber];
}

function moveTheFile(fileName){
  emit('moveFile', fileName)
  console.log('移动文件夹')
}

function copyFile(fileName){
  emit('copyFile', fileName)
  console.log('复制文件夹')
}

function renameFile(fileName){
  emit('renameFile', fileName)
  console.log('重命名文件夹')
}

function showTheFile(fileName) {
  emit('viewFile', fileName)
  console.log('预览文件')
}

function deleteFile(row){
  ElMessageBox.confirm(
      row.type === 'file'? '确认是否删除文件?':'确认是否删除文件夹?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        let res
        if(row.type === 'file'){
          res = await deleteFileApi(row.name, curPath.value)
        } else {
          res = await deleteFolderApi(row.name, curPath.value)
        }
        if (res === 'success') {
          let a
          let b
          [tableData.value, a, b] = await getFileListApi(curPath.value + '/', [])
        }
      })
      .catch(() => {
        return false
      })
}


let curPath = ref('')
let tableData = ref([])
let highlight = ref(true)
getFileListApi(curPath.value + '/', tableData.value)
function handleClick(row){
  if(row.type==='folder'){
    goIntoDir(row.name)
  }
}

function handleDbClick(row) {
  if(row.type==='file'){
    showTheFile(row.name)
  }
}

async function downloadFile(fileName, fileType) {
  await downloadFileApi(fileName, fileType, curPath.value)
}

async function goIntoDir(dir) {
  if (curPath.value === '') {
    curPath.value = dir
  } else {
    curPath.value = curPath.value + '/' + dir
  }
  emit('curPathChange', curPath.value)
  await updateTableData()
}

async function updateTableData() {
  let a
  let b
  [tableData.value, a, b] = await getFileListApi(curPath.value + '/', [])
}

async function updateCurPath(newPath) {
  curPath.value = newPath
}

function  handleMouseEnter(row, column, cell, event) {
  // 保存悬停的行
  row.show = true;
}
function handleMouseLeave(row, column, cell, event) {
  // 清除悬停行的样式
  row.show = false
}

defineExpose({
  updateTableData,
  updateCurPath
})
</script>

<style>
.filenametd{
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0; margin: 0;
  width: 700px;
  height: 32px;
}

/deep/ .el-table__body tr.current-row > td {
  background-color: #f5f5f6 !important;
}



</style>