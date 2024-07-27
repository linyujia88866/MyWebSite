function getFirstAndLastChars(str) {
    let first = '';
    let last = '';
    let len = str.length;
    let x = []

    for (let i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) { // 如果是中文字符，长度为2
            x.push({l: 2, n: str[i]})
        } else { // 如果是英文字符，长度为1
            x.push({l: 1, n: str[i]})
        }
    }
    if(x.length < 30){
        return str
    }
    for(let i = 0; i < 10; i++)
    {
        first += x[i].n
    }
    for(let i = x.length - 10; i < x.length; i++)
    {
        last += x[i].n
    }
    return first+ '...' + last
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
    // 创建一个正则表达式，它将匹配以prefix变量开头的字符串
    const regex = new RegExp('^' + prefix);

    // 使用replace方法移除匹配到的前缀
    return str.replace(regex, '');
}

function replaceSuffix(str, prefix='\/') {
    // 正则表达式匹配字符串末尾的后缀
    const regex = new RegExp(prefix + '$');
    // 使用replace方法替换后缀
    return str.replace(regex, '');
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

export  {
    getFirstAndLastChars,
    timePatternChange,
    removePrefix,
    replaceSuffix,
    getParentDirectory,
    calSize,
    getExtension
}