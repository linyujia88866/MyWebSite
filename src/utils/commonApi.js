function showUrlInfo() {
    // 完整的URL
    let fullUrl = window.location.href;

// 协议部分，例如 'http:' 或 'https:'
    let protocol = window.location.protocol;

// 主机名，例如 'www.example.com'
    let hostname = window.location.hostname;

// 端口号，如果有的话
    let port = window.location.port;

// 路径部分，即文件和目录的路径，不包括主机名
    let pathname = window.location.pathname;

// 查询字符串，以 '?' 开头的部分，除非没有查询参数
    let search = window.location.search;

// 哈希部分，以 '#' 开头的部分，除非没有哈希值
    let hash = window.location.hash;
    console.log(`${fullUrl}\n${protocol}\n${hostname}\n${port}\n${pathname}\n${search}\n${hash}`)
}

function getUrlHash(){
    return window.location.hash;
}

export {
    showUrlInfo,
    getUrlHash
}