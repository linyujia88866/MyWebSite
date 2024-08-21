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
    <el-input type="textarea" v-model="text_content" :rows="9" style="margin-top: 12px" /> 返回内容
    <br />
    <br />
  </div>
</template>

<script>
import bus from "@/utils/eventBus";
export default {
  name: 'HomeView',
  data() {
    return {
      url: "ws://127.0.0.1:9802/websocket",
      message: "",
      text_content: "",
      ws: null,
    };
  },
  created() {
  },
  destroyed() {
    this.exit()
  },

  methods:{
    initWebsocket(){
      this.ws = new WebSocket(this.url);
      const self = this;
      this.ws.onopen = function (event) {
        self.text_content = self.text_content + "已经打开连接!" + "\n";
      };
      this.ws.onmessage = function (event) {
        self.text_content = self.text_content + event.data +"\n";
        bus.$emit('myEvent', 'test');
      };
      this.ws.onclose = function (event) {
        alert(event.reason);
        self.text_content = self.text_content + `由于${event.reason}已经关闭连接!` + "\n";
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
        alert("未连接到服务器");
      }
    },
  }
}
</script>