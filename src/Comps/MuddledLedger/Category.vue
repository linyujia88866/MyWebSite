<script setup>
import {add_category, delete_category, edit_category, get_all_category} from "@/utils/ledgerApi";
import {onMounted, ref, reactive} from "vue";
import {ElMessage} from "element-plus";
// const tableData
// add_category()
let tableData = ref([])
const form = reactive({
  name: '',
})
const formLabelWidth = '140px'

onMounted(async () => {
  await reset()
})

async function reset() {
  let category_data = await get_all_category()
  tableData.value = []
  for (let i = 0; i < category_data.length; i++) {
    tableData.value.push(category_data[i])
  }
}
const show_add = ref(false)
const show_edit = ref(false)
function add() {
  show_add.value = true
  form.name = ""
}
function edit() {
  if(currentRow.value !== undefined && currentRow.value !== null){
    form.name = currentRow.value.name
    show_edit.value = true
    oldName.value = form.name
  } else {
    ElMessage({
      message: `请先选中一条数据！`,
      type: 'warning',
    });
  }
}

async function deleteRow() {
  if (currentRow.value !== undefined && currentRow.value !== null) {
    await delete_category(currentRow.value.name)
    await reset()
  } else {
    ElMessage({
      message: `请先选中一条数据！`,
      type: 'warning',
    });
  }
}

function handleSelectionChange(newSelection){
  console.log(newSelection)
}
async function add_() {
  show_add.value = false
  await add_category(form.name)
  await reset()
}

async function edit_() {
  show_edit.value = false
  if(oldName.value !== form.name){
    await edit_category(oldName.value, form.name)
    await reset()
  } else {
    ElMessage({
      message: `分类名称没有变化！`,
      type: 'warning',
    });
  }
}
const currentRow = ref()
const oldName = ref()
const handleCurrentChange = (val) => {
  currentRow.value = val
}
</script>

<template>
  <div >
    <h1>消费分类</h1>
    <div style="display: flex; justify-content: center">
      <el-table :data="tableData"
                highlight-current-row
                @selection-change="handleSelectionChange"
                @current-change="handleCurrentChange"
                style="width: 400px; max-height: 500px">
<!--        <el-table-column type="selection" width="30" />-->
        <el-table-column align="center" prop="name" label="分类名称" width="180" />
        <el-table-column align="center" prop="count" label="消费次数"  />
      </el-table>
    </div>
    <div style="margin-top: 12px">
      <el-button @click="add" size="small" type="primary">新增</el-button>
      <el-button @click="edit" size="small" type="primary">编辑</el-button>
      <el-button @click="deleteRow" size="small" type="primary">删除</el-button>
    </div>
  </div>

  <el-dialog v-model="show_add" title="添加消费分类" width="500">
    <el-form :model="form" >

      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show_add = false">取消</el-button>
        <el-button type="primary" @click="add_">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog v-model="show_edit" title="修改消费分类" width="500">
    <el-form :model="form" >

      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show_edit = false">取消</el-button>
        <el-button type="primary" @click="edit_">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>