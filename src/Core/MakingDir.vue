<template>
  <el-dialog v-model="dialogFormVisible" title="文件重命名" width="500">
    <el-form :model="form">
      <el-form-item label="重命名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineProps, reactive, ref} from 'vue'
import {myHttp} from "@/request/myrequest";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {getExtension} from "@/utils/stringutils";

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const props = defineProps({
  originFileName: {
    type: String,
    default: "",
  }
});
const emit = defineEmits(['confirm','cancel'])
let form = reactive({
  name: '',
})
let originFilename = ref('')
let originPath = ref('')
function open(origin){
  dialogFormVisible.value = true
  form.name = origin
  originFilename.value = origin
}
let loading = null
const openLoadingDialog = (text) => {
  if(text === undefined){
    text = '正在移动文件...'
  }
  loading = ElLoading.service({
    lock: true,
    text: text,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
async function moveObject() {
  openLoadingDialog('正在提交文件信息...')
  let url = "/minio/moveObject"
  const formData = new FormData();
  formData.append('srcpath', originPath.value + '/' + originFilename.value);

  formData.append('despath', originPath.value + '/' + form.name);
  await myHttp.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
      .then(response => {
        if (response.status === 200) {

          ElMessage({
            message: '文件重命名成功！',
            type: 'success',
          });
        }
      })
      .catch(error => {
        ElMessage({
          message: '文件重命名失败！',
          type: 'error',
        });
      });
  loading.close()
}

function cancel(){
  emit('cancel')
  dialogFormVisible.value = false
}

async function confirm() {

  if(form.name === originFilename.value){
    ElMessage({
      message: '文件名没有发生变化！',
      type: 'error',
    });
    return
  }

  if(getExtension(originFilename.value) !== getExtension(form.name)){
    ElMessageBox.confirm(
        '修改文件名后缀可能导致文件不可用或无法预览！ 确认更改?',
        'Warning',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          await moveObject()
          dialogFormVisible.value = false
          emit('confirm', form.name)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '更改文件名失败！',
          })
        })
    return
  }
  await moveObject()
  dialogFormVisible.value = false
  emit('confirm', form.name)
}

defineExpose({
  open
})

</script>