<script setup>
import {ref} from "vue";
import {base64DecodeApi, base64EncodeApi} from "@/utils/base64Api";
import GotoBox from "@/convert/GotoBox.vue";
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
  <GotoBox></GotoBox>
  <div style="margin: auto; width: 800px">
    <h2 style="text-align: left">
      Base64 在线编码解码(最好用的 Base64 在线工具)
    </h2>
    <div style="text-align: left;">
      请输入要进行 Base64 编码或解码的字符
    </div>
    <el-input show-word-limit maxlength="5000" :rows="10" v-model="desc" type="textarea" style="margin-top: 12px; margin-bottom: 12px; " />
    <div style="text-align: left">
      <el-button type="primary" @click="encode">编码(Encode)</el-button>
      <el-button type="primary" @click="decode">解码(Decode)</el-button>
    </div>
    <div style="margin-top: 12px; margin-bottom: 12px; text-align: left">
      Base64 编码或解码的结果：
    </div>
    <el-input :rows="10" v-model="result" type="textarea" />
  </div>
</template>

<style scoped>

</style>