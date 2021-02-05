import Vue from 'vue';
import loading from './main.vue';

const MessageConstructor = Vue.extend(loading);
let instance = null;
const initInstance = () => {
    instance = new MessageConstructor().$mount(); // 渲染组件
};
const Loading = (tip) => {
    if (!instance) {
        initInstance();
    }
    instance.visible = true;
    instance.tip = tip;
    document.getElementById('app').appendChild(instance.$el);
};
Loading.close = () => {
    return instance && instance.close();
};
export default Loading;
