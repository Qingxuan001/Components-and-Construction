import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'Index',
            path: '/',
            component: () => import(/* webpackChunkName: "index" */ '@/pages/index.vue')
        },
        {
            name: 'secondPage',
            path: '/',
            component: () => import(/* webpackChunkName: "secondPage" */ '@/pages/secondPage.vue')
        }
    ]
});
    