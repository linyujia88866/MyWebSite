const { defineConfig } = require('@vue/cli-service')
//
// let proxyObj = {};
//
// proxyObj['/'] = {
//   //websocket
//   ws: false,
//   //目标地址
//   target: 'ws://localhost:8081',
//   //发送请求头中host会设置成target
//   changeOrigin: true,
//   //不重写请求地址
//   pathRewrite: {
//     '^/ws': '/'
//   }
// };

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    webSocketServer: false,
    host: 'localhost',
    port: 8082,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
})
