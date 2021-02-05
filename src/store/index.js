import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
    statusBarHeight: 0,
    isDark: (window.hilink && window.hilink.getDarkMode && window.hilink.getDarkMode()) === 2
};

const actions = {
    setData ({ commit }, data) {
        commit('SETDATA', data);
    }
};

const mutations = {
    ['SETDATA'] (state, obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                state[prop] = obj[prop];
            }
        }
    }
};
export default new Vuex.Store({
    state,
    actions,
    mutations
});
