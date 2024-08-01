import {ElLoading} from "element-plus";

let loading=null
const openLoadingDialog = (text) => {
    if(loading === null){
        if(text === undefined){
            text = '正在上传文件...'
        }
        loading = ElLoading.service({
            lock: true,
            text: text,
            background: 'rgba(0, 0, 0, 0.7)',
        })
    } else {
        loading.setText(text)
    }
}

function closeLoading(){
    if (loading !== null){
        loading.close()
        loading = null
    }
}

export {
    openLoadingDialog,
    closeLoading
}