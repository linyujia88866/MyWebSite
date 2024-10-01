<template>
  <div>
  </div>
  <div style="margin-top: 12px; margin-left: 12px; margin-right: 12px; text-align: left">
    <el-button @click="initWebsocket" type="primary">连接</el-button>
    <el-button @click="exit" type="danger">断开</el-button>

    <br />
    <el-input style="margin-top: 12px" type="textarea" v-model="message" :rows="9" />
    <el-button type="info" @click="send" style="margin-top: 12px; ">发送消息</el-button>
    <br />
    <br />
    <el-input type="textarea" v-model="text_content" :rows="9" style="margin-top: 12px" /> 聊天记录
    <br />
    <br />
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
export default {
  name: 'HomeView',
  data() {
    return {
      // url: "ws://127.0.0.1:9802/websocket/link",
      url: "wss://linyujia.cn/websocket/link",
      message: "",
      text_content: "",
      ws: null,
      timeoutId: ''
    };
  },
  created() {
  },
  destroyed() {
    this.exit()
  },

  methods:{
    initWebsocket(){
      const domain = window.location.hostname;
      if(domain === "127.0.0.1"){
        this.ws = new WebSocket("ws://127.0.0.1/websocket/link");
      }else {
        this.ws = new WebSocket("wss://linyujia.cn/websocket/link");
      }
      // this.ws = new WebSocket(this.url);
      const self = this;
      this.ws.onopen = function (event) {
        self.text_content = self.text_content + "已经打开连接!" + "\n";
        // 目的是为了发送心跳，保证链接持续
        self.timeoutId = setInterval(function() {
          // 这里 'message' 是你想要发送的内容
          self.ws.send('heart beat');
        }, 10000);
      };
      this.ws.onmessage = function (event) {
        self.text_content = self.text_content + event.data +"\n";
        // bus.$emit('myEvent', 'test');
      };
      this.ws.onclose = function (event) {
        let reason = event.reason
        if (reason === undefined || reason.length === 0){
          reason = "未知原因"
        }
        ElMessage({
          message: reason,
          type: 'error',
        });
        clearInterval(self.timeoutId);
        self.text_content = self.text_content + `由于${reason}已经关闭连接!` + "\n";
      };
    },
    exit() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    },
    send() {
      if (this.ws) {
        this.ws.send(this.message);
      } else {
        ElMessage({
          message: '未连接到服务器！',
          type: 'error',
        });
      }
    },
  }
}
</script>