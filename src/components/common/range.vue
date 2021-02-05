<template>
    <div class="hi-slider">
        <div class="bar bg_slider" ref="bar" @click="clickBar($event)">
            <div
                class="progress bg_007DFF"
                :style="{ width: switchLeft }"
            ></div>
            <div
                class="block"
                ref="block"
                :style="{ left: switchLeft }"
                @touchmove.prevent="touchMove($event)"
                @touchstart.prevent="touchStart($event)"
                @touchend.prevent="touchEnd($event)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HiRange",
    props: {
        percent: {
            type: [String, Number],
            default: "0",
        },
        step: {
            type: String,
            default: 1,
        },
    },
    data() {
        return {
            switchLeft: "0", // 滑动条左进度长
            initBlock: 0, // 滑块左偏移量
            barWidth: 0, // 滑动条长度
            blockWidth: 0, // 滑块宽度
            max: 0, // 能够滑动最大距离
            distance: 0, // 临时变量，记录开始滑动时的位置
            moveLength: 0,
            endlength: 0
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initBlock = this.$refs.block.offsetLeft;
            this.barWidth = this.$refs.bar.offsetWidth;
            this.blockWidth = this.$refs.block.offsetWidth;
            this.max = this.barWidth - this.blockWidth;
        },
        touchStart(e) {
            if (!this.barWidth) {
                // 有些机型会出现mounted里获取不到元素宽度问题，做下兼容
                this.init();
            }
            this.init();
            this.distance = e.targetTouches[0].pageX;
        },
        touchMove(e) {
            let diff = e.targetTouches[0].pageX - this.distance;
            let movediff = diff;
            console.log("diff", diff);
            if (this.step) {
                diff = Math.ceil(this.stepFix(diff));
                if (Math.abs(diff) == 0) {
                    return false;
                }
            }
            let left = this.initBlock + diff;
            let moveleft = this.initBlock + movediff;
            if (left < 0 || moveleft < 0) {
                left = 0;
                moveleft = 0;
            }
            if (left > this.max || moveleft > this.max) {
                left = this.max;
                moveleft = this.max;
            }
            console.log('left',left);
            this.moveLength = left + "px";
            this.moveleftLength = moveleft + 'px';
            this.switchLeft = this.moveleftLength;
            let v = (moveleft / this.max) * 100;
            this.$emit("handleTouchMove", parseInt(v) + "");
        },
        touchEnd() {
            this.touchEndCb();
        },
        clickBar(e) {
            let left = e.offsetX > this.max ? this.max : e.offsetX;
            if (left < 20) {
                this.switchLeft = 0;
            } else {
                let newLeft = Math.ceil(this.stepFix(left));
                this.switchLeft = newLeft + "px";
            }
            this.touchEndCb();
            this.$emit("rangeClick", this.newLeft);
        },
        touchEndCb() {
            if (this.switchLeft <= "20px") {
                this.initBlock = 0;
                this.switchLeft = 0;
            }
            this.switchLeft = this.moveLength;
            this.initBlock = parseInt(this.switchLeft);
            let v = (this.initBlock / this.max) * 10;
            this.$emit("handleTouchEnd", parseInt(v) + "");
        },
        stepFix(val) {
            let preStep = (this.max * this.step) / 100;
            let mul = Math.ceil(val / preStep);
            return mul * preStep;
        },
    },
    watch: {
        percent: {
            handler: function (val) {
                let v = this.max ? (this.initBlock / this.max) * 100 : 0;
                if (+val !== parseInt(v)) {
                    this.$nextTick(() => {
                        this.switchLeft =
                            parseInt(this.max * (val / 100)) + "px";
                        this.initBlock = parseInt(this.switchLeft);
                    });
                }
            },
            immediate: true,
        },
    },
};
</script>

<style lang="less" scoped>
.hi-slider {
    height: 24/36rem;
    width: 100%;
    position: relative;
    .bar {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 2/36rem;
        border-radius: 1/36rem;
        .progress {
            height: 100%;
            width: 100%;
            border-radius: 1/36rem;
        }
        .block {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 24/36rem;
            width: 24/36rem;
            border-radius: 50%;
            border: 0.25/36rem solid rgba(0, 0, 0, 0.2);
            background-color: #ffffff;
            box-shadow: 0 3/36rem 8/36rem 0 rgba(0, 0, 0, 0.15),
                0 1/36rem 1/36rem 0 rgba(0, 0, 0, 0.16);
        }
    }
}
</style>
