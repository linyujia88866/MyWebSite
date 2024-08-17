import axios from "axios";
axios.defaults.withCredentials=true;
export const hisHttp=axios.create({
    withCredentials: true
})