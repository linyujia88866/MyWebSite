<template>
  <div >
    <div style="margin-right: 250px">
      <span style="margin-right: 8px">月份</span>
      <el-date-picker
          @change="handlechange"
          v-model="value5"
          type="month"
          placeholder="请选择一个月份"
          format="YYYY-MM"
          value-format="YYYY-MM"
      />
    </div>
    <div id="main" class="echart-style">
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from 'vue';
import * as echarts from "echarts";
import {get_report} from "@/utils/ledgerApi";

let myChart = ref()
let option = ref({})
const value5 = ref('')

function getNow() {
  const isoDate = new Date();
  const isoString = isoDate.toLocaleString();
  return isoString.substring(0, 7).replace("/", "-")
  // const isoString = isoDate.toISOString();
  // return isoString.substring(0, 7)
}

async function handlechange() {
  await setReport(value5.value)
}

onMounted(async () => {
  value5.value = getNow()
  await setReport(value5.value)
})


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
  keysList.forEach((key) => {
    sortedValuesList.push(res[key]);
  });
  init(keysList, sortedValuesList)
}

async function get_report_by_month(month) {
  return await get_report(month)
}

const init = (a, b) => {
  // 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById('main'));
  option.value = {
    xAxis: {
      type: 'category',
      data: a
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: b
      }
    ]
  };
  myChart.value.setOption(option.value)
};
</script>
<style scoped>
.echart-style {
  width: 600px;
  height: 500px;
  //background: skyblue;
  //background: skyblue;
}
</style>
