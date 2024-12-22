<script setup>
import {onMounted, ref} from "vue";
import {get_report} from "@/utils/ledgerApi";

const value5 = ref('')

function getNow() {
  const isoDate = new Date();
  // const isoString = isoDate.toISOString();
  const isoString = isoDate.toLocaleString();
  return isoString.substring(0, 7).replace("/", "-")
}

function getNowDay() {
  const isoDate = new Date();
  // const isoString = isoDate.toISOString();
  const isoString = isoDate.toLocaleString();
  return isoString.substring(0, 10).replace(/\//g, "-");
  // return isoString.substring(0, 10).replace("/", "-").replace("/", "-")
}

onMounted(async () => {
  value5.value = getNow()
  await setReport(value5.value)
})
const total = ref(0)
const todayspend = ref(0)

async function setReport(month) {
  let res = await get_report_by_month(month)
  let keysList = []
  let valuesList = []
  for (let key in res) {
    keysList.push(key);
    valuesList.push(res[key]);
  }
  // 根据键值对键进行排序
  keysList.sort((a, b) => new Date(a) - new Date(b));
// 根据排序后的键重新排列值列表
  const sortedValuesList = [];
  let today = getNowDay()
  keysList.forEach((key) => {
    sortedValuesList.push(res[key]);
    total.value = total.value + res[key]
    if(key === today) {
      todayspend.value = res[key]
    }
  });
}

async function get_report_by_month(month) {
  return await get_report(month)
}

</script>

<template>
  <div>
    <h1>消费一览</h1>
  </div>
  <div>
    本月消费： <div>￥{{total}}</div>
  </div>
  <div>
    今日消费： <div>￥{{todayspend}}</div>
  </div>
</template>

<style scoped>

</style>