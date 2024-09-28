/* eslint-disable */
<template>
  <div class="home-page">
    <div class="card-container">
      <!-- 卡片内容 -->
      <div>
        <div class="card card-fileTrans" @click="gotoDownloadPic">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          图片下载
        </p>
      </div>
      <!-- 卡片内容 -->
      <div>
        <div class="card card-base64" @click="gotoBase64">

        </div>
        <p style="margin: 0; padding: 0; font-weight: bold;">
          Base64加解密
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();
function gotoDownloadPic() {
  router.push({name: 'downloadGif'});
}

function gotoBase64() {
  router.push({name: 'base64'});
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

.card-fileTrans{
  background-image: url('../assets/imgDownload.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-base64{
  background-image: url('../assets/base64.jpg');
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