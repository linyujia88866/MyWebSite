import axios from "axios";
axios.defaults.withCredentials=true;

export const myHttp=axios.create({
    withCredentials: true,
    // baseURL: "http://47.109.79.50:9802/api",
    // baseURL: "http://127.0.0.1:9802/api",
    baseURL: "http://127.0.0.1/api",
})