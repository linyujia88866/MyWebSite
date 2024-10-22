<script setup>
import {
  add_category, add_record,
  delete_record, get_all_category,
  get_all_record
} from "@/utils/ledgerApi";
import {onMounted, reactive, ref} from "vue";
import { ArrowDown } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

// add_category()
// add_record()

let tableData = ref([])

async function reset() {
  let record_data = await get_all_record()
  tableData.value = []
  for (let i = 0; i < record_data.length; i++) {
    tableData.value.push(record_data[i])
  }
}

onMounted(async () => {
  await reset()
})

const categoryList = ref([])
async function all_category() {
  let category_data = await get_all_category()
  categoryList.value = []
  for (let i = 0; i < category_data.length; i++) {
    let obj = {
      label: category_data[i].name,
      value: category_data[i].name,
    }
    categoryList.value.push(obj)
  }
}
all_category()
const currentRow = ref()
const oldName = ref()
const handleCurrentChange = (val) => {
  currentRow.value = val
}
const form = reactive({
  name: '',
  comment: '',
  spend: 0,
  date: ''
})
const show_add = ref(false)
const show_edit = ref(false)
function add() {
  if(categoryList.value.length === 0) {
    ElMessage({
      message: `请先创建消费分类！`,
      type: 'warning',
    });
    return
  }
  cur_category_value.value = categoryList.value[0].value
  show_add.value = true
  form.name = ""
}
function edit() {
  if(currentRow.value !== undefined && currentRow.value !== null){
    form.name = currentRow.value.name
    show_edit.value = true
  } else {
    ElMessage({
      message: `请先选中一条数据！`,
      type: 'warning',
    });
  }
}
const formLabelWidth = '140px'

async function deleteRow() {
  if (currentRow.value !== undefined && currentRow.value !== null) {
    await delete_record(currentRow.value.name)
    await reset()
  } else {
    ElMessage({
      message: `请先选中一条数据！`,
      type: 'warning',
    });
  }
}
const cur_category_value = ref()
async function add_() {
  if(form.spend <= 0){
    ElMessage({
      message: `消费金额不能小于0！`,
      type: 'error',
    });
    return
  }
  if(cur_category_value.value === undefined || cur_category_value.value === ''){
    ElMessage({
      message: `请选择消费类型！`,
      type: 'error',
    });
    return
  }
  if(value1.value === undefined || value1.value === ''){
    ElMessage({
      message: `请选择消费日期！`,
      type: 'error',
    });
    return
  }
  show_add.value = false
  await add_record(form.spend, form.comment, value1.value, cur_category_value.value)
  await reset()
}

const value1 = ref('')

</script>

<template>
  <div>
    <h1>消费记录</h1>
  </div>
  <div style="display: flex; justify-content: center; max-height: 500px">
    <el-table :data="tableData"
              height="250"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 800px;  ">
      <!--        <el-table-column type="selection" width="30" />-->
      <el-table-column sortable align="center" type="index" label="序号" width="80" />
      <el-table-column sortable align="center" prop="spend" label="金额(¥)" width="180" />
      <el-table-column sortable align="center" prop="name" label="消费类型" width="180" />
      <el-table-column align="center" prop="comment" label="备注" width="180" />
      <el-table-column sortable align="center" prop="date" label="消费日期"  />
    </el-table>
  </div>
  <div style="margin-top: 12px">
    <el-button @click="add" size="small" type="primary">新增</el-button>
    <el-button @click="edit" size="small" type="primary">编辑</el-button>
    <el-button @click="deleteRow" size="small" type="primary">删除</el-button>
  </div>

  <el-dialog v-model="show_add" title="新增消费记录" width="500">
    <el-form :model="form" >
      <el-form-item label="消费金额(￥)" :label-width="formLabelWidth">
        <el-input v-model="form.spend" autocomplete="off" type="number" />
      </el-form-item>
      <el-form-item label="消费类型" :label-width="formLabelWidth" >
<!--        <el-dropdown>-->
<!--          <el-button type="primary">-->
<!--            消费类型<el-icon class="el-icon&#45;&#45;right"><arrow-down /></el-icon>-->
<!--          </el-button>-->
<!--          <template #dropdown>-->
<!--            <el-dropdown-menu>-->
<!--              <el-dropdown-item v-for="(value, key) in categoryList" :key="key">{{value}}</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--            <el-select-->
<!--                v-model="value"-->
<!--                placeholder="Select"-->
<!--                size="large"-->
<!--                style="width: 240px"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </template>-->
<!--        </el-dropdown>-->
        <el-select
            v-model="cur_category_value"
            placeholder="Select"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.comment" autocomplete="off" />
      </el-form-item>
<!--      <div style="display: flex">-->
<!--        <p>消费日期</p>-->
<!--        <el-date-picker-->
<!--            v-model="value1"-->
<!--            type="date"-->
<!--            placeholder="消费日期"-->
<!--        />-->
<!--      </div>-->
      <el-form-item label="消费日期" :label-width="formLabelWidth">
        <el-date-picker
            v-model="value1"
            type="date"
            placeholder="消费日期"
        />
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


</template>

<style scoped>

</style>