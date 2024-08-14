<template>
  <div class="login-container">
    <img alt="Vue logo" src="../assets/logo.png" >
    <h1>注册账号</h1>
    <form @submit.prevent="postData">
      <div style="display: flex">
        <label for="userId"  style="width: 120px; text-align: left;padding-top: 20px">身份证:</label>
        <input type="text" id="userId" v-model="userid" >
      </div>
      <div style="display: flex">
        <label for="username" style="width: 120px; text-align: left; padding-top: 20px">username:</label>
        <input type="text" id="username" v-model="user">
      </div>
      <div style="display: flex">
        <label for="password"  style="width: 120px; text-align: left;padding-top: 20px">password:</label>
        <input type="password" id="password" v-model="pwd" >
      </div>
      <div style="display: flex">
        <button type="submit"  style="">注册</button>
      </div>
    </form>
    <a style="text-align: right;float: right;" href="/#/login">返回登录页面</a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from "vue";
const router = useRouter();
let user = ref('');
let pwd = ref('');
let userid = ref('');
import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
ref({ name: '', email: '' });
const url = '/user/register';


const postData = async () => {
  let requestBody = {
    username: user.value,
    password: pwd.value,
    userId: userid.value
  };
  myHttp.post(url, requestBody)
      .then(response => {
        if (response.data.code === 30001) {
          ElMessage({
            message: response.data.message,
            type: 'warning',
          });
        }else {
          ElMessage({
            message: "注册成功",
            type: 'info',
          });
          router.push({name: 'login'});
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

</style>