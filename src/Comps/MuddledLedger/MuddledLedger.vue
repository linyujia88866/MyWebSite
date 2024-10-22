<script setup>

import LedgerTab from "@/Comps/MuddledLedger/LedgerTab.vue";
import Consumption from "@/Comps/MuddledLedger/Consumption.vue";
import {ref} from "vue";
import Category from "@/Comps/MuddledLedger/Category.vue";
import Record from "@/Comps/MuddledLedger/Record.vue";
const cur_page = ref("consumption");
function set_cur_page(val) {
  cur_page.value = val

}
</script>

<template>
  <div>
    <LedgerTab
        @consumption="set_cur_page('consumption')"
        @note="set_cur_page('note')"
        @classify="set_cur_page('classify')"
        @report="set_cur_page('report')"
        @setting="set_cur_page('setting')"
    ></LedgerTab>
  </div>
  <div>
    <Consumption v-if="cur_page==='consumption'"></Consumption>
    <Category  v-if="cur_page==='classify'"></Category>
    <Record  v-if="cur_page==='note'"></Record>
  </div>
</template>

<style scoped>

</style>