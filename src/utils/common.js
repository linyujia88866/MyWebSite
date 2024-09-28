import {useRouter} from "vue-router";

async function gotoLoginApi(router) {
    let currentUrl = window.location.href;
    sessionStorage.setItem('redirectPath', currentUrl.substring(currentUrl.indexOf("#/") + 1));
    await router.push({name: 'login'});
}
export {
    gotoLoginApi
}