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
  <div class="abc" v-html="content">

  </div>
</template>

<style scoped>
.abc{
  text-align: left; background-color: #add8e6; white-space: pre-wrap;
}
</style>