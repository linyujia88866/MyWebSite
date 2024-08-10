import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";
async function viewArt(artId) {
    let res = {}
    await myHttp.get(`/article/get/${artId}`)
        .then(response => {
            if (response.data.code === 200) {
                res = {
                    articleId: artId,
                    title: response.data.data.title,
                    content: response.data.data.content,
                    username: response.data.data.username,
                    createdAt: response.data.data.createdAt,
                    publish: response.data.data.publish,
                    readCount: response.data.data.readCount,
                    likeCount: response.data.data.likeCount,
                    goodCount: response.data.data.goodCount,
                }

            } else {
                ElMessage({
                    message: '获取文章信息失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return res
}

async function pubArt(artId) {
    let res = {}
    await myHttp.post(`/article/publish/${artId}`)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `发布文章${artId}成功！`,
                    type: 'success',
                });

            } else {
                ElMessage({
                    message: `发布文章${artId}失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return res
}

async function getMyFavoriteArtApi() {
    let array
    await myHttp.get('/article/MyFavoriteArticles')
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章列表失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return array
}

async function saveArtApi(title, content ,publish, emit) {
    let res = ""
    if (title === "") {
        ElMessage({
            message: '请输入标题！',
            type: 'warning',
        });
        return res
    }
    if (title.length>30 ) {
        ElMessage({
            message: '标题长度不能超过30！',
            type: 'warning',
        });
        return res
    }
    if (content.length === 0) {
        ElMessage({
            message: '请输入文章内容！',
            type: 'warning',
        });
        return res
    }
    let requestBody = {
        title: title,
        content: content,
        publish: publish
    };

    await myHttp.post("/article/save", requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                ElMessage({
                    message: "文章保存成功" + response.data.data,
                    type: 'success',
                });
                emit('save-event', 'Hello from child with Composition API');
            }
        })
        .catch(error => console.error('Error:', error));
    return res
}


async function updateArtApi(title, content , articleId) {
    let res = ""
    if (title === "") {
        ElMessage({
            message: '请输入标题！',
            type: 'warning',
        });
        return res
    }

    if (content.length === 0) {
        ElMessage({
            message: '请输入文章内容！',
            type: 'warning',
        });
        return res
    }
    if (title.length>30 ) {
        ElMessage({
            message: '标题长度不能超过30！',
            type: 'warning',
        });
        return res
    }
    let requestBody = {
        title: title,
        content: content,
    };

    await myHttp.post(`/article/update/${articleId}`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
                ElMessage({
                    message: "文章保存成功" + response.data.data,
                    type: 'success',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return res
}


async function getPubArticles() {
    let array
    await myHttp.get('/article/pubArticles')
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章列表失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return array
}


async function addOneRead(articleId) {
    let array
    await myHttp.get(`/article/addOneRead/${articleId}`)
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '文章阅读数量+1失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return array
}


async function getAllPubArticles() {
    let array
    await myHttp.get('/article/AllPubArticles')
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章列表失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return array
}

async function getPriArticles() {
    let array
    await myHttp.get('/article/priArticles')
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章列表失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => console.error('Error:', error));
    return array
}


export {
    viewArt,
    getPubArticles,
    getPriArticles,
    pubArt,
    saveArtApi,
    updateArtApi,
    getAllPubArticles,
    getMyFavoriteArtApi
}