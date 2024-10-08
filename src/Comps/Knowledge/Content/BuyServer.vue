<script setup >
import { ref } from 'vue'
import DrawTitle from "@/Comps/Knowledge/Comp/DrawTitle.vue";

const activeNames = ref(['1'])
function handleChange(val) {
  console.log(val)
}
</script>

<template>
<div style="min-height: 800px">
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1">
      <template #title>
        <DrawTitle title="购买服务器"></DrawTitle>
      </template>
      <div style="text-align: left">
        <p>很多网站都可以购买服务器，我们以阿里云为例，登录地址为 
          <a href="https://account.aliyun.com/" rel="noopener noreferrer" target="_blank">阿里云登录页 (aliyun.com)</a>
        </p>
        <p>搜索轻量应用服务器，找到阿里云现售的最便宜套餐就好了</p>
        <p>
          <img src="https://linyujia.cn/share/pic-link/Yujia%2F4a88b436-5403-4b1e-acf1-9a71a11f7586%E5%9B%BE%E7%89%871.png" alt="">
        </p>
        <p>之后我们就可以在服务器控制台页面找到自己的服务器的公网ip</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2Ff6aee2f2-e3a2-49b0-87d0-46d73491a8e0%E5%9B%BE%E7%89%872.png" alt=""></p>
        <p>这时候你就可以直接点击【远程连接】按钮登录服务器了。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item  name="2">
      <template #title>
        <DrawTitle title="防火墙配置"></DrawTitle>
      </template>
      <div style="text-align: left">
        <p>不过，直接在站点上登录操作非常不方便，作为一个开发者，我们更喜欢用本地SSH连接工具进行连接。</p>
        <p>想要连接服务器，首先要放开防火墙的22端口，22端口是ssh连接的默认端口</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2Fde03ca55-d029-4262-93b0-c17a8aa3c6a0%E5%9B%BE%E7%89%873.png" alt=""></p>
        <p>但是注意千万不要面向所有ip开放，设置防火墙准入ip为 0.0.0.0/0是非常不可取的，本人就因此而受到了黑客的攻击</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2Fc3184b28-cdd8-43b6-8794-6c6c57c2755c%E5%9B%BE%E7%89%874.png" alt=""></p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2F7895bf6f-f9c5-4de3-8eb2-5262fea3c096%E5%9B%BE%E7%89%875.png" alt=""></p>
        <p>可见黑客有多么凶残。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="使用密码登录"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <p>随后你可以选择用秘钥登录，或者用root账号+密码登录。前者比较安全，后者在默认设置中是不允许的，需要主动放开登录限制。</p>
        <p>&nbsp;</p><p><img src="https://linyujia.cn/share/pic-link/Yujia%2F512a6565-912f-4d23-a7eb-198e8717aa6e%E5%9B%BE%E7%89%876.png" alt=""></p>
        <p>&nbsp;</p><p>完成如此这般设置之后，你就可以安全的使用ssh连接工具进行连接登录服务器了。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item  name="4">
      <template #title>
        <DrawTitle title="SSH登录服务器"></DrawTitle>
      </template>
      <div style="text-align: left">
        <p>推荐使用mobaxterm工具，关键是免费。</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2F4ada65f2-9a78-4177-b057-07fee36e8cbe%E5%9B%BE%E7%89%877.png" alt=""></p>
        <p>登录上去以后可以使用 lscpu命令查看服务器的CPU大小</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2Feea64392-b1d0-4667-ba91-5adce1afb7cf%E5%9B%BE%E7%89%878.png" alt=""></p>
        <p>也可以使用命令cat /proc/meminfo查看内存情况</p>
        <p><img src="https://linyujia.cn/share/pic-link/Yujia%2F3a9d42e9-39ca-4f84-926b-247d3639cbd9%E5%9B%BE%E7%89%879.png" alt=""></p>
        <p>&nbsp;</p>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>