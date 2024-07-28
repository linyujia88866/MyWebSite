<template>
  <div class="rotate_wrap">
    <p>vue3选择图片 预览图片</p>
    <div v-for="(item,index) in imgList" :key="index">
      <el-image style="width: 100px; height: 100px"
                :src="item.url" :fit="fit" @click="openDialog(item.url)" />
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="图片旋转功能"
        width="15%"
        :before-close="handleClose"
    >
      <el-image style="width: 200px; height: 200px"
                :src="imgDialog" :fit="fit"
                :style="{transform:`rotate(${rotateAngle}deg)`}"/>
      <div>
        <el-button type="warning" @click="rotateImage" >旋转图片</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 图片预览 -->
  <el-image-viewer
      v-if="showImagePreview"
      :zoom-rate="1.2"
      @close="closePreview"
      :url-list="imgPreviewList"
  />


</template>
<script setup>
import {reactive, ref} from "vue";
import VueOfficeDocx from "@vue-office/docx";
const imgList = reactive([
  {  id:1,
    url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {  id:2,
    url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {  id:3,
    url:'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
  },
  {  id:4,
    url:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
  },
  {  id:5,
    url:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
  },
  {  id:6,
    url:'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  },
]);

function handleClose(){

}
//弹框打开隐藏变量
const dialogVisible = ref(false);
//接收显示图片变量
const imgDialog = ref('');
//响应式角度变量
const rotateAngle = ref(0);
//常量90度
const rotateStep = 90;
//打开弹框
const openDialog = (url) => {
  rotateAngle.value = 0; //旋转角度变量重置为0
  dialogVisible.value = true; //打开弹框
  imgDialog.value = url; //点击时拿到的图片地址
}
//旋转角度
const rotateImage = () => {
  rotateAngle.value = (rotateAngle.value + rotateStep) % 360;
}
</script>
<style lang="scss" scoped>
.rotate_wrap {
  padding: 20px;
}
</style>