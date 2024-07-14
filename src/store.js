// store.js
import { reactive, readonly } from 'vue';

const state = reactive({
    globalData: {}
});

// 添加全局数据
function setGlobalData(key, value) {
    state.globalData[key] = value;
}

// 获取全局数据
function getGlobalData(key) {
    return state.globalData[key];
}

// 创建一个只读的响应式引用，防止外部直接修改全局状态
const globalStore = readonly(state);

export { globalStore, setGlobalData, getGlobalData };