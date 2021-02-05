import Vue from 'vue';
import App from './App';
import router from './router';

// 引入适配插件
import 'amfe-flexible';

// 引入全局初始样式
import './assets/style/reset.css';

// 引入国际化
import i18n from './i18n/index';

// 引入vuex
import store from './store/index';

// 引入UI组件
import Components from './components/index';

// 引入公共mixin
import comMix from './mixins/comMix';

// 引入loading组件
import Loading from './components/loading/index';
import Dialog from './components/dialog/index';

Vue.prototype.$loading = Loading;
Vue.prototype.$dialog = Dialog;

Vue.mixin(comMix);
Vue.use(Components);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
