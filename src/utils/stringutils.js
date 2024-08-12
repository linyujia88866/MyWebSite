function getFirstAndLastChars(str) {
    let first = '';
    let last = '';
    let len = str.length;
    let x = []
    let totalLen = 0
    for (let i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) { // 如果是中文字符，长度为2
            x.push({l: 2, n: str[i]})
            totalLen += 2
        } else { // 如果是英文字符，长度为1
            x.push({l: 1, n: str[i]})
            totalLen+=1
        }
    }
    if(totalLen < 30){
        return str
    }
    let leftCount = 0
    let rightCount = 0
    for(let i = 0; i < 15; i++)
    {
        first += x[i].n
        leftCount += x[i].l
        if(leftCount > 14){
            break
        }
    }
    for(let i = x.length - 1; i > x.length-15; i--)
    {
        last += x[i].n
        rightCount += x[i].l
        if(rightCount > 14){
            break
        }
    }
    return first+ '...' + reverseString(last)
}
function truncateString(str) {
    if (str.length > 30) {
        return str.substring(0, 30) + '...';
    }
    return str;
}
function reverseString(str) {
    return str.split('').reverse().join('');
}

function hasElementWithName(list, name) {
    return list.some(element => element.name === name);
}

function getIndexByName(arr, name) {
    return arr.findIndex(obj => obj.name === name);
}

function findObject(objs, name) {
    return objs.find(obj => obj.name === name);
}

function getFileNameWithoutExtension(filename) {
    // 获取文件名中最后一个点的位置
    const lastIndex = filename.lastIndexOf('.');
    // 如果没有点或者点在第一个位置，则返回原文件名
    if (lastIndex < 1) return filename;
    // 返回去掉后缀的文件名
    return filename.substring(0, lastIndex);
}
function getExtension(fileName) {
    let dotIndex = fileName.lastIndexOf('.');
    return fileName.substring(dotIndex + 1);
}

// 上一层路径
function getParentDirectory(filePath) {
    // 移除尾部的斜杠，以确保正则表达式工作正常
    filePath = filePath.replace(/\/$/, '');

    // 匹配最后一个斜杠前的部分
    const match = filePath.match(/^(.*)\/[^\/]*$/);
    return match ? match[1] : '';
}
function removePrefix(str, prefix) {
    let regStr = prefix
    regStr = regStr.replace("(", "\\(")
    regStr = regStr.replace(")", "\\)")
    // 创建一个正则表达式，它将匹配以prefix变量开头的字符串
    const regex = new RegExp('^' + regStr);
    // 使用replace方法移除匹配到的前缀
    return str.replace(regex, '');
}

function replaceSuffix(str, prefix='\/') {
    // 正则表达式匹配字符串末尾的后缀
    const regex = new RegExp(prefix + '$');
    // 使用replace方法替换后缀
    return str.replace(regex, '');
}

function transToDirPath(origin) {
    if(origin.length === 0){
        return origin
    } else {
        return origin + "/"
    }
}

const hasName = (srcList, target) => {
    return srcList.some(item => item.name === target);
};


function timestampToDate(timestamp) {
    let date = new Date(timestamp); // 将时间戳转换为Date对象

    // 获取年月日时分秒，并对零补齐
    let year = date.getFullYear().toString().padStart(4, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`; // 拼接字符串返回
}
function timePatternChange(dateStr){
    if(dateStr === null){
        return ""
    }
    // const dateStr = '2024-07-21T06:08:50.86Z';
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
function calSize(size){
    if(size<1024){
        return size.toFixed(2) + 'B'
    } else if(size<1024*1024){
        return (size / 1024).toFixed(2) + 'KB'
    } else {
        return (size / 1024 /1024).toFixed(2) + 'MB'
    }
}

function genNewFileName(oldName, allFileNames){
    let count = 1
    let basic = getFileNameWithoutExtension(oldName).replace(/\(\d+\)/g, "");
    let splitRes = oldName.split(".")
    let suffix = ""
    if(splitRes.length > 1){
        suffix = oldName.split(".").pop();
    }
    let newName = ""
    while (true){
        if(suffix.length > 0){
            newName = basic + `(${count}).` + suffix
        } else {
            newName = basic + `(${count})`
        }

        if (allFileNames.some(obj => obj.name === newName)){
            count++
        }else {
            break
        }
    }
    return newName
}

function genNewFolderName(oldName, allFolderNames){
    let count = 1
    let basic = getFileNameWithoutExtension(oldName).replace(/\(\d+\)/g, "");
    let newName = ""
    while (true){
        newName = basic + `(${count})`
        if (allFolderNames.some(obj => obj.name === newName)){
            count++
        }else {
            break
        }
    }
    return newName
}

function copyToClipboard(text) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

export  {
    getFirstAndLastChars,
    timePatternChange,
    removePrefix,
    replaceSuffix,
    getParentDirectory,
    calSize,
    getExtension,
    getFileNameWithoutExtension,
    hasName,
    hasElementWithName,
    getIndexByName,
    findObject,
    transToDirPath,
    genNewFileName,
    genNewFolderName,
    timestampToDate,
    truncateString,
    copyToClipboard
}