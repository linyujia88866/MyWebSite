// 文件 bus.js
import mitt from 'mitt'

const bus = mitt();

// mitt 库中的方法是不带前缀$。为了与 Vue 方法名匹配。此处有转换。
bus.$on = bus.on;
bus.$off = bus.off;
bus.$emit = bus.emit;

export default bus;
