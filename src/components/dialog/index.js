import Vue from 'vue';
import i18n from '../../i18n/index';
import dialog from './main.vue';
const DialogConstructor = Vue.extend(dialog);
let instance = null;
const initInstance = () => {
    instance = new DialogConstructor({i18n}).$mount(); // 渲染组件
};
const Dialog = (options = {}) => {
    if (!instance) {
        initInstance();
    }
    for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
            instance[prop] = options[prop];
        }
    }
    instance.visible = true;
    document.getElementById('app').appendChild(instance.$el);
};
export default Dialog;
