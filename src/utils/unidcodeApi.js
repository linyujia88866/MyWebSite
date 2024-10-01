import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
async function unicodeEncodeApi(data) {
    let requestBody = {
        data: data
    }
    let res
    await myHttp.post(`/unicode/encode`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                return res
            } else {
                ElMessage({
                    message: 'unicode加密失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return res;
}

async function unicodeDecodeApi(data) {
    let requestBody = {
        data: data
    }
    let res
    await myHttp.post(`/unicode/decode`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                return res
            } else {
                ElMessage({
                    message: 'unicode加密失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return res;
}
export {
    unicodeEncodeApi,
    unicodeDecodeApi
}