<script setup>
import {ref} from "vue";
import {base64DecodeApi, base64EncodeApi} from "@/utils/base64Api";

const desc = ref("");
let result = ref("");
async function encode() {
  result.value = await base64EncodeApi(desc.value)
}
async function decode() {
  result.value = await base64DecodeApi(desc.value)
}
</script>

<template>
  <div style="margin-left: 260px; margin-right: 260px">
    <h1>
      Base64 在线编码解码(最好用的 Base64 在线工具)
    </h1>
    <div>
      请输入要进行 Base64 编码或解码的字符
    </div>
    <el-input v-model="desc" type="textarea" style="margin-top: 12px; margin-bottom: 12px" />
    <el-button type="primary" @click="encode">编码(Encode)</el-button>
    <el-button type="primary" @click="decode">解码(Decode)</el-button>
    <div style="margin-top: 12px; margin-bottom: 12px">
      Base64 编码或解码的结果：
    </div>
    <el-input v-model="result" type="textarea" />
  </div>
</template>

<style scoped>

</style>