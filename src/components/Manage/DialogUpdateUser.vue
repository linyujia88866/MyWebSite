<template>
  <div style="height: 100%;
  position: absolute;
  width: 100%; z-index: 500; background: rgba(255, 255, 255, 0.5);;
  top: 0;  left: 0; "></div>
  <div class="modal" :style="style">
    <div class="modal-content" @mousedown="startDrag">
      <h3>更新密码</h3>
      <form @submit.prevent="postData">
        <div class="form-div">
          <label for="username" class="form-label">username:</label>
          <input type="text" id="username" v-model="user" readonly>
        </div>
        <div class="form-div">
          <label for="password"  class="form-label">password:</label>
          <input type="text" id="password" v-model="pwd" >
        </div>
        <div class="form-div">
          <button type="submit" style="margin-left: auto; height: 28px" @click.prevent="closeDialog">取消</button>
          <button type="submit" style="margin-left: 12px; height: 28px">更新</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {myHttp} from "@/request/myrequest";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
let user = ref('');
let pwd = ref('');
let userid = ref('');
const router = useRouter();

const emit = defineEmits(['close-event']);
const style = reactive({
  top: '200px',
  left: '500px'
});

let dragging = false;

const startDrag = (event) => {
  dragging = true;
  const offsetX = event.clientX - parseInt(style.left);
  const offsetY = event.clientY - parseInt(style.top);

  const move = (event) => {
    if (dragging) {
      style.top = event.clientY - offsetY + 'px';
      style.left = event.clientX - offsetX + 'px';
    }
  };

  const stopDrag = () => {
    dragging = false;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', stopDrag);
  };

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stopDrag);
};

const url = '/user/create';


function closeDialog() {
  emit('close-event', 'Hello from child with Composition API');
}


const postData = async () => {
  let requestBody = {
    username: user.value,
    password: pwd.value,
    id: userid.value
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
          closeDialog()
        }
      })
      .catch(error => console.error('Error:', error));
};


function setInitData(initUser, initPwd) {
  user.value = initUser
  pwd.value = initPwd
}
defineExpose({
  setInitData
})


</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-content {
  padding: 20px;
  cursor: move;
}

.form-label{
  width: 80px; text-align: left; align-content: center; height: 40px;
}

.form-div{
  display: flex;
  margin: 20px;
}


</style>