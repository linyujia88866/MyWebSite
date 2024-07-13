<template>
  <div class="login-container">
    <img alt="Vue logo" src="../assets/logo.png" >
    <h1>燕子爱学习中文网</h1>
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
    <a style="text-align: right;float: right;" href="https://www.baidu.com">使用访客身份登录</a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from "vue";
const router = useRouter();
let user = ref('LiYan');
let pwd = ref('9802');
import {myHttp} from "@/request/myrequest";


const isShow = ref(false);
const onShowDialog = (show) => {
  isShow.value = show;
  router.push({name: 'registry'});
};

ref({ name: '', email: '' });
const url = '/login';


const postData = async () => {
  const requestBody = {
    user: user.value,
    password: pwd.value
  };
  myHttp.post(url, requestBody)
      .then(response => {
        if (response.data.success === "200") {
          router.push({name: 'home'});
        } else if(response.data.success === "500"){
          alert("账号或密码错误")
        }
      })
      .catch(error => console.error('Error:', error));
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