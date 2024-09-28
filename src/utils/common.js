import {useRouter} from "vue-router";

async function gotoLogin() {
    const router = useRouter();
    await router.push({name: 'login'});
}

export {
    gotoLogin
}