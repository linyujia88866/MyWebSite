import axios from "axios";
axios.defaults.withCredentials=true;

export const myHttp=axios.create({
    withCredentials: true,
    // 直接访问现网环境的后端服务，有跨域问题
    // baseURL: "http://47.109.79.50:9802/api",
    // 本地直接访问后端服务，有跨域问题
    // baseURL: "http://127.0.0.1:9802/api",
    // 部署现网环境nginx代理使用
    baseURL: "http://47.109.79.50:9898/api",
    // 本地nginx代理使用
    // baseURL: "http://127.0.0.1/api",
})