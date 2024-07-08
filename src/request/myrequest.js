import axios from "axios";
axios.defaults.withCredentials=true;


export const myHttp=axios.create({
    // baseURL: "http://47.109.79.50:9802",
    baseURL: "http://localhost:9802",
})