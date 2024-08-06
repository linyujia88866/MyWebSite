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
                    createdAt: response.data.data.createdAt
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
    getPriArticles
}