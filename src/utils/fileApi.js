import {myHttp} from "@/request/myrequest";
import {
    calSize,
    getFirstAndLastChars,
    hasName,
    removePrefix,
    replaceSuffix,
    timePatternChange
} from "@/utils/stringutils";
import {ElMessage, ElNotification} from "element-plus";
import {closeLoading, openLoadingDialog} from "@/utils/loading";

async function getFileListApi(path, res, folders, fileNames) {
    openLoadingDialog('正在获取文件信息...')
    await myHttp.post("/minio/listObjectsInDir/test", {prefix: path}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            if (response.status === 200) {

                let array = response.data;
                for (let i = 0; i < array.length; i++) {
                    let json_item = array[i]    // 一条数据
                    let item_name_temp = removePrefix(json_item.name, '.*?\/')   // 去掉用户文件夹前缀
                    let item_size_temp = json_item.size     // 获取size属性
                    let item_time_temp = json_item.time   // 获取时间属性
                    let item_name = removePrefix(item_name_temp, path)    // 文件名移除掉路径前缀
                    if (item_name.endsWith('/')) {
                        let obj = {
                            name: replaceSuffix(item_name),
                            shortenName: getFirstAndLastChars(replaceSuffix(item_name)),
                            size: calSize(item_size_temp),
                            time: timePatternChange(item_time_temp),
                            show: false,
                            type: 'folder',
                            realSize: item_size_temp,
                            iconUrl: `@/assets/wenjianjia.png`
                        }
                        res?.push(obj)
                        folders?.push(obj)
                    } else {
                        if (!item_name.endsWith("_#*#*dirMask")) {
                            let obj = {
                                name: item_name,
                                shortenName: getFirstAndLastChars(item_name),
                                size: calSize(item_size_temp),
                                realSize: item_size_temp,
                                time: timePatternChange(item_time_temp),
                                show: false,
                                lineWidth: 0,
                                fileEdit: 'false',
                                type: 'file',
                                iconUrl: `@/assets/wenjian.jpg`
                            }
                            res?.push(obj)
                            fileNames?.push(obj)
                        }
                    }
                }
            } else {
                ElMessage({
                    message: '获取文件列表失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));

    closeLoading()
    return [res, folders, fileNames]
}



async function uploadFileApi(fileNamesToUpload, filesToUpload, existFileNames, uploadPath) {
    openLoadingDialog(`文件正在努力上传中，请耐心等待...`)
    let sameFilesToUpload = []
    for (let i = 0; i < fileNamesToUpload.length; i++) {
        let file = filesToUpload[i]
        if (file.size === 0) {
            ElNotification({
                title: '文件格式错误',
                message: `【${file.name}】是一个空文件， 请上传有效的文件！`,
                duration: 10000,
                type: 'warning',
            })
            continue
        }
        if (hasName(existFileNames, file.name)) {
            sameFilesToUpload.push(file)
            continue
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filepath', uploadPath + '/');

        await myHttp.post("/minio/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {

        }).catch((error) => {
            console.log(error)
            ElNotification({
                title: '错误',
                message: `文件【${file.name}】上传失败！`,
                duration: 10000,
                type: 'error',
            })
        });
    }
    closeLoading()
    return sameFilesToUpload
}


const createDirApi = async (curPath, dirName) =>
{
    openLoadingDialog("正在创建文件夹...")
    let res  = ""
    const formData = new FormData();
    formData.append('filepath', curPath + '/' + dirName);

    try {
        await myHttp.post("/minio/createDir", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                res = 'success'
            });

    } catch (error) {
        ElMessage({
            message: '创建文件夹失败！',
            type: 'error',
        });
    }
    closeLoading()
    return res
}


async function deleteFolderApi(dirName, curPath) {
    let res = ""
    openLoadingDialog("正在删除文件夹...")
    let removePath;
    if (curPath === '') {
        removePath = dirName
    } else {
        removePath = curPath + '/' + dirName
    }
    const formData = new FormData();
    formData.append('filepath', removePath);

    try {
        await myHttp.post("/minio/removeDir", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                if (response.status === 200 && response.data === true) {
                    res = "success"
                }
            });
    } catch (error) {
        console.error(error);
    }
    closeLoading()
    return res
}



async function deleteFileApi(filename, curPath) {
    openLoadingDialog('正在删除文件...')
    let res=""
    let removePath;
    if (curPath === '') {
        removePath = filename
    } else {
        removePath = curPath + '/' + filename
    }
    const formData = new FormData();
    formData.append('filepath', removePath);
    await myHttp.post("/minio/removeObject", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        if (response.status === 200 && response.data === true) {
            console.log("删除成功")
            res = "success"
        }
    });
    closeLoading()
    return res
}


async function downloadFileApi(filename, type, curPath) {
    openLoadingDialog('正在下载文件...')
    let finalPath;
    let url = "/minio/download"
    let resName= type === 'folder' ? filename + '.zip' : filename
    if(curPath.length > 0){
        finalPath = curPath + '/' + filename
    } else {
        finalPath = filename
    }
    if(type==='folder'){
        finalPath = finalPath + '/'
        url = "/minio/downloadDir"
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
                    let fileLink = document.createElement("a");
                    fileLink.href = qrUrl;
                    fileLink.setAttribute("download", resName);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                } else if (response.status === 222) {
                    ElMessage({
                        message: '文件夹为空！',
                        type: 'warning',
                    });
                }
            });

    } catch (error) {
        console.error(error);
    }
    closeLoading()
}


export {
    getFileListApi,
    uploadFileApi,
    downloadFileApi,
    deleteFileApi,
    createDirApi,
    deleteFolderApi
}
