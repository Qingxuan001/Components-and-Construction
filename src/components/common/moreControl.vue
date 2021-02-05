<template>
    <div class="hi-more-control">
        <div @click="handleClick()">
            <div class="c_60">{{$t(text)}}</div>
            <div class="ic-shouqi" :class="{zhankai: isOpen}"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiMoreControl',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        closedText: {
            type: String,
            default: 'module.showMore'
        },
        opendText: {
            type: String,
            default: 'module.pickUp'
        }
    },
    computed: {
        text () {
            return this.isOpen ? this.opendText : this.closedText;
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
.hi-more-control {
    height: 35/36rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14/36rem;
    >div {
        display: flex;
        align-items: center;
        >div:last-child {
            height: 24/36rem;
            width: 24/36rem;
            margin-left: 2/36rem;
            opacity: .38;
        }
    }
    .zhankai {
        transform: rotateX(180deg);
    }
}
</style>