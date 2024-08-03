<template>
  <el-dialog v-model="dialogFormVisible" title="新建文件夹"  width="700">
    <el-form >
      <el-form-item label="文件夹名称：" :label-width="formLabelWidth">
        <el-input v-model="dirName" autocomplete="off" />
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
import {reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import {hasElementWithName} from "@/utils/stringutils";
import {createDirApi} from "@/utils/fileApi";

const dialogFormVisible = ref(false)
const formLabelWidth = '100px'
let folders = ref([])
let dirName = ref("新建文件夹")

const emit = defineEmits(['confirm','cancel'])
let form = reactive({
  name: '',
})
let originPath = ref('')
function open(origin, folderNames){
  dialogFormVisible.value = true
  originPath.value = origin
  folders.value = folderNames
}

function close(){
  dialogFormVisible.value = false
}

const createDir = async () =>
{
  if(!dirName.value){
    ElMessage({
      message: '请输入文件夹名称！',
      type: 'warning',
    });
    return false
  }
  if(hasElementWithName(folders.value, dirName.value)){
    ElMessage({
      message: '文件夹名称重复！',
      type: 'warning',
    });
    return false
  }
  let res = await createDirApi(originPath.value, dirName.value)
  if(res === 'success'){
    dirName.value = "新建文件夹"
    emit('confirm', dirName.value)
  }
  return true
}


function cancel(){
  emit('cancel')
  dialogFormVisible.value = false
}

async function confirm() {
  dialogFormVisible.value = ! await createDir()
}

defineExpose({
  open,
  close
})

</script>

<style scoped>
</style>