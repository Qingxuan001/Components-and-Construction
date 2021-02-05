<template>
    <div
        class="hi-switch"
        :class="{ 'is-checked': selected}"
        @click.stop="handleClick()"
    >
        <div class="hi-switch_core"></div>
    </div>
</template>

<script>
export default {
    name: "HiSwitch",
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleClick() {
            this.$emit("switchClick");
        },
    },  
};
</script>

<style lang="less" scoped>
.hi-switch {
    height: 20/36rem;
    width: 36/36rem;
    padding: 2/36rem;
    border-radius: 10/36rem;
    background-color: rgba(0, 0, 0, 0.1);
    position: relative;
    .hi-switch_core {
        position: absolute;
        height: 16/36rem;
        width: 16/36rem;
        border-radius: 50%;
        background-color: #ffffff;
    }
}
.is-checked {
    background-color: #007dff;
    .hi-switch_core {
        right: 2/36rem;
    }
}
.theme-dark {
    .hi-switch {
        background-color: rgba(255, 255, 255, 0.4);
    }
    .is-checked {
        background-color: #006cde;
    }
}
</style>
