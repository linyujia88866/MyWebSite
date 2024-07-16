<template>
  <div v-quill="options" class="quill-editor"></div>
</template>

<script>
import { ref } from 'vue';
import { Quill } from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  setup() {
    const content = ref('');
    const options = {
      content,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image', 'video']
        ]
      },
      theme: 'snow'
    };

    return {
      options
    };
  }
};
</script>

<style>
.quill-editor {
  height: 500px;
}
</style>