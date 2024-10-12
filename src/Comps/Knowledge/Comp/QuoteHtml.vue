<script setup >
import {nextTick, ref} from "vue";
import {viewArt} from "@/utils/articleApi";
import {QuillEditor} from "@vueup/vue-quill";

const props = defineProps({
  articleId: {
    type: String
  },
})
const content = ref('')
nextTick(async () => {
  let res = await viewArt(props.articleId)
  content.value = res.content
})

const editorOption = ref({
  modules: {
    toolbar: false // 设置工具栏为false来隐藏所有按钮
  }
});

</script>

<template>
  <QuillEditor ref="myQuillEditor"
               theme="snow"
               style="border: none;"
               v-model:content="content"
               :options="editorOption"
               contentType="html"
               read-only
  />
</template>

<style scoped>
</style>