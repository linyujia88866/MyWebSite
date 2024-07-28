<template>
  <div class="tab-container">
    <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ 'active-tab': activeTab === tab }"
        @click="selectTab(tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      default: ''
    }
  },
  emits: ['update:activeTab'],
  methods: {
    selectTab(tab) {
      this.$emit('update:activeTab', tab);
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  position: fixed;
  float: left;
  width: 200px;
  top: 10px;
  left: 10px;
}

.tab {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: white;
}

.active-tab {
  background-color: mediumseagreen;
}
</style>