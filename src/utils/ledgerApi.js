import {myHttp} from "@/request/myrequest";
import {ElMessage} from "element-plus";

async function add_category(cname) {
    let requestBody = {
        name: cname
    };
    let res = {}
    await myHttp.post(`/ledger/category/add`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `新增分类成功！`,
                    type: 'success',
                });

            } else if(response.data.code === 80001){
                ElMessage({
                    message: `分类已存在！`,
                    type: 'error',
                });
            }
            else {
                ElMessage({
                    message: `新增分类失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `新增分类失败！`,
                type: 'error',
            });
        });
    return res
}

async function add_record(spend, comment, date, category) {
    console.log(date)
    let requestBody = {
        spend: spend,
        comment: comment,
        date: date,
        cname: category,
    };
    let res = {}
    await myHttp.post(`/ledger/record/add`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `新增消费记录成功！`,
                    type: 'success',
                });

            } else {
                ElMessage({
                    message: `新增消费记录失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `新增消费记录失败！`,
                type: 'error',
            });
        });
    return res
}


async function edit_category(o, n) {
    let requestBody = {
        oldName: o,
        newName: n
    };
    let res = {}
    await myHttp.post(`/ledger/category/edit`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `修改分类成功！`,
                    type: 'success',
                });

            } else if(response.data.code === 80001){
                ElMessage({
                    message: `目标分类已存在！`,
                    type: 'error',
                });
            }
            else {
                ElMessage({
                    message: `修改分类失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `修改分类失败！`,
                type: 'error',
            });
        });
    return res
}

async function delete_category(o) {
    let requestBody = {
        name: o,
    };
    await myHttp.post(`/ledger/category/delete`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `删除分类成功！`,
                    type: 'success',
                });

            } else {
                ElMessage({
                    message: `删除分类失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `删除分类失败！`,
                type: 'error',
            });
        });
}

async function delete_record(o) {
    let requestBody = {
        name: o,
    };
    await myHttp.post(`/ledger/record/delete`, requestBody)
        .then(response => {
            if (response.data.code === 200) {
                ElMessage({
                    message: `删除消费记录成功！`,
                    type: 'success',
                });

            } else {
                ElMessage({
                    message: `删除消费记录失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `删除消费记录失败！`,
                type: 'error',
            });
        });
}

// async function add_record() {
//     let requestBody = {
//         cname: "旅游",
//         spend: 100,
//         comment: "旅游开销"
//     };
//     let res = {}
//     await myHttp.post(`/ledger/record/add`, requestBody)
//         .then(response => {
//             if (response.data.code === 200) {
//                 ElMessage({
//                     message: `新增消费记录成功！`,
//                     type: 'success',
//                 });
//
//             } else {
//                 ElMessage({
//                     message: `新增消费记录失败！`,
//                     type: 'error',
//                 });
//             }
//         })
//         .catch(error => {});
//     return res
// }

async function get_all_category() {
    let requestBody = {
        name: "旅游"
    };
    let res
    await myHttp.get(`/ledger/category/all`)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
            } else {
                ElMessage({
                    message: `获取分类列表失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `获取分类列表失败！`,
                type: 'error',
            });
        });
    return res
}

async function get_all_record() {
    let requestBody = {
        name: "旅游"
    };
    let res
    await myHttp.get(`/ledger/record/all`)
        .then(response => {
            if (response.data.code === 200) {
                res = response.data.data
            } else {
                ElMessage({
                    message: `获取消费记录列表失败！`,
                    type: 'error',
                });
            }
        })
        .catch(error => {
            ElMessage({
                message: `获取消费记录列表失败！`,
                type: 'error',
            });
        });
    return res
}

export {
    add_category,
    get_all_category,
    get_all_record,
    add_record,
    edit_category,
    delete_category,
    delete_record,
}