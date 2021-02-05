<!-- 时间列表 -->
<template>
    <div class="hi-timeitem bg_FFFFFF" @click="listClick">
        <div class="timeitemMain">
            <span class="size16 c_90">{{ timeSelected }}</span>
            <span class="size14 c_60">{{ daySelected }}</span>
        </div>
        <hi-switch :selected="listSwitch" @switchClick="listSwitchClick"></hi-switch>
    </div>
</template>

<script>
export default {
    name: "HiTimeItem",
    props: {
        timeSelected: {
            type: String,
            default: ""
        },
        daySelected: {
            type: String,
            default: ""
        },
        listSwitch: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        listClick() {
            this.$emit("listClick");
        },
        listSwitchClick() {
            this.$emit("listSwitchClick");
        }
    },
};
</script>

<style lang='less' scoped>
.hi-timeitem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64/36rem;
    .timeitemMain {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.33;
        .size16 {
            font-size: 16/36rem;
            margin-bottom: 2/36rem;
        }
        .size14 {
            font-size: 14/36rem;
        }
    }
}
</style>
