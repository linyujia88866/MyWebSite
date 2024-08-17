import {getExtension} from "@/utils/stringutils";
import {ElMessage} from "element-plus";
import {myHttp} from "@/request/myrequest";
import {closeLoading, openLoadingDialog} from "@/utils/loading";
import {useRouter} from "vue-router";
const router = useRouter();
function gotoWordView(docxUrl){
    const queryParams = {docxUrl: docxUrl};
    // 将query参数转换为查询字符串
    const queryString = new URLSearchParams(queryParams).toString();
    // 创建新标签页的URL，并附加query参数
    const urlWithQuery = `/#/viewWord?${queryString}`;
    window.open(urlWithQuery, '_blank');
}

function gotoPPTView(pptUrl){
    window.open(`/PPTXjs-1.21.1/index.html?file=` + pptUrl, '_blank');
}

function gotoExcelView(excelUrl){
    const queryParams = {excelUrl: excelUrl};
    // 将query参数转换为查询字符串
    const queryString = new URLSearchParams(queryParams).toString();
    // 创建新标签页的URL，并附加query参数
    const urlWithQuery = `/#/viewExcel?${queryString}`;
    // 使用window.open在新标签页中打开URL
    window.open(urlWithQuery, '_blank');
}
let supportList = ['pdf', 'docx', 'jpg', 'png', 'pptx', 'xlsx', 'gif']
let openInNewWindowList = ['pdf', 'gif']

async function showTheFileApi(filename, curPath) {

    if(supportList.includes(getExtension(filename))){

    } else {
        ElMessage({
            message: '该文件类型暂不支持预览！',
            type: 'warning',
        });
        return
    }
    let finalPath;
    let url = "/minio/preview"
    openLoadingDialog('正在加载文件内容...')
    if (curPath.length > 0) {
        finalPath = curPath + '/' + filename
    } else {
        finalPath = filename
    }

    try {
        await myHttp.get(url, {
            params: {
                fileName: finalPath
            },
            responseType: 'blob'
        })
            .then(response => {
                if (response.status === 200) {
                    //浏览器下载
                    const myBlob = response.data
                    const qrUrl = window.URL.createObjectURL(myBlob);
                    // pdf文件类型
                    if(openInNewWindowList.includes(getExtension(filename))){
                        window.open(qrUrl, '_blank');
                    }
                    else if(filename.endsWith('.pptx')){
                        gotoPPTView(qrUrl)
                    }
                    // 图片文件类型
                    else if(filename.endsWith('.png') || filename.endsWith('.jpg')){
                        window.open(qrUrl, '_blank');
                    }
                    // word文档文件类型
                    else if(filename.endsWith('.docx')){
                        gotoWordView(qrUrl)
                    }
                    else if(filename.endsWith('.xlsx')){
                        gotoExcelView(qrUrl)
                    }
                    return qrUrl
                }
            });

    } catch (error) {
        ElMessage({
            message: '获取文件失败！',
            type: 'warning',
        });
    }
    closeLoading()
}

export {
    gotoExcelView,
    gotoPPTView,
    gotoWordView,
    showTheFileApi
}