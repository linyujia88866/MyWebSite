<script setup>
import {ref} from "vue";
import {unicodeDecodeApi, unicodeEncodeApi} from "@/utils/unidcodeApi";

const desc = ref("");
let result = ref("");
async function encode() {
  result.value = await unicodeEncodeApi(desc.value)
}
async function decode() {
  result.value = await  unicodeDecodeApi(desc.value)
}
</script>

<template>
  <div style="margin-left: 260px; margin-right: 260px">
    <h1>
      Unicode 在线编码解码(最好用的 Unicode 在线工具)
    </h1>
    <div>
      请输入要进行 Unicode 编码或解码的字符
    </div>
    <el-input show-word-limit maxlength="5000" :rows="10" v-model="desc" type="textarea" style="margin-top: 12px; margin-bottom: 12px; " />
    <el-button type="primary" @click="encode">编码(Encode)</el-button>
    <el-button type="primary" @click="decode">解码(Decode)</el-button>
    <div style="margin-top: 12px; margin-bottom: 12px">
      Unicode 编码或解码的结果：
    </div>
    <el-input :rows="10" v-model="result" type="textarea" />
  </div>
</template>

<style scoped>

</style>