import {ElMessage} from "element-plus";

async function gotoLoginApi(router) {
    let currentUrl = window.location.href;
    if(currentUrl.includes("login")){
        return
    }
    sessionStorage.setItem('redirectPath', currentUrl.substring(currentUrl.indexOf("#/") + 1));
    await router.push({name: 'login'});
    ElMessage({
        message: "请先登录",
        type: 'error',
    });
}
export {
    gotoLoginApi
}