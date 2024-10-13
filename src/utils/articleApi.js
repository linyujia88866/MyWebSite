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
        .catch(error => {});
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
        .catch(error => {});
    return res
}

async function cancelPubArt(artId) {
    let res = {}
    await myHttp.post(`/article/cancelPublish/${artId}`)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `取消发布文章${artId}成功！`,
                    type: 'success',
                });

            } else {
                ElMessage({
                    message: `取消发布文章${artId}失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return res
}

async function getMyFavoriteArtApi(limit, offset) {
    let array
    await myHttp.get(`/article/MyFavoriteArticles?limit=${limit}&offset=${offset}`)
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
        .catch(error => {});
    return array
}

async function getMyFavoriteArtTotalApi() {
    let array
    await myHttp.get(`/article/MyFavoriteArticles/total`)
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章数量失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return array
}

async function saveArtApi(title, content ,publish, emit, artId) {
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
        publish: publish,
        articleId:  artId
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
            } else {
                ElMessage({
                    message: "文章保存失败，" + response.data.message,
                    type: 'error',
                });
            }
        })
        .catch(error => {});
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
                    message: "文章保存成功" + articleId,
                    type: 'success',
                });
            }
        })
        .catch(error => {});
    return res
}


async function getPubArticles(limit, offset) {
    let array
    await myHttp.get(`/article/pubArticles?limit=${limit}&offset=${offset}`)
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
        .catch(error => {});
    return array
}

async function getPubArticlesCount() {
    let array
    await myHttp.get(`/article/pubArticles/total`)
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章数量失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
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
        .catch(error => {});
    return array
}


async function getAllPubArticles(limit, offset) {
    let array
    await myHttp.get(`/article/AllPubArticles?limit=${limit}&offset=${offset}`)
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
        .catch(error => {});
    return array
}

async function searchArtApi(limit, offset, name) {
    let array
    await myHttp.get(`/article/AllPubArticles/search?limit=${limit}&offset=${offset}&name=${name}`)
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
        .catch(error => {});
    return array
}

async function getAllPubArticlesCount() {
    let array
    await myHttp.get(`/article/AllPubArticles/total`)
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章数量失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return array
}

async function getPriArticles(limit, offset) {
    let array
    await myHttp.get(`/article/priArticles?limit=${limit}&offset=${offset}`)
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
        .catch(error => {});
    return array
}

async function getPriArticlesCount() {
    let array
    await myHttp.get('/article/priArticles/total')
        .then(response => {
            if (response.data.code === 200) {
                array = response.data.data;
            } else {
                ElMessage({
                    message: '获取文章数量失败！',
                    type: 'error',
                });
            }
        })
        .catch(error => {});
    return array
}

export {
    viewArt,
    getPubArticles,
    getPriArticles,
    pubArt,
    cancelPubArt,
    saveArtApi,
    updateArtApi,
    getAllPubArticles,
    getMyFavoriteArtApi,
    getAllPubArticlesCount,
    getMyFavoriteArtTotalApi,
    getPubArticlesCount,
    getPriArticlesCount,
    searchArtApi
}