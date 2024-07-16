<template>
  <div class="page">
    <Editor :value="emailForm.msg" @updateValue="getMsg" />
  </div>
</template>

<script setup>
import Editor from '@/Editor/index.vue'
import {reactive} from "vue";

const emailForm = reactive({
  test_msg: ''
})
const getMsg = (val) => {
  emailForm.msg = val
}
</script>
