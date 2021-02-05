<template>
    <div class="hi-card bg_card">
        <div class="left c_90">{{leftTxt}}</div>
        <div class="mid">
            <div class="mid-txt" :class="midTxtColor" v-if="midTxt">{{midTxt}}</div>
            <div class="mid-msg" :class="midMsgColor" v-if="midMsg">{{midMsg}}</div>
        </div>
        <div class="right">
            <div class="right-icon" :class="rightIcon" @click="handleClick"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiCard1',
    props: {
        leftTxt: {
            type: String,
            default: ''
        },
        midTxt: {
            type: String,
            default: ''
        },
        midTxtColor: {
            type: String,
            default: 'c_90'
        },
        midMsg: {
            type: String,
            default: ''
        },
        midMsgColor: {
            type: String,
            default: 'c_60'
        },
        rightIcon: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick () {
            this.$emit('click');
        }
    }
};
</script>

<style lang="less" scoped>
.hi-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88/36rem;
    padding: 0 16/36rem 0 24/36rem;
    .left {
        font-size: 18/36rem;
    }
    .mid {
        text-align: center;
        padding: 0 16/36rem;
        line-height: 1.33;
        .mid-txt {
            font-size: 24/36rem;
        }
        .mid-msg {
            font-size: 12/36rem;
            margin-top: 2/36rem;
        }
    }
    .right {
        height: 100%;
        .right-icon {
            height: 64/36rem;
            width: 64/36rem;
            margin-top: 16/36rem;
        }
    }
}
</style>