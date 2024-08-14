<template>
  <!-- 图片预览 -->
  <div style="width: 70%; height: 70%">
    <el-image-viewer

        v-if="dialogFormVisible"
        :zoom-rate="1.2"
        @close="closePreview"
        :url-list="imgPreviewList"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {ElMessage} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";
import {myHttp} from "@/request/myrequest";


const dialogFormVisible = ref(false)
const emit = defineEmits(['confirm','cancel', 'closePreview'])
let  imgPreviewList = ref([])
let originPath = ref('')
let originFilename = ref('')
function open(filename, path){
  originPath.value = ''
  dialogFormVisible.value = true
  originPath.value = path
  originFilename.value = filename
  viewPhotos(originFilename.value, originPath.value)
}

function closePreview(){
  originPath.value = ""
  imgPreviewList.value = []
  emit('closePreview')
  close()
}

function close(){
  dialogFormVisible.value = false
}

async function viewPhotos(filename, curPath) {
  let finalPath;
  let url = "/minio/preview"
  openLoadingDialog('正在加载文件内容...')
  if (curPath.length > 0) {
    finalPath = curPath + '/' + filename
  } else {
    finalPath = filename
  }

  try {
    await myHttp.get(url, {
      params: {
        fileName: finalPath
      },
      responseType: 'blob'
    })
        .then(response => {
          if (response.status === 200) {
            //浏览器下载
            const myBlob = response.data
            const qrUrl = window.URL.createObjectURL(myBlob);
            dialogFormVisible.value = true
            imgPreviewList.value = [qrUrl]
          }
        });

  } catch (error) {

    ElMessage({
      message: '预览图片失败！',
      type: 'warning',
    });
  }
  closeLoading()
}

defineExpose({
  open,
  close
})

</script>

<style scoped>
</style>