import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
async function base64EncodeApi(data) {
    let requestBody = {
        data: data
    }
    let res
    await myHttp.post(`/base64/encode`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                return res
            } else {
                ElMessage({
                    message: 'base64加密失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return res;
}

async function base64DecodeApi(data) {
    let requestBody = {
        data: data
    }
    let res
    await myHttp.post(`/base64/decode`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                return res
            } else {
                ElMessage({
                    message: 'base64加密失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return res;
}
export {
    base64EncodeApi,
    base64DecodeApi
}