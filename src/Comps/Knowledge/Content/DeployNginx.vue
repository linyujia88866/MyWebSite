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
        <DrawTitle title="什么是web服务器"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <p>web服务器简单讲指的是，传送页面使得浏览器可以浏览的服务器，它可以处理HTTP协议的请求。</p>
        <p>当你访问一个web服务器，通常你会获得一个HTML文件，并由浏览器渲染成一个页面。当你对一个网页进行保存的时候，你也会得到一个html文件。</p>
        <p>主流的web服务器有很多种，这里我们选择Nginx作为我们的入门网站搭建的第一课。
          <span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Nginx是一个高性能的Web服务器，支持高并发连接，常用于处理静态内容和高流量的网站。</span>
        </p>
        <p><br></p>
        <p>Nginx既可以在Windows机器上部署，也可以在linux机器上部署，由于前面我们在阿里云上买的轻量服务器是一个Linux机器，所以本篇我们讲如何在linux机器上部署一个web服务器。</p>
        <p><br></p>
      </div>
    </el-collapse-item>



    <el-collapse-item name="2">
      <template #title>
        <DrawTitle title="Nginx的下载和安装"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <p>首先我们需要登录Nginx的官网，下载最新版的nginx安装包。</p>
        <p>
          <a href="https://nginx.org/en/download.html" rel="noopener noreferrer" target="_blank">nginx: download</a>
        </p>
        <p>
          <img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F4854e836-9e60-466a-9f48-0d0d897fe1f6%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002193246.png" alt=""></p>
        <p>选一个最新的稳定版本即可。将下载的安装包上传到linux服务器的任意一个目录下即可。站长直接上传到了/root/nginx目录。</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F7ed1cde6-c2bc-45ba-bc2f-a386bfdafd39%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002193453.png" alt=""></p>
        <p>然后我们使用命令 tar -zvxf nginx-1.26.2.tar.gz 解压文件。</p>
        <p>cd nginx-1.26.2 进入文件夹</p>
        <p>执行命令 ./configure 初始化linux安装配置</p>
        <p>如果执行结果报错如下，说明缺少了必要的安装包</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F4a881a3b-a5f6-4a14-8382-f3bf644e0b11%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002193830.png" alt=""></p>
        <p><br></p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F275d923c-d91a-49ea-9bc6-2983cd62533c%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002193955.png" alt=""></p>
        <p>当然直接安装还不一定成功，主要跟你的linux的镜像源配置有关，如果直接使用yum install命令找不到安装包就只能使用离线版本安装了。</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2Fb116f62b-8c8e-4b68-b442-d402dcf7cb5e%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002194218.png" alt=""></p>
        <p><br></p><p>为此站长在网上找了一个PCRE的安装包，还花了一块钱，</p>
        <p><a href="https://blog.csdn.net/weixin_51689532/article/details/126274919" rel="noopener noreferrer"
              target="_blank">./configure:error:the HTTP rewrite module requires the PCRE library. 离线安装pcre-CSDN博客</a>
        </p>
        <p><br></p>
        <p>PCRE离线安装可能会遇到如下报错</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F92b63b34-b5de-46a2-9034-e66a30703e9c%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002194711.png" alt=""></p>
        <p>报错说明缺少了一个C++的编译包。我们直接使用yum命令安装即可。</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2Fc04d6a4a-ba2b-4e83-a486-69e81f84ab77%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002194830.png" alt=""></p>
        <p><br></p><p>关于yum install，站长还踩过很多坑，这里一并列出来，按需取用。</p>
        <p><a href="https://blog.csdn.net/sinat_27535209/article/details/113046978" rel="noopener noreferrer"
              target="_blank">centos7 yum install gcc-c++ 失败问题解决_centos安装不上gcc. error downloading packages:-CSDN博客</a>
        </p>
        <p><br></p>
        <p><a href="https://blog.csdn.net/weixin_52597907/article/details/141113817" rel="noopener noreferrer"
              target="_blank">已解决：Cannot find a valid baseurl for repo: base/7/x86_64-CSDN博客</a></p>
        <p><br></p>
        <p>总之，历尽千辛万苦，见招拆招，终于把linux安装需要的各种依赖包都装齐了。</p>
        <p><br></p>
        <p>然后我们可以成功执行nginx目录下的./configure 配置命令了。执行成功的结果如下。</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F3b74d17b-3213-46b7-a75a-809054b3973e%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002195541.png" alt=""></p>
        <p>接着在nginx目录下，执行 make &amp;&amp; make install 命令即可完成nginx的安装。</p>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <DrawTitle title="如何访问Nginx"></DrawTitle>
      </template>
      <div style="text-align: left;">
        <p>验证nginx是否安装成功，curl http://127.0.0.1</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2Facf6217b-2247-4550-94e2-e91935e551de%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002195747.png" alt=""></p>
        <p><br></p>
        <p>最后，你可以在你的电脑浏览器上输入 http://你的服务器ip地址 访问到nginx的页面</p>
        <p><br></p><p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F50ba7d9b-dc0d-410a-9466-ea8552aca873%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002195848.png" alt=""></p>
        <p><br></p>
        <p>如果无法访问通，请检查你的防火墙设置。或者直接关闭防火墙。</p>
        <p><img style="max-height: 200px; max-width: 600px" src="https://linyujia.cn/share/pic-link/Yujia%2F3858948d-8b9f-4159-8857-d65e433c7e61%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20241002200038.png" alt=""></p>
        <p>到此，你已经成功部署了一个自己的web服务器了，下一章我们将介绍如何让服务器使用https协议访问。</p>
        <p><br></p><p><br></p>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<style scoped>

</style>