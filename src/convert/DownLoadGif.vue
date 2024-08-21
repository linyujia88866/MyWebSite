/* eslint-disable */
<template>
  <div class="home-page">
    <div>
    </div>
      <div style="margin: 20px 0 0 20px; display: flex">
        请输入您要下载的图片文件地址, 例如:https://linyujia.cn/img/yanzi.de8fb8f1.jpg
      </div>
      <div style="margin: 20px; display: flex">
        <el-input input-style="width: 800px;  " v-model="input" style="width: 240px" placeholder="Please input" />

      </div>
      <div style="margin: 0 0 20px 20px; display: flex">
        请选择要下载的图片文件后缀
      </div>
      <div style="margin-left: 20px; text-align: left">
        <el-select
            v-model="value"
            placeholder="Select"
            size="large"
            style="width: 240px"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div>

      </div>

    <div>
      <el-button style="margin: 12px;" type="primary" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import {downFile} from "@/utils/fileConvertApis";
const router = useRouter();
const input = ref('')
input.value = ""
const value = ref('.gif')
const options = [
  {
    value: '.png',
    label: 'PNG',
  },
  {
    value: '.jpg',
    label: 'JPG',
  },
  {
    value: '.jpeg',
    label: 'JPEG',
  },
  {
    value: '.gif',
    label: 'GIF',
  },
  {
    value: '',
    label: '不带任何文件后缀',
  },
]

async function download() {
  downFile(input.value, value.value)
}

</script>

<style scoped>
.home-page {
  width: 100%;
  height: 98vh;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  padding: 12px 10px 10px;
  flex-grow: 1;
}

.card {
  /* 卡片样式 */
  border: 1px solid #ddd;
  height: 30%;
  border-radius: 4px;
  padding: 10px;
  text-align: center;

  background-image: url('../assets/more.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-table{
  background-image: url('../assets/table.png');
  background-size: cover;
  background-position: 0 -20px;
  background-repeat: no-repeat;
}
.card-notebook{
  background-image: url('../assets/paper.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-memory{
  background-image: url('../assets/remember.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileTrans{
  background-image: url('../assets/pic-download.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-fileChange{
  background-image: url('../assets/trans.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-bar li {
  display: inline-block;
  margin-right: 10px;
}

.nav-bar li.active a {
  font-weight: bold;
  font-size: 24px;
  color: #42b983;
}


.menu li {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}
.menu li:last-child {
  border-bottom: none;
}
.menu a {
  text-decoration: none;
  color: #333;
  display: block;
}
.menu a:hover {
  background-color: #f0f0f0;
}

</style>