<template>
    <div class="hi-errTip">
        <div class="icon ic-err"></div>
        <div class="msg">{{tip}}</div>
    </div>
</template>

<script>
export default {
    name: 'HiErrtip',
    props: {
        tip: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="less" scoped>
.hi-errTip {
    display: flex;
    align-items: center;
    padding: 0 16/36rem;
    width: 100vw;
    height: 48/36rem;
    font-size: 16/36rem;
    background-color: #fff4f4;
    color: #fb2a2d;
    .msg {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .icon {
        height: 24/36rem;
        width: 24/36rem;
        margin-right: 16/36rem;
    }
}
.theme-dark {
    .hi-errTip {
        background-color: #372222;
        color: #e64548;
    }
}
</style>
