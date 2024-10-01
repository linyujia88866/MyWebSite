<template>
  <el-dialog v-model="dialogTableVisible" title="扩容申请" width="800" :close-on-press-escape="false" :close-on-click-modal="false">
    <div style="margin: 12px;text-align: left">
        <span >请选择你要扩容的空间大小（增量，非总量）, 单位(MB)</span>
      <el-slider v-model="value" max="10000"  show-input />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleCover">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import bus from "@/utils/eventBus";
import {ElMessage} from "element-plus";
import {Enums} from "@/enums/enums";

let curPath = ref('')
const value = ref(0)
const emit = defineEmits(['close-event'])
const dialogTableVisible = ref(false)

function closeDialog() {
  dialogTableVisible.value = false
}

function openDialog() {
  dialogTableVisible.value = true
}

async function handleCover() {
  onSubmit()
  emit("close-event", "")
  closeDialog()
}

function  handleCancel(){
  emit("close-event", "")
  closeDialog()
}

onMounted(() => {
  bus.$on('sendMessageFinished', finish);
  onUnmounted(()=>{
    bus.$off('sendMessageFinished', finish)
  }); // 确保在组件卸载时移除监听器
});

function finish(){
  ElMessage({
    message: "申请已提交",
    type: 'success',
  });
}

const onSubmit = () => {
  let msg = {
    title: "网盘空间申请",
    content: "",
    link: "",
    size: value.value,
  }
  let obj = {
    receiver:"admin",
    content: JSON.stringify(msg),
    type: Enums.MessageType.disk_expansion_application
  }
  bus.emit('sendMessage', JSON.stringify(obj));
}

defineExpose({
  openDialog
})

</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.dialog-footer button:first-child {
  //margin-right: 10px;
}

</style>
