<!-- 档位卡片 -->
<template>
    <div class="hi-cardShift bg_card">
        <div
            v-for="(item, index) in shiftList"
            :key="index"
            class="shiftContent c_90"
            :class="{ 'bg_007DFF10': selectedIndex === index }"
            @click="handleClick(item, index)"
        >
            <div class="shiftClass" :class="{ 'split-top': index !== 0 }">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HiCardShift",
    props: {
        shiftList: {
            type: Array,
            default: () => []
        },
        selectedIndex: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleClick (item, index) {
            this.$emit('click', item, index);
        }
    }
};
</script>

<style lang='less' scoped>
.hi-cardShift {
    display: flex;
    flex-direction: column;
    width: 160/36rem;
    overflow: hidden;
    .shiftContent {
        font-size: 16/36rem;
        padding: 0 16/36rem;
        .shiftClass {
            display: flex;
            align-items: center;
            height: 48/36rem;
        }
    }
}
</style>
