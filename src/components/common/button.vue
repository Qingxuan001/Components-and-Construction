<!-- 按钮 -->
<template>
    <div class="hi-button bg_button" @click="buttonClick">
        <div :class="buttonColor">{{ buttonText }}</div>
    </div>
</template>

<script>
export default {
    name: 'HiButton',
    props: {
        buttonText: {
            type: String,
            default: ''
        },
        buttonColor: { // 按钮字体颜色类名  例如：c_FA2A2D
            type: String,
            default: 'c_007DFF'
        }
    },
    methods: {
        buttonClick () {
            this.$emit('buttonClick');
        }
    }
};
</script>

<style lang='less' scoped>
.hi-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 36/36rem;
    border-radius: 16/36rem;
    padding: 0 16/36rem;
    font-size: 16/36rem;
}
</style>
