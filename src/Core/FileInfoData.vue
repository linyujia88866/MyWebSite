<template>
  <el-table
      :data="tableData"
      :highlight-current-row="true"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
      style="width: 100%" :default-sort="{ prop: 'type', order: 'descending' }">
    <el-table-column type="selection" width="55" />
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
            >{{ scope.row.shortenName }}</h3>
          </el-tooltip>
          <el-tooltip
              effect="dark"
              content="复制"
              placement="top"
              :show-after="500"
          >
            <el-button   circle
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
                       @click.stop="deleteFile(scope.row.name)"
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
        label="文件类型"
    >
      <template #default="scope">{{ scope.row.type }}</template>
    </el-table-column>
    <el-table-column
        property="realSize"
        sortable
        label="大小"
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
import { ElTable } from 'element-plus'
import {downloadFileApi, getFileListApi} from "@/utils/fileApi";
import {ref} from "vue";
import {CopyDocument, Delete, DocumentRemove, Download, Edit, View} from "@element-plus/icons-vue";
import fl from "@/assets/wenjian.jpg";
import fd from "@/assets/wenjianjia.png";

function getMapBg(markNumber) {
  let bgObj = {
    folder: fd,
    file: fl,
  };
  return bgObj[markNumber];
}


let curPath = ref('')
let tableData = ref([])
let highlight = ref(true)
getFileListApi(curPath.value + '/', tableData.value)
console.log(tableData.value)
function handleClick(row){
  if(row.type==='folder'){
    console.log('点击了文件夹')
    goIntoDir(row.name)
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
  console.log(curPath.value)
  let a
  let b
  [tableData.value, a, b] = await getFileListApi(curPath.value + '/', [])
}

function  handleMouseEnter(row, column, cell, event) {
  // 保存悬停的行
  row.show = true;
}
function handleMouseLeave(row, column, cell, event) {
  // 清除悬停行的样式
  row.show = false
}


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