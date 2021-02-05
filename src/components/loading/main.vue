<template>
    <div class="hi-loading" v-show="visible">
        <div class="mask"></div>
        <div class="container">
            <div class="content">
                <div class="tip">{{tip}}</div>
                <div class="icon ic-loading"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiLoading',
    data () {
        return {
            visible: true,
            tip: ''
        };
    },
    methods: {
        close () {
            this.visible = false;
        }
    }
};
</script>

<style lang="less" scoped>
.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
    z-index: 999;
}
.container {
    position: absolute;
    margin: 0 auto;
    bottom: 16/36rem;
    width: 100vw;
    padding: 0 16/36rem;
    z-index: 1000;
}
.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96/36rem;
    border-radius: 16/36rem;
    padding: 24/36rem;
    font-size: 16/36rem;
    background-color: #ffffff;
    color: rgba(0, 0, 0, .9);
}
@keyframes rotate {
  from{
    transform: rotate(0);
  }
  to{
     transform: rotate(360deg);
  }
}
.icon {
    width: 40/36rem;
    height: 40/36rem;
    animation: rotate 1.2s linear infinite;
}
.theme-dark {
    .content {
        background-color: #262626;
        color: rgba(255, 255, 255, .86);
    }
}
</style>
