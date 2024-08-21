<template>
  <div style="margin: 12px">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="消息标题">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="消息内容">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import bus from "@/utils/eventBus";

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
  let msg = {
    title: form.name,
    content: form.desc
  }
  let obj = {
    receiver:"all",
    content: JSON.stringify(msg),
    type: "system_notice"
  }

  bus.emit('sendMessage', JSON.stringify(obj));
}
</script>