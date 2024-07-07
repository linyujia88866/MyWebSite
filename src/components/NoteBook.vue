<template>
  <div>
    <navigate ref="childRef" :origin-tab="'功能'"></navigate>
    <input v-model="newNote" placeholder="Add note" />
    <button @click="addNote">Add</button>
    <div v-for="(note, index) in notes" :key="index">
      {{ note }}
      <button @click="removeNote(index)">Delete</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Navigate from "@/components/Navigate.vue";

export default {
  components: {Navigate},
  setup() {
    const newNote = ref('');
    const notes = ref([]);

    function addNote() {
      if (newNote.value.trim()) {
        notes.value.push(newNote.value.trim());
        newNote.value = '';
      }
    }

    function removeNote(index) {
      notes.value.splice(index, 1);
    }

    return {
      newNote,
      notes,
      addNote,
      removeNote
    };
  }
};
</script>