<template>
    <div class="hi-product">
        <div class="img" :class="[prdClass, isWhitePrd ? 'opacity86' : '']"></div>
        <div class="logo" :class="logoClass"></div>
    </div>
</template>

<script>
export default {
    name: 'HiProduct',
    props: {
        prdClass: {
            type: String,
            default: ''
        },
        logoClass: {
            type: String,
            default: ''
        },
        isWhitePrd: { // 白色产品图在暗黑模式下需要86不透明度，要传这个参数
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
.hi-product {
    height: 280/36rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img {
        height: 252/36rem;
        width: 252/36rem;
    }
    .logo {
        height: 18/36rem;
        width: 70/36rem;
    }
}
.theme-dark {
    .opacity86 {
        opacity: .86;
    }
}
</style>
