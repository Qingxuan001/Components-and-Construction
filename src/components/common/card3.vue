<template>
    <div class="hi-card" :class="{'hi-small-card': smallCard}" @click="cardClick">
        <div class="left">
            <div class="left-txt c_90">{{leftTxt}}</div>
            <div class="left-msg c_007DFF" v-if="leftMsg">{{leftMsg}}</div>
        </div>
        <div v-if="!needSwitch" class="right" :class="rightIcon" @click="iconClick"></div>
        <hi-switch v-else :selected="selected" @click="iconClick"></hi-switch>
    </div>
</template>

<script>
export default {
    name: 'HiCard3',
    props: {
        leftTxt: {
            type: String,
            default: ''
        },
        leftMsg: {
            type: String,
            default: ''
        },
        rightIcon: {
            type: String,
            default: ''
        },
        smallCard: { // 小卡片需要传true
            type: Boolean,
            default: false
        },
        needSwitch: { // 卡片需要按钮时传true
            type: Boolean,
            default: false
        },
        selected: { // 卡片显示按钮时必传
            type: Boolean,
            default: false
        }
    },
    methods: {
        iconClick () {
            this.$emit('iconClick');
        },
        cardClick () {
            this.$emit('cardClick');
        }
    }
};
</script>

<style lang="less" scoped>
.hi-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64/36rem;
    padding: 0 24/36rem;
    .left {
        line-height: 1.33;
        .left-txt {
            font-size: 16/36rem;
        }
        .left-msg {
            font-size: 12/36rem;
            margin-top: 2/36rem;
        }
    }
    .right {
        height: 24/36rem;
        width: 24/36rem;
        margin-left: 8/36rem;
    }
}
.hi-small-card {
    width: 160/36rem;
}
</style>