<template>
  <div class="login-container">
    <div>
      <img alt="Vue logo" style="height: 300px; width: 300px;" src="@/assets/yanzi.jpg" >
    </div>
    <h1>千里之行，始于足下</h1>
    <form @submit.prevent="postData">
      <div style="display: flex">
        <label for="username" style="width: 120px; text-align: left; padding-top: 20px">username:</label>
        <input type="text" id="username" v-model="user">
      </div>
      <div style="display: flex">
        <label for="password"  style="width: 120px; text-align: left;padding-top: 20px">password:</label>
        <input type="password" id="password" v-model="pwd" >
      </div>
      <div style="display: flex">
        <button type="submit" style="margin-right: 10px">登录</button>
        <button type="submit" @click.prevent="onShowDialog" style="margin-left: 10px">注册</button>
      </div>
    </form>
    <div style="display: flex">
      <div style="display: flex; ">
        <input type="checkbox" id="checkbox" v-model="isChecked">
        <label for="checkbox">记住登录名</label>
      </div>
      <div style="width: 60%; display: flex; margin-left: auto">
        <a style="text-align: right;float: right; margin-left: auto" href="/#/">使用访客身份</a>
      </div>
    </div>
  </div>

  <div class="status-bar">
    <p style="margin-left: 20px;">粤ICP备2024288007</p>     <p style="margin-left: 20px">有任何疑问请联系</p>
    <p style="text-decoration-line: underline; margin-left: 8px; cursor: pointer" @click="sendEmail"  >linyujia619@qq.com</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from "vue";

const router = useRouter();
let user = ref('1111111');
let pwd = ref('11111111');
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
const isChecked = ref(false);
const isShow = ref(false);

let rememberStatus = localStorage.getItem('remember')
user.value = ''
pwd.value = ''
if(rememberStatus === 'true'){
  isChecked.value = true;
  user.value = localStorage.getItem('curUser')
  pwd.value = localStorage.getItem('curPwd')
}

const onShowDialog = (show) => {
  isShow.value = show;
  router.push({name: 'registry'});
};
const sendEmail = () => {
  window.location.href = 'mailto:example@example.com?subject=邮件主题&body=邮件内容';
};
const url = '/login';


const postData = async () => {
  const requestBody = {
    user: user.value,
    password: pwd.value
  };
  myHttp.post(url, requestBody)
      .then(response => {
        if (response.data.code === 200) {
          router.push({name: 'home'});
          localStorage.setItem('remember', isChecked.value.toString())
          if(isChecked.value){
            localStorage.setItem('curUser', user.value)
            localStorage.setItem('curPwd', pwd.value)
          }
        } else if(response.data.code === 50001){
          ElMessage({
            message: response.data.message,
            type: 'error',
          });
        }
      })
      .catch(error => {});
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
form div {
  margin: 10px 0;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"], input[type="password"] {
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  //margin-right: 2px;
}
button[type="submit"] {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.status-bar {
  align-items: center;  /* align-item是垂直居中 */
  display: flex;
  position: fixed;      /* 固定位置 */
  left: 0;              /* 左边距为0 */
  bottom: 0;            /* 底部边距为0 */
  width: 100%;          /* 宽度为100% */
  height: 40px;         /* 高度设置为你需要的值 */
  background-color: #333; /* 背景颜色 */
  color: white;         /* 文字颜色 */
  /* 其他样式 */
}
</style>