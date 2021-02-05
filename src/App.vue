<template>
    <div id="app" :class="{'theme-dark': isDark}">
        <router-view />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import BleConnect from './util/bleConnect';
export default {
    name: 'App',
    data () {
        return {
            bleConnect: null
        }
    },
    computed: {
        ...mapState(['isDark'])
    },
    created () {
        /**
         * serviceId  蓝牙协议id  必传
         * characteristicId 蓝牙协议读取id  必传
         * watchStatus 监听蓝牙连接状态函数
         * reConnectBle 重新连接函数
         * init 连接初始化函数
         */
        this.bleConnect = new BleConnect({
            serviceId: '0000e0ff-3c17-d293-8e48-14fe2e4da212',
            characteristicId: '00000003-3c17-d293-8e48-14fe2e4da212',
            watchStatus: (val) => {
                // 0：初始未连接状态 1：连接中 2：已连接 3: 连接超时
                console.log('蓝牙连接状态', val, this.bleConnect);
            }
        });
        this.bleConnect.init();
    }
};
</script>

<style lang="less">
@import url('./assets/style/icon.less');
@import url('./assets/style/color.less');
</style>
