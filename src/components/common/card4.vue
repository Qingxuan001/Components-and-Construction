<template>
    <div class="hi-card bg_card">
        <div class="item" :class="{line: index !== 0}" v-for="(item, index) in cardData" :key="index">
            <div class="top">
                <div class="num c_90">{{item.num}}</div>
                <div class="unit c_60" v-if="item.unit">{{item.unit}}</div>
            </div>
            <div class="name c_60">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiCard4',
    props: {
        cardData: {
            type: Array,
            default: () => []
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
    .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0 8/36rem;
        line-height: 1.33;
        .top {
            display: flex;
            align-items: baseline;
            .num {
                font-size: 24/36rem;
            }
            .unit {
                margin-left: 2/36rem;
                font-size: 12/36rem;
            }
        }
        .name {
            margin-top: 2/36rem;
            font-size: 12/36rem;
        }
    }
}
.line::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 40/36rem;
    width: 1px;
    border-left: 0.25/36rem solid rgba(0, 0, 0, .2);
}
.theme-dark {
    .line::before {
        border-left: 0.25/36rem solid rgba(255, 255, 255, .2);
    }
}
</style>