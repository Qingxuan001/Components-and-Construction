<template>
    <header class="hi-header">
        <div class="statusBar" :style="{height: `${statusBarHeight / 36}rem`}"></div>
        <div v-if="showH5Title" class="title" :class="{'subpage-title': subpage}">
            <div
                v-if="leftVisible"
                class="title-left"
                :class="leftIcon"
                @click="leftClick()"
            ></div>
            <div class="title-mid c_90">{{ title }}</div>
            <div
                v-if="rightVisible"
                class="title-right"
                :class="[rightIcon, largeRightIcon ? 'large-title-right': '']"
                @click="rightClick()"
            ></div>
        </div>
        <div v-else class="empty"></div>
    </header>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    name: 'HiHeader',
    data () {
        return {
            showH5Title: true
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        leftVisible: {
            type: Boolean,
            default: true
        },
        rightVisible: {
            type: Boolean,
            default: true
        },
        leftIcon: {
            type: String,
            default: ''
        },
        rightIcon: {
            type: String,
            default: ''
        },
        largeRightIcon: { // 右图标宽度 默认为12dp 24dp传true
            type: Boolean,
            default: false
        },
        subpage: { // 二级页面
            type: Boolean,
            default: false
        },
        showAppTitle: { // 是否需要展示原生头部，蓝牙项目首页需要
            type: Boolean,
            default: false
        },
        devType: { // 区分蓝牙还是wifi设备  1：wifi 2：ble 蓝牙项目必需要传2 wifi项目可不传此参数
            type: String,
            default: '1'
        }
    },
    created () {
        this.createCb(['getStatusBarHeightCb', 'setTitleVisibleCb', 'modifyTitleBarCb']);
        !this.statusBarHeight && this.callHilinkFn('getStatusBarHeight', ['getStatusBarHeightCb']);
    },
    computed: {
        ...mapState(['statusBarHeight', 'isDark'])
    },
    methods: {
        ...mapActions(['setData']),
        getStatusBarHeightCb (res) {
            this.setData({
                statusBarHeight: res.statusBarHeight || 24
            });
        },
        setTitleVisible (val) {
            this.showH5Title = !val;
            let o = this.devType === '1' ? [val, 'setTitleVisibleCb'] : [val];
            this.callHilinkFn('setTitleVisible', o);
        },
        setAppTitle () {
            let op;
            if (this.devType === '1') {
                op = this.isDark ? [true, '#FFFFFFFF', 'modifyTitleBarCb'] : [false, '#FF000000', 'modifyTitleBarCb'];
            } else {
                op = this.isDark ? [true, '#ffffff', ''] : [false, '0', ''];
            }
            this.callHilinkFn('modifyTitleBar', op);
        },
        leftClick () {
            this.$emit('leftClick');
        },
        rightClick () {
            this.$emit('rightClick');
        }
    },
    watch: {
        showAppTitle: {
            handler: function (val) {
                this.setTitleVisible(val);
                val && this.setAppTitle();
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.hi-header {
    .title {
        display: flex;
        align-items: center;
        height: 56/36rem;
        padding: 0 16/36rem;
        font-size: 24/36rem;
    }
    .title-left {
        width: 24/36rem;
        height: 24/36rem;
    }
    .title-mid {
        flex: 1;
        padding: 0 16/36rem;
        line-height: 1.33;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .title-right {
        width: 12/36rem;
        height: 24/36rem;
    }
    .large-title-right {
        width: 24/36rem;
    }
    .subpage-title {
        padding: 0 24/36rem;
        font-size: 20/36rem;
    }
    .empty {
        height: 56/36rem;
    }
}
</style>
