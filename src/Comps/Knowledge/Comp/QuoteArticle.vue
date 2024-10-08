<script setup >
import {nextTick, ref} from "vue";
import {viewArt} from "@/utils/articleApi";

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
</script>

<template>
  <div style="text-align: left" v-html="content">

  </div>
</template>

<style scoped>

</style>