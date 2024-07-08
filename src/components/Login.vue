<template>
  <div class="login-container">
    <img alt="Vue logo" src="../assets/logo.png" >
    <h1>燕子爱学习中文网</h1>
    <form @submit.prevent="postData">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="pwd" >
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from "vue";
const router = useRouter();
let user = ref('LiYan');
let pwd = ref('9802');
import {myHttp} from "@/request/myrequest";
const url = '/login';
const requestBody = {
  user: user.value,
  password: pwd.value
};

const postData = async () => {
  console.log("请求了login")
  myHttp.post(url, requestBody)
      .then(response => {
        if (response.data.success === "200") {
          console.log(response.data.success)
          router.push({name: 'home'});
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