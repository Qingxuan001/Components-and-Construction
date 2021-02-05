<template>
    <div class="hi-card bg_card">
        <div class="left c_90">{{leftTxt}}</div>
        <div class="mid">
            <div class="mid-txt" :class="midTxtColor" v-if="midTxt">{{midTxt}}</div>
            <div class="mid-msg" :class="midMsgColor" v-if="midMsg">{{midMsg}}</div>
        </div>
        <div class="right">
            <template v-if="status === '1'">
                <div class="loading ic-loading"></div>
            </template>
            <template v-if="status === '2'">
                <div class="right-icon" :class="rightIcon"></div>
                <div class="c_90">{{rightTxt}}</div>
            </template>
            <template v-if="status === '3'">
                <p class="c_007DFF" @click="handleClick">{{rightTxt2}}</p>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiCard2',
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
        },
        rightTxt: {
            type: String,
            default: ''
        },
        rightTxt2: {
            type: String,
            default: ''
        },
        status: { // 1: 连接中 2：已连接 3：未连接
            type: String,
            default: '3'
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
    padding: 0 24/36rem;
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
        display: flex;
        align-items: center;
        .loading {
            height: 40/36rem;
            width: 40/36rem;
            animation: rotate 1.2s linear infinite;
        }
        .right-icon {
            height: 24/36rem;
            width: 24/36rem;
            margin-right: 8/36rem;
        }
        >div {
            font-size: 18/36rem;
        }
        >p {
            font-size: 16/36rem;
        }
    }
}
@keyframes rotate {
  from{
    transform: rotate(0);
  }
  to{
     transform: rotate(360deg);
  }
}
</style>