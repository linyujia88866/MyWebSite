// 首先需要安装 uuid 包
// npm install uuid

const { v4: uuidv4 } = require('uuid');

function getUuid(){
    return uuidv4()
}


export {
    getUuid
}