<template>
    <div class="hi-card">
        <div class="left">
            <div class="left-txt c_90">{{ leftTxt }}</div>
            <div class="left-msg c_007DFF" v-if="showMsg">
                {{ leftMsg }}
            </div>
        </div>
        <div class="right">
            <hi-range
                :percent="percent"
                :step="step"
                @rangeClick="sliderTouchMove"
                @handleTouchMove="sliderTouchMove"
                @handleTouchEnd="sliderTouchEnd"
            ></hi-range>
            <div class="rangeValue">
                <div class="v0 c_60">0</div>
                <div class="preValue c_60">
                    <div class="v20">20</div>
                    <div class="v40">40</div>
                    <div class="v60">60</div>
                    <div class="v80">80</div>
                    <div class="v100">100</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HiRangeCard",
    data() {
        return {
            showVal: "0",
        };
    },
    props: {
        leftTxt: {
            type: String,
            default: "",
        },
        percent: {
            type: [String, Number],
            default: "",
        },
        unit: {
            type: String,
            default: "",
        },
        step: {
            type: String,
            deafult: 1,
        },
    },
    methods: {
        sliderTouchEnd(val) {
            this.$emit("sliderTouchEnd", val);
        },
        sliderTouchMove(val) {
            console.log("showVal", this.showVal);
            if (val === undefined) return;
            this.showVal = val;
        },
    },
    computed: {
        leftMsg() {
            if (this.showVal === "0" || "") {
                return;
            } else {
                // let thenVal = parseInt(this.showVal) + 20;
                // let newVal = thenVal > 100 ? 100 : thenVal;
                return `${this.showVal}${this.unit}`;
            }
        },
        showMsg() {
            let a = this.leftMsg !== "%" && this.leftMsg !== "0%";
            if (this.leftMsg && a) {
                return true;
            }
        },
    },
    watch: {
        percent: {
            handler: function (val) {
                this.showVal = val;
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
    // padding: 0 24/36rem;
    .left {
        margin: auto 0;
        // width: 20%;
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
        // height: 100%;
        margin: 0 24/36rem 0 8/36rem;
        line-height: 1.33;
        .rangeValue {
            display: flex;
            // justify-content: space-between;
            font-size: 10/36rem;
            position: relative;
            width: 100%;
            height: 16/36rem;
            .preValue {
                // display: flex;
                // position: relative;
                // width: 100%;
                // height: 16/36rem;
                // div {
                // flex: 1;
                // width: 44.5575/36rem;
                // padding-left: 2/36rem;
                // text-align: center;
                // }

                .v20 {
                    position: absolute;
                    top: 0;
                    left: 41.48/36rem;
                }
                .v40 {
                    position: absolute;
                    top: 0;
                    left: 78/36rem;
                }
                .v60 {
                    position: absolute;
                    top: 0;
                    left: 116/36rem;
                }
                .v80 {
                    position: absolute;
                    top: 0;
                    left: 150/36rem;
                }
                .v100{
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }
    }
}
</style>