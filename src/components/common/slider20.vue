<template>
    <div class="hi-card bg_card mt8">
        <div class="left">
            <div class="left-txt c_90">{{ leftTxt }}</div>
            <div class="left-msg c_007DFF" v-if="showMsg">
                {{ leftMsg }}
            </div>
        </div>
        <div class="right">
            <div class="hi-slider">
                <div class="bar bg_slider" ref="bar">
                    <div
                        class="progress bg_007DFF"
                        :style="{ width: switchLeft }"
                    ></div>
                    <div
                        class="block"
                        ref="block"
                        :style="{ left: switchLeft }"
                        @touchstart.prevent="touchStart($event)"
                        @touchmove.prevent="touchMove($event)"
                        @touchend.prevent="touchEnd($event)"
                    ></div>
                </div>
            </div>
            <div class="rangeValue c_60">
                <div ref="valueItem" class="v20">20</div>
                <div class="v40">40</div>
                <div class="v60">60</div>
                <div class="v80">80</div>
                <div class="v100">100</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slider20',
    props: {
        leftTxt: {
            type: String,
            default: '',
        },
        percent: {
            type: [String, Number],
            default: '',
        },
        unit: {
            type: String,
            default: '',
        },
        step: {
            type: [String, Number],
            deafult: 1,
        },
    },
    data () {
        return {
            // 滑块宽度
            blockWidth: 24,
            // 滑杆长度
            barWidth: 0,
            // 可滑动最大长度
            max: 0,
            // 滑块滑动前左偏移量
            initBlock: 0,
            // 新位置
            newPosition: 0,
            // 蓝色进度条长度
            switchLeft: 0,
            // 最初触屏点X坐标
            startX: 0,
            // 是否显示实时数据
            showMsg: true,
            // 实时显示数据
            showVal: 20,
            // 计算后的步数
            steps: 1,
        };
    },
    computed: {
        // 实时数据+单位处理
        leftMsg () {
            return `${this.showVal}${this.unit}`;
        },
    },
    created () { },
    mounted () {
        this.initData();
    },
    methods: {
        // 初始化slider数据
        initData () {
            this.blockWidth = this.$refs.block.offsetWidth;
            this.barWidth = this.$refs.bar.offsetWidth;
            this.max = this.barWidth - this.blockWidth;
            this.initBlock = this.$refs.block.offsetLeft;
            console.log('初始化slider数据', this.blockWidth, this.barWidth, this.max, this.initBlock);
        },
        // 开始触屏
        touchStart (e) {
            this.initData();
            // 触屏初始点X坐标
            this.startX = e.targetTouches[0].pageX;
            // console.log('startX',this.startX);
        },
        // 滑屏
        touchMove (e) {
            // 滑动的长度数值
            let diff = e.targetTouches[0].pageX - this.startX;
            // console.log('diff', diff);
            // 滑动一次后的位置
            this.newPosition = this.initBlock + diff;
            // console.log(this.newPosition);
            this.setPosition(this.newPosition);
            this.showVal = parseInt(this.steps * this.step) + parseInt(this.step);

        },
        // 触屏结束
        touchEnd () {
            // 滑动结束后滑块的位置
            this.initBlock = this.newPosition;
            this.setPosition(this.newPosition);
            this.showVal = parseInt(this.steps * this.step) + parseInt(this.step);
            this.$emit('handleTouchEnd', this.showVal);
            // console.log('触屏结束');
        },
        // 滑块移动位置 随步长做调整
        setPosition (newPosition) {
            console.log('newPosition', newPosition);
            if (newPosition === null || isNaN(newPosition)) return;
            if (newPosition < 0) {
                newPosition = 0;
            } else if (newPosition > this.max) {
                newPosition = this.max;
            }
            // 滑块一个单位代表长度
            const lengthPerStep = (this.max * this.step) / 80;
            // console.log('lengthPerStep,45.5', lengthPerStep);
            // 滑动的步数（单位）
            this.steps = Math.round(newPosition / lengthPerStep);
            // console.log('steps', this.steps);
            this.switchLeft = lengthPerStep * this.steps + 'px';
        },
    },
    watch: {
        percent: {
            handler: function (val) {
                this.showVal = val;
                this.$nextTick(() => {
                    // 滑块与下标数字定位差值
                    // const DISCOUNT = (this.blockWidth - this.$refs.valueItem.offsetWidth) / 2;
                    // console.log('5', DISCOUNT);
                    // 接收传入的数值
                    const GET_VALUE = ((val - this.step) / 80) * this.max;
                    this.switchLeft = GET_VALUE + 'px';
                    // this.$forceUpdate();
                });
            },
            immediate: true,
        },
    },
};
</script>

<style lang="less" scoped>
.hi-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64/36rem;
    .left {
        margin: auto 0;
        line-height: 1.33;
        padding-left: 24/36rem;
        .left-txt {
            width: 65.6/36rem;
            font-size: 16/36rem;
        }
        .left-msg {
            font-size: 12/36rem;
            margin-top: 2/36rem;
        }
    }
    .right {
        flex: 1;
        width: 100%;
        margin: 0 24/36rem 0 8/36rem;
        line-height: 1.33;
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
        .rangeValue {
            display: flex;
            font-size: 10/36rem;
            position: relative;
            width: 100%;
            height: 16/36rem;
            .v20 {
                position: absolute;
                top: 0;
                left: 0;
            }
            .v40 {
                position: absolute;
                top: 0;
                left: 50.5/36rem;
            }
            .v60 {
                position: absolute;
                top: 0;
                left: 96/36rem;
            }
            .v80 {
                position: absolute;
                top: 0;
                left: 141.5/36rem;
            }
            .v100 {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
}
</style>